import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Plus(props: SvgProps) {
	let fill = props.fill ?? 'black';

	return (
		<Svg width='12' height='12' viewBox='0 0 12 12' fill='none' {...props}>
			<Path
				d='M5 1C5 0.447715 5.44772 0 6 0C6.55228 0 7 0.447715 7 1V11C7 11.5523 6.55228 12 6 12C5.44772 12 5 11.5523 5 11V1Z'
				fill={fill}
			/>
			<Path d='M11 5C11.5523 5 12 5.44772 12 6C12 6.55228 11.5523 7 11 7H7V5H11Z' fill={fill} />
			<Path d='M1 7C0.447715 7 -6.58593e-09 6.55228 0 6C6.58593e-09 5.44772 0.447715 5 1 5H5V7H1Z' fill={fill} />
		</Svg>
	);
}
