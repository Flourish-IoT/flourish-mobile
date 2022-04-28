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
	newValue: MetricRange;
	plantId: number;
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
	noData: [0, 0],
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

export default function AnimatedGauge({ type, newValue, plantId }: TemperatureGaugeProps) {
	const [lastValue, setLastValue] = useState<MetricRange>(1);
	const [animation, setAnimation] = useState<AnimatedLottieView>();

	useEffect(() => {
		if (!animation) return;

		const inReverse = newValue < lastValue;
		let range = gaugeFrames[inReverse ? newValue + '-' + lastValue : lastValue + '-' + newValue];

		if (!range) {
			animation.play(gaugeFrames.noData[0], gaugeFrames.noData[1]);
			setLastValue(1);
			return;
		}

		animation.play(range[inReverse ? 1 : 0], range[inReverse ? 0 : 1]);
		setLastValue(newValue);
	}, [animation, newValue]);

	return (
		<LottieView
			ref={setAnimation}
			style={{ width: Theme.lottie.width.sm }}
			resizeMode='cover'
			source={getAnimation(type)}
			autoPlay={false}
			loop={false}
		/>
	);
}
