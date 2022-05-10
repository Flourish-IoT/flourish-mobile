import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Repot({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='20' height='20' viewBox='0 0 20 20' fill='none' {...rest}>
			<Path
				d='M7.76549 13.4379H15.7996C15.7996 13.4379 16.4176 19 11.7826 19C7.14748 19 7.76549 13.4379 7.76549 13.4379Z'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M1.01504 15.5109H5.42757C5.42757 15.5109 5.767 18.8429 3.22131 18.8429C0.675618 18.8429 1.01504 15.5109 1.01504 15.5109Z'
				stroke={fill}
				strokeWidth='1.25'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M11.977 7.41003C11.977 8.9873 11.977 10.6376 11.977 10.6376V7.41003ZM11.3461 8.04094C11.3461 8.04094 12.2925 5.5173 10.0843 3.62458C7.87612 1.73185 4.40613 2.36276 4.40613 2.36276C4.40613 2.36276 4.40613 4.88639 6.29885 6.77912C8.19158 8.67184 11.3461 8.04094 11.3461 8.04094ZM11.977 6.77912C11.977 6.77912 11.0307 4.25549 13.2388 2.36276C15.447 0.470037 18.917 1.10095 18.917 1.10095C18.917 1.10095 18.917 3.62458 17.0243 5.5173C15.1316 7.41003 11.977 6.77912 11.977 6.77912Z'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path d='M2.45238 13.0672C3.13546 11.2378 4.99724 10.2431 6.61078 10.8455' stroke={fill} strokeLinecap='round' />
			<Path d='M6.91988 9.25478L8.72786 11.5037L5.87624 11.945L6.91988 9.25478Z' fill={fill} />
		</Svg>
	);
}
