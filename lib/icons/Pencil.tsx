import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Pencil({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='17' height='16' viewBox='0 0 17 16' fill='none' {...rest}>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M15.3547 1.0425L15.3894 1.0766C15.4895 1.17515 15.5636 1.24803 15.6259 1.31703C16.7221 2.52853 16.7221 4.35701 15.6259 5.56865C15.5636 5.63752 15.4895 5.71053 15.3894 5.80908L7.2052 13.8701C6.79588 14.2736 6.48566 14.5796 6.10115 14.7942C5.71679 15.0091 5.29104 15.1142 4.72939 15.2531L3.61815 15.5282C3.08691 15.6599 2.60276 15.78 2.21176 15.8181C1.79633 15.8587 1.26346 15.8318 0.842986 15.4229C0.422513 15.014 0.388452 14.4895 0.424285 14.08C0.458091 13.6945 0.573762 13.216 0.700565 12.6912L0.967477 11.5859C1.1046 11.0173 1.20846 10.5863 1.4292 10.1971C1.64982 9.80797 1.96806 9.49492 2.38783 9.08187L10.5502 1.04281C10.6501 0.944256 10.7242 0.871246 10.7943 0.809735C12.0243 -0.269911 13.8806 -0.269911 15.1106 0.809735C15.1806 0.871246 15.2548 0.943952 15.3547 1.0425ZM14.2253 2.18914C14.1004 2.06612 14.0619 2.02881 14.0315 2.00207C13.4165 1.46223 12.4883 1.46223 11.8734 2.00207C11.843 2.02881 11.8045 2.06612 11.6797 2.18914L11.2849 2.57785L13.8306 5.08507L14.2253 4.69637C14.3502 4.57334 14.388 4.5355 14.4151 4.50555C14.9633 3.89981 14.9633 2.98571 14.4151 2.37994C14.388 2.34999 14.3502 2.31216 14.2253 2.18914ZM3.60119 10.1457L10.138 3.70733L12.6836 6.21456L6.12277 12.6762C5.62017 13.1712 5.47017 13.3096 5.30087 13.4043C5.13158 13.4989 4.93403 13.5546 4.24462 13.7254L3.27838 13.9647C2.67231 14.1149 2.30752 14.203 2.05133 14.228L2.03898 14.2292L2.03993 14.2171C2.06219 13.9643 2.14691 13.604 2.29163 13.0052L2.52352 12.0454C2.69214 11.3473 2.74767 11.1473 2.84487 10.9759C2.94208 10.8044 3.0861 10.6532 3.60119 10.1457ZM9.75918 13.7866C9.31128 13.7866 8.94812 14.1443 8.94812 14.5855C8.94812 15.0266 9.31128 15.3842 9.75918 15.3842H15.4358C15.8837 15.3842 16.2467 15.0266 16.2467 14.5855C16.2467 14.1443 15.8837 13.7866 15.4358 13.7866H9.75918Z'
				fill={fill}
			/>
		</Svg>
	);
}