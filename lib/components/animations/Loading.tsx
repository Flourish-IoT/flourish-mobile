import React from 'react';
import { ViewStyle } from 'react-native';
import { LottieSize } from '../../../providers/Theme';
import LottieBase from '../LottieBase';

interface LoadingParams {
	animation?: 'rings';
	text?: string;
	style?: ViewStyle;
	size?: LottieSize;
}

export default function Loading({ animation, text, size, style }: LoadingParams) {
	return <LottieBase animation={animation} text={text} size={size} style={style} />;
}
