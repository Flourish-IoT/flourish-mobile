import React from 'react';
import { ViewStyle } from 'react-native';
import { LottieSize } from '../../../providers/Theme';
import LottieBase from '../LottieBase';

interface EmptyParams {
	animation?: 'error' | 'magnifyingGlass' | 'relax';
	text?: string;
	style?: ViewStyle;
	size?: LottieSize;
}

export default function Empty({ animation, text, size, style }: EmptyParams) {
	return <LottieBase animation={animation} text={text} size={size} style={style} />;
}
