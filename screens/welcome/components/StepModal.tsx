import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Theme } from '../../../providers/Theme';

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
				backgroundColor: Theme.colors.primary,
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
