import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { Theme } from '../../../providers/Theme';

interface CurvedContainerProps extends PropsWithChildren<unknown> {
	style?: ViewStyle;
}

export default function CurvedContainer({ children, style }: CurvedContainerProps) {
	return (
		<View
			style={{
				backgroundColor: 'white',
				height: '50%',
				width: '170%', // NOTE: Over 100% to get the curve
				paddingHorizontal: '35%', // NOTE: This is half of what's over 100% width (Ex. width: 150%; -> 25%)
				borderTopLeftRadius: 1000,
				borderTopRightRadius: 1000,
				...Theme.shadow,
				...Theme.util.flexCenter,
				...style,
			}}
		>
			{children}
		</View>
	);
}
