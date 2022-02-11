import React, { ReactNode } from 'react';
import { ScrollView, ViewStyle, SafeAreaView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appBarCenterBtnSize } from '../../navigation/AppBar';
import { Theme } from '../../providers/Theme';
import Chevron from '../icons/Chevron';

interface ScreenContainerProps {
	children?: ReactNode;
	scrolls?: boolean;
	appBarPadding?: boolean;
	safePadding?: boolean;
	onBack?: () => void;
	style?: ViewStyle;
}

export default function ScreenContainer({
	children,
	scrolls = false,
	appBarPadding = true,
	safePadding = true,
	onBack,
	style,
}: ScreenContainerProps) {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			overflow: 'visible',
			padding: Theme.spacing.md,
			paddingBottom: insets.bottom + (appBarPadding ? Theme.appBarHeight + appBarCenterBtnSize / 2 : 0),
			...(!safePadding && {
				padding: 0,
				paddingBottom: 0,
				paddingTop: 0,
				paddingLeft: 0,
				paddingRight: 0,
				marginBottom: -insets.bottom,
				marginTop: -insets.top,
			}),
			...style,
		},
		backButton: {
			position: 'absolute',
			top: 0,
			left: 0,
			margin: Theme.spacing.md,
		},
	});

	const BackBtn = () => <Chevron withBackground direction='left' onPress={onBack} backgroundStyle={styles.backButton} />;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{scrolls ? (
				<ScrollView contentContainerStyle={{ ...styles.container }}>
					{!!onBack && <BackBtn />}
					{children}
				</ScrollView>
			) : (
				<View style={{ flex: 1, ...styles.container }}>
					{!!onBack && <BackBtn />}
					{children}
				</View>
			)}
		</SafeAreaView>
	);
}
