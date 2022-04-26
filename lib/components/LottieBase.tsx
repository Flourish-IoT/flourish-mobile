import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { LottieSize, Theme } from '../../providers/Theme';
import MagnifyingGlass from '../assets/lottie/magnifyingGlass.json';
import Rings from '../assets/lottie/rings.json';
import Growing from '../assets/lottie/growing.json';
import Error from '../assets/lottie/error.json';
import Relax from '../assets/lottie/relax.json';

interface LottieBaseParams {
	animation?: LottieName;
	text?: string;
	style?: ViewStyle;
	size?: LottieSize;
}

type LottieName = 'magnifyingGlass' | 'rings' | 'growing' | 'error' | 'relax';

export const getLottie = (name: LottieName) => {
	switch (name) {
		case 'magnifyingGlass':
			return MagnifyingGlass;
		case 'rings':
			return Rings;
		case 'growing':
			return Growing;
		case 'error':
			return Error;
		case 'relax':
			return Relax;
	}
};

export default function LottieBase({ animation, text, size = 'md', style }: LottieBaseParams) {
	return (
		<View style={{ ...Theme.lottie.wrapper, ...style }}>
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
				<Text
					style={{
						fontSize: Theme.lottie.fontSize[size],
						maxWidth: Theme.lottie.fontWidth[size],
						marginTop: Theme.spacing.lg,
					}}
				>
					{String(text)}
				</Text>
			)}
		</View>
	);
}
