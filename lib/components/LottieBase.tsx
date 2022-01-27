import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { LottieSize, Theme } from '../../providers/Theme';

interface LottieBaseParams {
	defaultText: string;
	animation?: LottieName;
	text?: string;
	style?: ViewStyle;
	size?: LottieSize;
}

type LottieName = 'magnifyingGlass' | 'rings' | 'growing' | 'error' | 'relax';

export const getLottie = (name: LottieName) => {
	const lottieLocation = '../assets/lottie';

	switch (name) {
		case 'magnifyingGlass':
			return require(`${lottieLocation}/magnifyingGlass.json`);
		case 'rings':
			return require(`${lottieLocation}/rings.json`);
		case 'growing':
			return require(`${lottieLocation}/growing.json`);
		case 'error':
			return require(`${lottieLocation}/error.json`);
		case 'relax':
			return require(`${lottieLocation}/relax.json`);
	}
};

export default function LottieBase({ animation, defaultText, text, size = 'md', style }: LottieBaseParams) {
	text = text ?? defaultText;

	return (
		<View style={[Theme.lottie.wrapper, style]}>
			{!!animation && (
				<LottieView
					style={{ width: Theme.lottie.width[size] }}
					resizeMode='cover'
					source={getLottie(animation)}
					autoPlay
					loop
				/>
			)}
			{!!text && (
				<Text style={{ fontSize: Theme.lottie.fontSize[size], maxWidth: Theme.lottie.fontWidth[size], marginTop: 20 }}>
					{String(text)}
				</Text>
			)}
		</View>
	);
}
