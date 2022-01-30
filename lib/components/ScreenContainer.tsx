import React, { ReactNode } from 'react';
import { ScrollView, ViewStyle, SafeAreaView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../providers/Theme';

interface ScreenContainerProps {
	style?: ViewStyle;
	children?: ReactNode;
	scrolls?: boolean;
}

export default function ScreenContainer({ children, scrolls = false, style }: ScreenContainerProps) {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			overflow: 'visible',
			padding: Theme.padding,
			paddingBottom: insets.bottom + Theme.appBarHeight,
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
