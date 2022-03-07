import React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
import { Theme } from '../../providers/Theme';

export default function VideoPlay({ fill = 'white', ...rest }: SvgProps) {
	return (
		<Svg width='34' height='34' viewBox='0 0 34 34' fill='none' {...rest}>
			<Circle cx='17' cy='17' r='17' fill={fill} />
			<Path d='M13 10V24L24 17L13 10Z' fill={Theme.colors.primary} />
		</Svg>
	);
}
