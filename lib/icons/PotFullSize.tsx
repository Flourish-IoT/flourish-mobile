import React from 'react';
import Svg, { Path, SvgProps, G, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';
import { Theme } from '../../providers/Theme';

export interface PotBaseSvgProps extends SvgProps {}

export default function PotFullSize({ fill = Theme.colors.pot, ...rest }: PotBaseSvgProps) {
	return (
		<Svg width='161' height='94' viewBox='0 0 161 94' fill='none' {...rest}>
			<G clip-path='url(#a)'>
				<Path
					fill={fill}
					d='M160.996 27.3889c0 4.1683-2.024 7.0193-4.952 7.0193-1.037 0-2.074.0306-3.111-.0131-.437-.0175-.577.2381-.632.7886-.656 6.6654-1.329 22.0649-2.005 28.7259-.656 6.4141-1.197 12.8522-1.999 19.2249-.786 6.2546-4.692 10.6282-9.158 10.6282H21.1658c-4.8315 0-8.7139-4.8957-9.4051-11.7293-1.0739-10.7506-2.17625-30.2355-3.26549-40.9839-.18373-1.9443-.38277-3.9105-.55993-5.8592-.05031-.5615-.19685-.7952-.62774-.7974-1.20954 0-2.44095.1005-3.62205-.1901C1.53106 33.6785.0131234 30.9477 0 27.8433V6.58457C.0153106 2.93622 2.05162.133321 4.73536.0000579c.26247-.0131079.52931 0 .79396 0H155.921c2.45 0 4.298 1.8525721 4.88 4.9307421.127.70433.191 1.41867.19 2.13439.011 9.68891.011 10.63051.005 20.32371Z'
				/>
				<Path
					fill='#CB9C65'
					d='M159.108 3.15681c0 2.51671-4.593 2.10381-9.25 2.10381H11.4065c-4.64135 0-9.24109.41945-9.24109-2.10381C2.16541 1.23214 3.46681 0 7.27697 0H153.994c3.813 0 5.114 1.23214 5.114 3.15681Z'
				/>
				<Path
					fill='url(#b)'
					d='M152.783 35.3235c-.532 5.7369-1.144 11.4584-1.717 17.1866-.099-2.0186-1.026-3.6702-2.017-5.0247-3.817-5.182-8.955-7.9237-14.097-9.619-9.346-3.0825-27.253-3.419-36.8109-3.467h55.2709s-.374 0-.483.2468c-.082.2173-.132.4455-.146.6773Z'
				/>
				<Path
					fill='url(#c)'
					d='M7.78214 35.3191c.53149 5.7369 1.14392 11.4585 1.71697 17.1866.09843-2.0186 1.02799-3.6702 2.01659-5.0247 3.8102-5.1907 8.9568-7.9302 14.0968-9.6255 9.346-3.0825 27.2529-3.419 36.8111-3.467H7.15002s.37402 0 .48557.249c.08327.2184.13268.4483.14655.6816Z'
				/>
			</G>
			<Defs>
				<LinearGradient id='b' x1='97.9618' x2='153.415' y1='43.4547' y2='43.4547' gradientUnits='userSpaceOnUse'>
					<Stop offset='0.11' stopColor={fill} />
					<Stop offset='1' stopColor={Theme.colors.accent} />
				</LinearGradient>
				<LinearGradient id='c' x1='91042.9' x2='77029.4' y1='3637.73' y2='3637.73' gradientUnits='userSpaceOnUse'>
					<Stop offset='0.11' stopColor={fill} />
					<Stop offset='1' stopColor={Theme.colors.accent} />
				</LinearGradient>
				<ClipPath id='a'>
					<Path fill='#fff' d='M0 0h161v93.7692H0z' />
				</ClipPath>
			</Defs>
		</Svg>
	);
}