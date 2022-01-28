import React, { ReactNode } from 'react';
import { ScrollView, ViewStyle, SafeAreaView, View, StyleSheet } from 'react-native';
import { Theme } from '../../providers/Theme';

interface ScreenContainerProps {
	style?: ViewStyle;
	children?: ReactNode;
	scrolls?: boolean;
}

export default function ScreenContainer({ children, scrolls = false, style }: ScreenContainerProps) {
	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			padding: Theme.padding,
			...style,
		},
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{scrolls ? (
				<ScrollView contentContainerStyle={{ ...styles.container }}>{children}</ScrollView>
			) : (
				<View style={{ flex: 1, ...styles.container }}>{children}</View>
			)}
		</SafeAreaView>
	);
}
