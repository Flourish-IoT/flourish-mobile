import { addDays, addWeeks, format, isAfter, isBefore, isPast, isToday, isTomorrow, isYesterday, subDays } from 'date-fns';
import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Task } from '../../../data/calendar';
import { usePlants } from '../../../data/garden';
import Typography from '../../../lib/components/styled/Typography';
import { Theme } from '../../../providers/Theme';

interface TaskCardProps {
	task: Task;
	containerStyle?: ViewStyle;
}

export default function TaskCard({ task, containerStyle }: TaskCardProps) {
	const { data: plants, isLoading: plantsIsLoading } = usePlants('me');

	if (plantsIsLoading) return null;

	const { id, plantId, datetime, title, description, complete } = task;
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

	const styles = StyleSheet.create({
		container: {
			backgroundColor: 'white',
			display: 'flex',
			flexDirection: 'row',
			borderLeftWidth: Theme.spacing.md,
			borderColor: Theme.colors.primary,
			borderRadius: Theme.borderRadius,
			...containerStyle,
		},
		textContainer: {
			flex: 1,
			padding: Theme.spacing.md,
		},
		due: {
			...(isLate && { color: Theme.colors.error }),
		},
		icon: {
			height: 70,
			width: 70,
		},
	});

	return (
		<TouchableOpacity style={styles.container}>
			<Image
				style={styles.icon}
				source={plantImage ? { uri: plantImage } : require('../../../lib/assets/placeholder/plant.png')}
			/>
			<View style={styles.textContainer}>
				<Typography variant='heading3Bold'>{title}</Typography>
				<Typography variant='placeholder' style={styles.due}>
					{getDateText()} {format(datetime, "'at' p")}
				</Typography>
				<Typography variant='placeholder'>{description}</Typography>
			</View>
		</TouchableOpacity>
	);
}
