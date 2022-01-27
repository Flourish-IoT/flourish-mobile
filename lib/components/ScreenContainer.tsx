import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Theme } from '../../providers/Theme';

interface ScreenContainerProps {
	children: ReactNode;
}

export default function ScreenContainer({ children }: ScreenContainerProps) {
	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={{ padding: Theme.padding }}>{children}</ScrollView>
		</SafeAreaView>
	);
}
