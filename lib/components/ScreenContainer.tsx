import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, ViewStyle } from 'react-native';
import { Theme } from '../../providers/Theme';

interface ScreenContainerProps {
	style?: ViewStyle;
	children?: ReactNode;
}

export default function ScreenContainer({ children, style }: ScreenContainerProps) {
	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={{ height: '100%', padding: Theme.padding, ...style }}>{children}</ScrollView>
		</SafeAreaView>
	);
}
