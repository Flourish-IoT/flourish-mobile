import React from 'react';
import Svg, { Path, SvgProps, Circle } from 'react-native-svg';

export default function Fertilize({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='15' height='19' viewBox='0 0 15 19' fill='none' {...rest}>
			<Path
				d='M7.67727 9.65342C7.67727 11.0445 6.84261 12.9921 6.84261 12.9921L7.67727 9.65342ZM7.12083 10.2099C7.12083 10.2099 7.95549 7.9841 6.00795 6.31479C4.06041 4.64547 1 5.20191 1 5.20191C1 5.20191 1 7.42766 2.66932 9.09698C4.33863 10.7663 7.12083 10.2099 7.12083 10.2099ZM7.67727 9.09698C7.67727 9.09698 6.84261 6.87122 8.79014 5.20191C10.7377 3.53259 13.7981 4.08903 13.7981 4.08903C13.7981 4.08903 13.7981 6.31479 12.1288 7.9841C10.4595 9.65342 7.67727 9.09698 7.67727 9.09698ZM3.22576 12.9921H10.4595C10.4595 12.9921 11.0159 18 6.84261 18C2.66932 18 3.22576 12.9921 3.22576 12.9921Z'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Circle cx='1' cy='2' r='1' fill={fill} />
			<Circle cx='4.5' cy='0.5' r='0.5' fill={fill} />
			<Circle cx='7' cy='3' r='1' fill={fill} />
			<Circle cx='10.5' cy='0.5' r='0.5' fill={fill} />
			<Circle cx='13.5' cy='1.5' r='0.5' fill={fill} />
		</Svg>
	);
}
