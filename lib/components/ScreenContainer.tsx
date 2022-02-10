import React, { ReactNode } from 'react';
import { ScrollView, ViewStyle, SafeAreaView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appBarCenterBtnSize } from '../../navigation/AppBar';
import { Theme } from '../../providers/Theme';

interface ScreenContainerProps {
	children?: ReactNode;
	scrolls?: boolean;
	appBarPadding?: boolean;
	style?: ViewStyle;
}

export default function ScreenContainer({ children, scrolls = false, appBarPadding = true, style }: ScreenContainerProps) {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			overflow: 'visible',
			padding: Theme.spacing.md,
			paddingBottom: insets.bottom + (appBarPadding ? Theme.appBarHeight + appBarCenterBtnSize / 2 : 0),
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
