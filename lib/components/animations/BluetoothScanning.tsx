import React from 'react';
import { ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { getLottie } from '../LottieBase';
import { Theme, LottieSize } from '../../../providers/Theme';

interface ConfettiParams {
	style?: ViewStyle;
	size?: LottieSize;
}

export default function BluetoothScanning({ style, size = 'md' }: ConfettiParams) {
	return (
		<LottieView
			style={{ width: Theme.lottie.width[size], ...style }}
			resizeMode='cover'
			// @ts-ignore
			source={getLottie('bluetooth')}
			autoPlay
		/>
	);
}
