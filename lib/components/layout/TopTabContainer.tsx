import React, { ReactNode } from 'react';
import { ScrollView, ViewStyle, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../../providers/Theme';

interface TopTabContainerProps {
	children?: ReactNode;
	scrolls?: boolean;
	bounces?: boolean;
	style?: ViewStyle;
}

export default function TopTabContainer({ children, scrolls = false, bounces = true, style }: TopTabContainerProps) {
	const insets = useSafeAreaInsets();
	const missingBottomPadding = 18; // FIX: Can't figure out why there's not enough bottom padding

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			padding: Theme.spacing.screenContainer,
			paddingBottom: Theme.spacing.screenContainer + insets.bottom + Theme.appBarHeight + missingBottomPadding,
			...style,
		},
	});

	return scrolls ? (
		<ScrollView contentContainerStyle={{ ...styles.container }} bounces={bounces}>
			{children}
		</ScrollView>
	) : (
		<View style={{ flex: 1, ...styles.container }}>{children}</View>
	);
}
