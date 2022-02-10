import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function GradCap({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='35' height='30' viewBox='0 0 29 23' fill='none' {...rest}>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M27.3396 15.4381V7.30059C28.1764 6.55038 27.9457 5.59812 26.5605 4.96328L17.211 0.577074C16.3743 0.173096 15.2489 0 14.1523 0C13.0557 0 11.9303 0.202092 11.0936 0.577074L1.71529 4.93432C0.0416273 5.7135 0.0128225 7.01198 1.71529 7.79115L4.80302 9.23396V15.8421L4.8318 16.1017C4.94714 16.4769 6.07252 19.7088 14.1235 19.7088C22.1744 19.7088 23.3287 16.4769 23.4153 16.1017L23.473 9.23392L25.3486 8.36818V15.4668C24.9158 16.0439 24.0789 17.2848 24.0789 18.7564C24.0789 20.7476 25.5505 22.3057 25.6082 22.3923C25.7813 22.5944 26.041 22.7097 26.3296 22.7097C26.5893 22.7097 26.849 22.5944 27.051 22.3923C27.1088 22.3345 28.5804 20.7764 28.5804 18.7564C28.6094 17.2271 27.7725 15.9861 27.3397 15.4379L27.3396 15.4381ZM21.5107 15.6402C21.251 16.0729 19.837 17.7466 14.1523 17.7466C8.38105 17.7466 7.0248 16.0151 6.79395 15.6402V10.1575L11.0936 12.1486C11.9303 12.5526 13.0557 12.7257 14.1523 12.7257C15.2489 12.7257 16.3743 12.5236 17.211 12.1486L21.5107 10.1575V15.6402ZM16.3742 10.3883C15.8259 10.648 14.9892 10.7923 14.1523 10.7923C13.3155 10.7923 12.4786 10.648 11.9303 10.3883L3.33109 6.37729L11.9303 2.36626C12.4786 2.1066 13.3153 1.96228 14.1523 1.96228C14.989 1.96228 15.8259 2.10661 16.3742 2.36626L24.9446 6.37729L16.3742 10.3883ZM26.3585 19.9109C26.2142 19.5647 26.0699 19.1607 26.0699 18.7567C26.0699 18.3528 26.1852 17.9488 26.3585 17.6026C26.5028 17.9488 26.6472 18.3528 26.6472 18.7567C26.6182 19.1607 26.5026 19.5647 26.3585 19.9109Z'
				fill={fill}
			/>
		</Svg>
	);
}
