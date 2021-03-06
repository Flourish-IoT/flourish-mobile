import React, { ReactNode } from 'react';
import { ScrollView, ViewStyle, SafeAreaView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../../providers/Theme';
import Chevron from '../../icons/Chevron';

interface ScreenContainerProps {
	children?: ReactNode;
	scrolls?: boolean;
	appBarPadding?: boolean;
	safePadding?: boolean;
	onBack?: () => void;
	bounces?: boolean;
	style?: ViewStyle;
}

export default function ScreenContainer({
	children,
	scrolls = false,
	appBarPadding = true,
	safePadding = true,
	onBack,
	bounces = true,
	style,
}: ScreenContainerProps) {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			overflow: 'visible',
			padding: Theme.spacing.screenContainer,
			paddingBottom: insets.bottom + (appBarPadding ? Theme.appBarHeight : 0),
			...(!safePadding && {
				padding: 0,
				paddingBottom: 0,
				paddingTop: 0,
				paddingLeft: 0,
				paddingRight: 0,
				marginBottom: -insets.bottom,
				marginTop: -insets.top,
			}),
			...(!!onBack && {
				paddingTop: 75,
			}),
			...style,
		},
		backButton: {
			position: 'absolute',
			top: 0,
			left: 0,
			margin: Theme.spacing.screenContainer,
		},
	});

	const BackBtn = () => <Chevron withBackground direction='left' onPress={onBack} backgroundStyle={styles.backButton} />;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{scrolls ? (
				<ScrollView
					contentContainerStyle={{ ...styles.container }}
					bounces={bounces}
					showsVerticalScrollIndicator={false}
				>
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
