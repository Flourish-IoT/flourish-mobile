import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { Theme } from '../../../providers/Theme';
import AnimatedLottieView from 'lottie-react-native';
import { GaugeValue, PlantMetric } from '../../../data/garden';
import { getLottie } from '../LottieBase';

interface TemperatureGaugeProps {
	type: PlantMetric;
	newValue: GaugeValue;
}

const gaugeFrames = {
	'1-1': [0, 0],
	'1-2': [0, 13],
	'1-3': [14, 28],
	'1-4': [29, 42],
	'1-5': [43, 56],
	'2-2': [70, 70],
	'2-3': [57, 70],
	'2-4': [71, 84],
	'2-5': [85, 98],
	'3-3': [99, 99],
	'3-4': [99, 112],
	'3-5': [113, 126],
	'4-4': [127, 127],
	'4-5': [127, 140],
	'5-5': [140, 140],
};

export default function AnimatedGauge({ type, newValue }: TemperatureGaugeProps) {
	const [lastValue, setLastValue] = useState<GaugeValue>(1);
	const [animation, setAnimation] = useState<AnimatedLottieView>();

	useEffect(() => {
		if (!animation) return;

		const inReverse = newValue < lastValue;
		let range = gaugeFrames[inReverse ? newValue + '-' + lastValue : lastValue + '-' + newValue];

		animation.play(range[inReverse ? 1 : 0], range[inReverse ? 0 : 1]);
		setLastValue(newValue);
	}, [animation, newValue]);

	return (
		<LottieView
			ref={setAnimation}
			style={{ width: Theme.lottie.width.sm }}
			resizeMode='cover'
			// @ts-ignore
			source={getLottie(type)}
			autoPlay={false}
			loop={false}
		/>
	);
}
