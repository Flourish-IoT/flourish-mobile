import React, { ReactNode } from 'react';
import { ScrollView, ViewStyle, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appBarCenterBtnSize } from '../../navigation/AppBar';
import { Theme } from '../../providers/Theme';

interface TopTabContainerProps {
	children?: ReactNode;
	scrolls?: boolean;
	style?: ViewStyle;
}

export default function TopTabContainer({ children, scrolls = false, style }: TopTabContainerProps) {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			padding: Theme.spacing.md,
			paddingBottom: Theme.appBarHeight + appBarCenterBtnSize / 2 + insets.bottom + Theme.spacing.md,
			...style,
		},
	});

	return scrolls ? (
		<ScrollView contentContainerStyle={{ ...styles.container }}>{children}</ScrollView>
	) : (
		<View style={{ flex: 1, ...styles.container }}>{children}</View>
	);
}
