import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme } from '../../../providers/Theme';
import Loading from '../animations/Loading';
import Typography from './Typography';

interface StyledButtonProps {
	title?: string;
	onPress?: () => void;
	buttonStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
	textStyle?: StyleProp<TextStyle>;
	variant: 'primary' | 'text' | 'in-list' | 'button';
	disabled?: boolean;
	loading?: boolean;
	icon?: JSX.Element;
}

export default function StyledButton({
	title,
	onPress,
	buttonStyle,
	textStyle,
	variant,
	disabled = false,
	loading = false,
	icon,
	...rest
}: StyledButtonProps) {
	const getBgColor = () => {
		// @ts-ignore: backgroundColor is a valid property
		const specifiedBgColor = buttonStyle?.backgroundColor;

		if (!!specifiedBgColor) {
			return disabled ? specifiedBgColor + '50' : specifiedBgColor;
		}

		// NOTE: Fixes opacity w/ disabled bug for TouchableOpacity
		// https://github.com/facebook/react-native/issues/17105
		// (This says it's fixed but it's still an issue)
		if (variant === 'primary') {
			return disabled ? Theme.colors.cta + '50' : Theme.colors.cta;
		} else if (variant === 'button') {
			return disabled ? Theme.colors.primary + '50' : Theme.colors.primary;
		}

		return 'transparent';
	};

	const style = StyleSheet.create({
		button: {
			shadowColor: 'transparent',
			justifyContent: 'center',
			alignItems: 'flex-start',
			...(variant === 'primary' && {
				alignItems: 'center',
				height: 58,
				borderRadius: 100,
				paddingHorizontal: 32,
			}),
			...(variant === 'text' && {}),
			...(variant === 'button' && {
				height: 45,
				width: 45,
				borderRadius: 100,
				alignItems: 'center',
			}),
			...(variant === 'in-list' && {
				width: '100%',
				height: '100%',
				paddingLeft: Theme.spacing.md,
			}),
			...(buttonStyle as object),
			backgroundColor: getBgColor(),
		},
		text: {
			color: Theme.colors.primary,
			textTransform: 'none',
			...(variant === 'primary' && {
				color: 'white',
			}),
			...(variant === 'text' && {
				color: Theme.colors.text,
			}),
			...(variant === 'in-list' && {}),
			...(textStyle as object),
		},
	});

	// @ts-ignore: fontWeight is a valid property
	const isBold = textStyle?.fontWeight === 'bold';

	return (
		<TouchableOpacity {...rest} onPress={onPress} style={style.button} disabled={disabled}>
			{loading ? (
				<Loading animation='rings' size='icon' />
			) : icon ? (
				icon
			) : (
				<Typography variant={variant === 'primary' || isBold ? 'h3bold' : 'body'} style={style.text}>
					{title}
				</Typography>
			)}
		</TouchableOpacity>
	);
}
