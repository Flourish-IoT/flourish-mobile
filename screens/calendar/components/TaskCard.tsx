import { addDays, addWeeks, format, isAfter, isBefore, isPast, isToday, isTomorrow, isYesterday, subDays } from 'date-fns';
import React from 'react';
import { Image } from 'react-native';
import { List } from 'react-native-paper';
import { Task } from '../../../data/calendar';
import { usePlants } from '../../../data/garden';
import Typography from '../../../lib/components/styled/Typography';
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
			title={<Typography variant='body'>{name}</Typography>}
			description={
				<Typography variant='placeholder' style={isLate ? { color: Theme.colors.error } : {}}>
					{getDateText()} {format(datetime, "'at' p")}
				</Typography>
			}
			left={(props) => (
				<List.Icon
					{...props}
					icon={() => (
						<Image
							style={{ height: '100%', width: '100%' }}
							source={plantImage ? { uri: plantImage } : require('../../../lib/assets/placeholder/plant.png')}
						/>
					)}
				/>
			)}
		/>
	);
}
