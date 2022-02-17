import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export interface StyledDividerProps {
	text?: string;
	style?: ViewStyle;
}

export default function StyledDivider({ text, style }: StyledDividerProps) {
	return <View style={{ ...styles.line, ...style }} />;
	// return !!text ? (
	// 	<View style={styles.container}>
	// 		<View style={styles.line} />
	// 		<Typography variant='body'>{text}</Typography>
	// 		<View style={styles.line} />
	// 	</View>
	// ) : (
	// 	<View style={styles.line} />
	// );
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
