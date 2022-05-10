import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TaskCategory } from '../../../data/calendar';
import Rotate from '../../../lib/icons/Rotate';
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
		default:
			return <WaterDrop width={width} />;
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
