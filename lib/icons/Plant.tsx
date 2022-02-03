import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Plant({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='38' height='41' viewBox='0 0 38 41' fill='none' {...rest}>
			<Path
				d='M1.81775 38.9437C1.81775 38.9437 7.99959 34.5273 18.4222 34.5273C28.8448 34.5273 34.7623 38.9437 34.7623 38.9437'
				stroke={fill}
				stroke-width='2.5'
				stroke-miterlimit='10'
				stroke-linecap='round'
			/>
			<Path
				d='M18.4223 34.5273C18.4223 34.5273 19.3059 28.3621 15.6844 19.4757'
				stroke={fill}
				stroke-width='2.5'
				stroke-miterlimit='10'
				stroke-linecap='round'
			/>
			<Path
				d='M18.2928 29.1941C18.2928 29.1941 19.7514 26.1364 26.1107 22.8699'
				stroke={fill}
				stroke-width='2.5'
				stroke-miterlimit='10'
				stroke-linecap='round'
			/>
			<Path
				d='M16.4183 21.4113C19.5 19.4758 23.0734 13.8319 16.4183 6.26355C11.7894 0.996787 3.33184 -0.227011 2.26702 0.941328C1.2022 2.10967 4.07869 2.34629 4.3948 7.32652C4.71092 12.3068 3.72375 15.7286 7.2528 19.2022C10.7818 22.6758 15.3702 22.0694 16.4183 21.4113Z'
				fill={fill}
			/>
			<Path
				d='M23.5577 24.8017C22.199 22.2561 24.4136 18.0153 28.2643 16.7324C32.1151 15.4494 37.6166 16.9764 37.4336 18.3832C37.2506 19.79 35.1154 19.4221 34.0062 21.5C32.897 23.5779 32.6013 24.9995 30.3385 26.336C28.0758 27.6726 24.9165 27.3454 23.5577 24.8017Z'
				fill={fill}
			/>
		</Svg>
	);
}
