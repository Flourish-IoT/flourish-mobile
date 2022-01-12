import * as React from 'react';
import Theme from '../theme/index';
import Svg, { G, Path, SvgProps, Rect } from 'react-native-svg';

export default function Minus(props: SvgProps) {
	return (
		<Svg width='12' height='2' viewBox='0 0 12 2' fill='none' {...props}>
			<Rect x='12' width='2' height='12' rx='1' transform='rotate(90 12 0)' fill={props.fill ?? 'black'} />
		</Svg>
	);
}
