import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export interface StyledDividerProps {
	text?: string;
	style?: ViewStyle;
}

export default function StyledDivider({ text, style }: StyledDividerProps) {
	return <View style={{ ...styles.line, ...style }} />;
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	line: {
		width: '100%',
		height: 1,
		backgroundColor: 'gray',
	},
});
