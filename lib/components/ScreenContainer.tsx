import React, { ReactNode, useEffect, useState } from 'react';
import { ScrollView, ViewStyle, SafeAreaView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isLoggedIn } from '../../data/auth';
import { Theme } from '../../providers/Theme';

interface ScreenContainerProps {
	style?: ViewStyle;
	children?: ReactNode;
	scrolls?: boolean;
}

export default function ScreenContainer({ children, scrolls = false, style }: ScreenContainerProps) {
	const insets = useSafeAreaInsets();
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const check = async () => {
			setIsAuth(await isLoggedIn());
		};
		check();
	}, [setIsAuth]);

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			overflow: 'visible',
			padding: Theme.spacing.md,
			paddingBottom: insets.bottom + (isAuth ? Theme.appBarHeight : 0),
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
