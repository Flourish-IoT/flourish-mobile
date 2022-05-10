import { format, isPast } from 'date-fns';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Task } from '../../../data/calendar';
import Typography from '../../../lib/components/styled/Typography';
import { getCloseDateText } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';
import TaskIcon from './TaskIcon';

interface TaskCardProps {
	task: Task;
	containerStyle?: ViewStyle;
}

export default function TaskCard({ task, containerStyle }: TaskCardProps) {
	const { id, plantId, datetime, title, category, description, complete } = task;
	const isLate = isPast(datetime) && !complete;

	const styles = StyleSheet.create({
		container: {
			backgroundColor: 'white',
			flexDirection: 'row',
			width: '100%',
			borderLeftWidth: Theme.spacing.md,
			borderColor: Theme.colors.primary,
			borderRadius: Theme.borderRadius,
			...containerStyle,
		},
		textContainer: {
			flex: 1,
			justifyContent: 'center',
		},
		due: {
			...(isLate && { color: Theme.colors.error }),
		},
		icon: {
			height: 70,
			width: 40,
		},
	});

	return (
		<TouchableOpacity style={styles.container}>
			<TaskIcon containerStyle={styles.icon} category={category} />
			<View style={styles.textContainer}>
				<Typography variant='h3bold'>{title}</Typography>
				<Typography variant='placeholder' style={styles.due}>
					{getCloseDateText(datetime)} {format(datetime, "'at' p")}
				</Typography>
				<Typography variant='placeholder'>{description}</Typography>
			</View>
		</TouchableOpacity>
	);
}
