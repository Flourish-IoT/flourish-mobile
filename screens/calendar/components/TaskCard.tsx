import { addDays, addWeeks, format, isAfter, isBefore, isPast, isToday, isTomorrow, isYesterday, subDays } from 'date-fns';
import React from 'react';
import { Image } from 'react-native';
import { List, Text } from 'react-native-paper';
import { Task } from '../../../data/calendar';
import { usePlants } from '../../../data/garden';
import { Theme } from '../../../providers/Theme';

interface TaskCardProps {
	task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
	const { data: plants, isLoading: plantsIsLoading } = usePlants('me');

	if (plantsIsLoading) return null;

	const { id, plantId, datetime, name, complete } = task;
	const isLate = isPast(datetime) && !complete;

	const { image: plantImage } = plants.find((p) => p.id === plantId);

	const getDateText = () => {
		if (isBefore(datetime, subDays(new Date(), 2))) {
			return format(datetime, 'MM/dd/yy');
		} else if (isYesterday(datetime)) {
			return 'Yesterday';
		} else if (isToday(datetime)) {
			return 'Today';
		} else if (isTomorrow(datetime)) {
			return 'Tomorrow';
		} else if (isAfter(datetime, addDays(new Date(), 2)) && isBefore(datetime, addWeeks(new Date(), 1))) {
			return format(datetime, 'MM-dd');
		} else {
			return format(datetime, 'EEEE');
		}
	};

	return (
		<List.Item
			title={<Text style={{ textDecorationLine: complete ? 'line-through' : 'none' }}>{name}</Text>}
			style={{ opacity: complete ? 0.5 : 1 }}
			description={
				<Text style={{ color: isLate ? Theme.colors.error : undefined }}>
					{getDateText()} {format(datetime, "'at' p")}
				</Text>
			}
			left={(props) => (
				<List.Icon
					{...props}
					icon={() => (
						<Image
							style={{ height: '100%', width: '100%' }}
							source={plantImage ? { url: plantImage } : require('../../../lib/assets/placeholder/plant.png')}
						/>
					)}
				/>
			)}
		/>
	);
}
