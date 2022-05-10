import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TaskCategory } from '../../../data/calendar';
import Fertilize from '../../../lib/icons/Fertilize';
import Prune from '../../../lib/icons/Prune';
import Repot from '../../../lib/icons/Repot';
import Rotate from '../../../lib/icons/Rotate';
import TaskOther from '../../../lib/icons/TaskOther';
import WaterDrop from '../../../lib/icons/WaterDrop';
import { Theme } from '../../../providers/Theme';

interface TaskIconProps {
	category: TaskCategory;
	containerStyle?: ViewStyle;
}

export const getTaskIcon = (category: TaskCategory) => {
	const width = 20;

	switch (category) {
		case 'rotate':
			return <Rotate width={width} />;
		case 'water':
			return <WaterDrop width={width} />;
		case 'fertilize':
			return <Fertilize width={width} />;
		case 'repot':
			return <Repot width={width} />;
		case 'prune':
			return <Prune width={width} />;
		case 'other':
		default:
			return <TaskOther width={width} />;
	}
};

export default function TaskIcon({ category, containerStyle }: TaskIconProps) {
	return <View style={{ ...styles.container, ...containerStyle }}>{getTaskIcon(category)}</View>;
}

const styles = StyleSheet.create({
	container: {
		...Theme.util.flexCenter,
	},
});
