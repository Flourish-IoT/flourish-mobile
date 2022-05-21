import React from 'react';
import Svg, { Path, SvgProps, Circle } from 'react-native-svg';
import { Theme } from '../../providers/Theme';

export default function Camera({ fill = Theme.colors.primary, ...rest }: SvgProps) {
	return (
		<Svg width='250' height='250' viewBox='0 0 250 250' fill='none' {...rest}>
			<Circle cx='125' cy='125' r='121' stroke={fill} strokeWidth='8' />
			<Path
				d='M56.2936 190.342C55.0892 190.282 53.933 189.85 52.9848 189.105C52.0366 188.36 51.3431 187.339 51 186.183V83.789C51.3733 81.7775 52.4651 79.9704 54.0721 78.7043C55.6791 77.4382 57.6915 76.7996 59.7345 76.9073H190.109C191.904 76.6876 193.72 77.0995 195.244 78.0723C196.769 79.0451 197.908 80.5181 198.465 82.2387V186.561C198.087 188.073 198.087 189.964 195.062 190.72L56.2936 190.342Z'
				stroke={fill}
				strokeWidth='8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M178.656 104.905C182.853 104.905 186.256 101.502 186.256 97.3047C186.256 93.1073 182.853 89.7046 178.656 89.7046C174.458 89.7046 171.056 93.1073 171.056 97.3047C171.056 101.502 174.458 104.905 178.656 104.905Z'
				stroke={fill}
				strokeWidth='8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path d='M62 59H82V75H62V59Z' stroke={fill} strokeWidth='8' strokeLinecap='round' strokeLinejoin='round' />
			<Path
				d='M124.543 180.057C149.665 180.057 170.03 159.691 170.03 134.569C170.03 109.447 149.665 89.082 124.543 89.082C99.4213 89.082 79.0559 109.447 79.0559 134.569C79.0559 159.691 99.4213 180.057 124.543 180.057Z'
				stroke={fill}
				strokeWidth='8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M124.543 154.648C135.632 154.648 144.621 145.658 144.621 134.57C144.621 123.481 135.632 114.492 124.543 114.492C113.454 114.492 104.465 123.481 104.465 134.57C104.465 145.658 113.454 154.648 124.543 154.648Z'
				stroke={fill}
				strokeWidth='8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M125.409 124.848C123.172 125.048 121.033 125.859 119.225 127.193C117.418 128.526 116.013 130.331 115.162 132.41'
				stroke={fill}
				strokeWidth='8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}
