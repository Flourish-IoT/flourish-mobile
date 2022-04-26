import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { Theme } from '../../providers/Theme';
import AnimatedLottieView from 'lottie-react-native';
import { MetricRange, PlantMetric } from '../../data/garden';
import Water from '../assets/lottie/water.json';
import Sunlight from '../assets/lottie/sunlight.json';
import Temperature from '../assets/lottie/temperature.json';
import Humidity from '../assets/lottie/humidity.json';

interface TemperatureGaugeProps {
	type: PlantMetric;
	value: MetricRange;
}

const gaugeFrames = {
	'1-2': [0, 13],
	'1-3': [14, 28],
	'1-4': [29, 42],
	'1-5': [43, 56],
	'2-3': [57, 70],
	'2-4': [71, 84],
	'2-5': [85, 98],
	'3-4': [99, 112],
	'3-5': [113, 126],
	'4-5': [127, 140],
};

const getAnimation = (type: PlantMetric) => {
	switch (type) {
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

export default function AnimatedGauge({ type, value }: TemperatureGaugeProps) {
	const [oldValue, setOld] = useState<MetricRange>(1);
	const [animation, setAnimation] = useState<AnimatedLottieView>();

	useEffect(() => {
		if (!animation) return;

		const inReverse = value < oldValue;
		const range = gaugeFrames[inReverse ? value + '-' + oldValue : oldValue + '-' + value];

		if (!range) return;

		animation.play(range[inReverse ? 1 : 0], range[inReverse ? 0 : 1]);
		setOld(value);
	}, [value]);

	return (
		<LottieView
			ref={setAnimation}
			style={{ width: Theme.lottie.width.md }}
			resizeMode='cover'
			source={getAnimation(type)}
			autoPlay
			loop={false}
		/>
	);
}
