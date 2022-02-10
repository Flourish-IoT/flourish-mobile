import React from 'react';
import Svg, { Rect, SvgProps } from 'react-native-svg';

export default function Carousel({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='22' height='20' viewBox='0 0 22 20' fill='none' {...rest}>
			<Rect x='1' y='1.81818' width='20' height='16.3636' rx='1' stroke={fill} />
			<Rect x='4.63635' width='12.7273' height='20' rx='1' fill={fill} />
		</Svg>
	);
}
