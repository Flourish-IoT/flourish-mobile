import * as React from 'react';
import Svg, { SvgProps, Rect } from 'react-native-svg';

export default function Minus(props: SvgProps) {
	let fill = props.fill ?? 'black';

	return (
		<Svg width='12' height='2' viewBox='0 0 12 2' fill='none' {...props}>
			<Rect x='12' width='2' height='12' rx='1' transform='rotate(90 12 0)' fill={fill} />
		</Svg>
	);
}
