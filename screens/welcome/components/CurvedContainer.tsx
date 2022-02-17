import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Theme } from '../../../providers/Theme';

export default function CurvedContainer({ children }: PropsWithChildren<unknown>) {
	return (
		<View
			style={{
				backgroundColor: 'white',
				width: '170%',
				height: '50%',
				borderTopLeftRadius: 1000,
				borderTopRightRadius: 1000,
				...Theme.util.flexCenter,
			}}
		>
			{children}
		</View>
	);
}
