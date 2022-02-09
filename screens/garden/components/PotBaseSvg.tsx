import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { Theme } from '../../../providers/Theme';

export default function PotBaseSvg({ fill = Theme.colors.accent, ...rest }: SvgProps) {
	return (
		<Svg width='162' height='100' viewBox='0 0 162 100' fill='none' {...rest}>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M6 0C2.68629 0 0 2.68629 0 6V25C0 28.3137 2.68629 31 6 31L11.9878 94.5627C12.2781 97.6448 14.8656 100 17.9613 100H143.039C146.134 100 148.722 97.6448 149.012 94.5627L155 31H156C159.314 31 162 28.3137 162 25V6C162 2.68629 159.314 0 156 0H6Z'
				fill={fill}
			/>
		</Svg>
	);
}
