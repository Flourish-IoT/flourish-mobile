import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Share({ fill = 'white', ...rest }: SvgProps) {
	return (
		<Svg width='19' height='16' viewBox='0 0 19 16' fill='none' {...rest}>
			<Path
				d='M11.6111 4.22222V0L19 7.38889L11.6111 14.7778L11.6111 10.45C6.33333 10.45 2.63889 12.1389 -7.7486e-07 15.8333C1.05555 10.5556 4.22222 5.27778 11.6111 4.22222Z'
				fill={fill}
			/>
		</Svg>
	);
}
