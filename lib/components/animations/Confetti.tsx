import React from 'react';
import { ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { getLottie } from '../LottieBase';

interface ConfettiParams {
	style?: ViewStyle;
}

export default function Confetti({ style }: ConfettiParams) {
	return (
		<LottieView
			style={style}
			resizeMode='cover'
			// @ts-ignore
			source={getLottie('confetti')}
			autoPlay
			loop={false}
		/>
	);
}
