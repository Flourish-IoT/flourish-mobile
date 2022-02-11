import React from 'react';
import { View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { Theme } from '../../providers/Theme';

export interface ChevronProps extends SvgProps {
	direction?: 'up' | 'down' | 'left' | 'right';
	withBackground?: boolean;
	onPress?: () => void;
	backgroundStyle?: ViewStyle;
}

export default function Chevron({
	fill = 'black',
	direction = 'up',
	withBackground = false,
	onPress,
	style,
	backgroundStyle,
	...rest
}: ChevronProps) {
	const rotation = () => {
		switch (direction) {
			case 'up':
				return 0;
			case 'right':
				return 90;
			case 'down':
				return 180;
			case 'left':
				return 270;
		}
	};

	const transform = [{ rotate: rotation() + 'deg' }];

	withBackground &&
		transform.push({
			// @ts-ignore
			translateY: -1.5,
		});

	return (
		<View style={withBackground && backgroundStyle}>
			<TouchableOpacity
				onPress={onPress ?? null}
				style={
					withBackground && {
						...Theme.util.flexCenter,
						backgroundColor: Theme.colors.primary,
						borderRadius: 100,
						width: 32,
						height: 32,
					}
				}
			>
				<Svg
					width='14'
					height='9'
					viewBox='0 0 14 9'
					fill='none'
					style={{
						transform: transform,
						opacity: rest.disabled ? 0.5 : 1,
						...(style as object),
					}}
					{...rest}
				>
					<Path
						d='M7.07098 3.32797L2.12098 8.27797C1.93238 8.46013 1.67978 8.56092 1.41758 8.55864C1.15538 8.55637 0.904571 8.4512 0.719163 8.26579C0.533755 8.08038 0.428586 7.82957 0.426307 7.56737C0.424029 7.30518 0.524823 7.05257 0.706981 6.86397L6.36398 1.20697C6.55151 1.0195 6.80582 0.914185 7.07098 0.914185C7.33615 0.914185 7.59045 1.0195 7.77798 1.20697L13.435 6.86397C13.6171 7.05257 13.7179 7.30518 13.7157 7.56737C13.7134 7.82957 13.6082 8.08038 13.4228 8.26579C13.2374 8.4512 12.9866 8.55637 12.7244 8.55864C12.4622 8.56092 12.2096 8.46013 12.021 8.27797L7.07098 3.32797Z'
						fill={withBackground ? 'white' : fill}
					/>
				</Svg>
			</TouchableOpacity>
		</View>
	);
}
