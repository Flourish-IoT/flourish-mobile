import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

export default function Facebook(props: SvgProps) {
	return (
		<Svg width='13' height='27' viewBox='0 0 13 27' fill='none' {...props}>
			<Path
				d='M3.3186 27V14.3308H0V9.7693H3.3186V5.87318C3.3186 2.81156 5.27891 0 9.79588 0C11.6247 0 12.9771 0.176985 12.9771 0.176985L12.8705 4.43667C12.8705 4.43667 11.4913 4.42311 9.98632 4.42311C8.35743 4.42311 8.09646 5.18087 8.09646 6.43856V9.7693H13L12.7866 14.3308H8.09646V27H3.3186Z'
				fill={props.fill ?? 'black'}
			/>
		</Svg>
	);
}
