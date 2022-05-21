import React from 'react';
import Svg, { Path, SvgProps, Defs, LinearGradient, Stop, Image, Mask, Rect } from 'react-native-svg';
import { Theme } from '../../providers/Theme';
import { getPlaceHolder } from '../utils/helper';

export interface NewPotProps extends SvgProps {
	imgSource: string | null;
	isLocalImage?: boolean;
}

export default function NewPot({ imgSource, isLocalImage = false, ...rest }: NewPotProps) {
	const mainColor = Theme.colors.pot;
	const gradientStopColor = Theme.colors.darkBrown;
	const highlightColor = '#CB9C65';

	const source = () => {
		if (isLocalImage && !!imgSource) return imgSource;
		return imgSource ? { uri: imgSource } : getPlaceHolder('plant');
	};

	return (
		<Svg width='160' height='230' viewBox='0 0 160 230' fill='none' {...rest}>
			<Image width='160' height='140' href={source()} preserveAspectRatio='xMidYMid slice' mask='url(#clip)' />
			<Path
				d='M159.996 164.038C159.996 168.039 157.985 170.776 155.075 170.776C154.044 170.776 153.014 170.805 151.984 170.763C151.549 170.746 151.41 170.992 151.355 171.52C150.703 177.917 150.034 192.698 149.362 199.091C148.71 205.248 148.173 211.427 147.375 217.544C146.595 223.547 142.713 227.745 138.274 227.745C99.1951 227.745 60.1151 227.745 21.0344 227.745C16.2328 227.745 12.3746 223.046 11.6877 216.487C10.6204 206.168 9.52492 187.466 8.44245 177.15C8.25986 175.284 8.06206 173.397 7.88599 171.526C7.836 170.987 7.69036 170.763 7.26215 170.761C6.06013 170.761 4.83636 170.857 3.6626 170.579C1.52155 170.075 0.0130419 167.454 0 164.475C0 154.877 0 153.667 0 144.07C0.0152155 140.568 2.03888 137.878 4.70595 137.75C4.96678 137.738 5.23197 137.75 5.49498 137.75H154.953C157.387 137.75 159.224 139.528 159.802 142.483C159.929 143.159 159.992 143.845 159.991 144.532C160.002 153.831 160.002 154.735 159.996 164.038Z'
				fill={mainColor}
			/>
			<Path
				d='M158.12 140.78C158.12 143.196 153.555 142.799 148.927 142.799H11.3355C6.72301 142.799 2.15183 143.202 2.15183 140.78C2.15183 138.933 3.44515 137.75 7.23165 137.75H153.038C156.826 137.75 158.12 138.933 158.12 140.78Z'
				fill={highlightColor}
			/>
			<Path
				d='M7.67207 171.63C8.20025 177.103 8.80886 182.561 9.37834 188.025C9.47616 186.099 10.3978 184.524 11.3824 183.232C15.1753 178.289 20.2811 175.673 25.3912 174.056C34.679 171.115 52.4742 170.794 61.9728 170.749H7.04607C7.04607 170.749 7.41776 170.749 7.52644 170.984C7.60818 171.191 7.65726 171.409 7.67207 171.63Z'
				fill='url(#paint0_linear_804_11408)'
			/>
			<Path
				d='M151.834 171.654C151.305 177.16 150.697 182.652 150.127 188.15C150.029 186.213 149.108 184.627 148.123 183.327C144.33 178.354 139.224 175.722 134.114 174.095C124.826 171.136 107.03 170.813 97.5315 170.767H152.46C152.46 170.767 152.088 170.767 151.979 171.004C151.897 171.213 151.848 171.432 151.834 171.654Z'
				fill='url(#paint1_linear_804_11408)'
			/>
			<Defs>
				<Mask id='clip'>
					<Rect
						x='10'
						y='0'
						width='140'
						height='150' // FIX: Adding extra height makes only one side appear to have radius
						rx={Theme.borderRadius}
						ry={Theme.borderRadius}
						fill='#ffffff'
					/>
				</Mask>
				<LinearGradient
					id='paint0_linear_804_11408'
					x1='62.151'
					y1='179.387'
					x2='7.0439'
					y2='179.387'
					gradientUnits='userSpaceOnUse'
				>
					<Stop offset='0.11' stopColor={mainColor} />
					<Stop offset='1' stopColor={gradientStopColor} />
				</LinearGradient>
				<LinearGradient
					id='paint1_linear_804_11408'
					x1='97.3533'
					y1='179.459'
					x2='152.462'
					y2='179.459'
					gradientUnits='userSpaceOnUse'
				>
					<Stop offset='0.11' stopColor={mainColor} />
					<Stop offset='1' stopColor={gradientStopColor} />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}
