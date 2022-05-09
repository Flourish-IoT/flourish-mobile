import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { LottieSize, Theme } from '../../providers/Theme';
import { PlantMetric } from '../../data/garden';
import MagnifyingGlass from '../assets/lottie/magnifyingGlass.json';
import Rings from '../assets/lottie/rings.json';
import Confetti from '../assets/lottie/confetti.json';
import Error from '../assets/lottie/error.json';
import Relax from '../assets/lottie/relax.json';
import Water from '../assets/lottie/water.json';
import Sunlight from '../assets/lottie/sunlight.json';
import Temperature from '../assets/lottie/temperature.json';
import Humidity from '../assets/lottie/humidity.json';

interface LottieBaseParams {
	animation?: LottieName;
	text?: string;
	style?: ViewStyle;
	size?: LottieSize;
}

type LottieName = 'magnifyingGlass' | 'rings' | 'error' | 'relax' | 'confetti' | PlantMetric;

export const getLottie = (name: LottieName) => {
	switch (name) {
		case 'magnifyingGlass':
			return MagnifyingGlass;
		case 'rings':
			return Rings;
		case 'error':
			return Error;
		case 'relax':
			return Relax;
		case 'confetti':
			return Confetti;
		case 'Water':
			return Water;
		case 'Sunlight':
			return Sunlight;
		case 'Temperature':
			return Temperature;
		case 'Humidity':
			return Humidity;
	}
};

export default function LottieBase({ animation, text, size = 'md', style }: LottieBaseParams) {
	return (
		<View style={{ ...Theme.lottie.wrapper, ...style }}>
			{!!animation && (
				<LottieView
					style={{ width: Theme.lottie.width[size] }}
					resizeMode='cover'
					// @ts-ignore This is always an animation type
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
