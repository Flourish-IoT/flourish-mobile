import React from 'react';
import Theme from '../../../lib/theme';
import { View, ViewStyle } from 'react-native';

interface StepModalProps {
	children: React.ReactNode;
	backdropStyle?: ViewStyle;
	contentStyle?: ViewStyle;
}

export default function StepModal({ children, backdropStyle, contentStyle }: StepModalProps) {
	return (
		<View
			// Modal backdrop
			style={{
				flex: 1,
				paddingVertical: '30%',
				paddingHorizontal: '5%',
				backgroundColor: Theme.colors.secondary,
				...backdropStyle,
			}}
		>
			<View
				// Modal content
				style={{
					flex: 1,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 30,
					overflow: 'hidden',
					...contentStyle,
				}}
			>
				{children}
			</View>
		</View>
	);
}
