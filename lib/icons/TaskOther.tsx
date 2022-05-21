import React from 'react';
import Svg, { Path, SvgProps, Circle, Line } from 'react-native-svg';

export default function TaskOther({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='18' height='18' viewBox='0 0 18 18' fill='none' {...rest}>
			<Path
				d='M4.95252 5.00017L8.84949 1.06572L12.7465 5.00016C14.8987 7.1731 14.8987 10.6961 12.7465 12.8691C10.5942 15.042 7.10475 15.042 4.95252 12.8691C2.80028 10.6961 2.80028 7.1731 4.95252 5.00017Z'
				stroke={fill}
				strokeWidth='1.5'
			/>
			<Line x1='8.82147' y1='12.6923' x2='8.82147' y2='17.25' stroke={fill} strokeWidth='1.5' strokeLinecap='round' />
			<Circle cx='8.82147' cy='8.57857' r='0.75' fill={fill} />
			<Circle cx='11.8215' cy='8.57857' r='0.75' fill={fill} />
			<Circle cx='5.82147' cy='8.57857' r='0.75' fill={fill} />
		</Svg>
	);
}
