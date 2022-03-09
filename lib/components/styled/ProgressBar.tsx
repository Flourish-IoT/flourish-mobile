import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '../../../providers/Theme';

interface StyledProgressBarProps {
	value: number;
	containerStyle?: ViewStyle;
	materStyle?: ViewStyle;
}

export function StyledProgressBar({ value, containerStyle, materStyle }: StyledProgressBarProps) {
	value > 100 && (value = 100);
	value < 0 && (value = 0);

	return (
		<View style={{ ...styles.container, ...containerStyle }}>
			<View style={{ ...styles.meter, ...materStyle, width: value + '%' }} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 5,
		backgroundColor: '#e5e5e5',
		borderRadius: 50,
		overflow: 'hidden',
	},
	meter: {
		backgroundColor: Theme.colors.primary,
		height: '100%',
		width: '50%',
	},
});
