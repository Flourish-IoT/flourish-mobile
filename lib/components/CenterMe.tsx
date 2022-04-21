import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { Theme } from '../../providers/Theme';

interface CenterMeProps extends PropsWithChildren<unknown> {
	style?: ViewStyle;
	horizontal?: boolean;
	vertical?: boolean;
}

export default function CenterMe({ children, style, horizontal, vertical }: CenterMeProps) {
	return (
		<View
			style={{
				height: vertical ? '100%' : undefined,
				width: horizontal ? '100%' : undefined,
				justifyContent: vertical ? 'center' : 'flex-start',
				alignItems: horizontal ? 'center' : 'flex-start',
				...style,
			}}
		>
			{children}
		</View>
	);
}
