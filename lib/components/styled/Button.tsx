import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme } from '../../../providers/Theme';
import Loading from '../Loading';
import Typography from './Typography';

interface StyledButtonProps {
	title?: string;
	onPress?: () => void;
	buttonStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
	textStyle?: StyleProp<TextStyle>;
	variant: 'primary' | 'text' | 'in-list';
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
	const style = StyleSheet.create({
		button: {
			shadowColor: 'transparent',
			justifyContent: 'center',
			alignItems: 'flex-start',
			...(variant === 'primary' && {
				alignItems: 'center',
				backgroundColor: Theme.colors.cta,
				height: 58,
				borderRadius: 100,
				paddingHorizontal: 32,
			}),
			...(variant === 'text' && {}),
			...(variant === 'in-list' && { width: '100%', height: '100%', paddingLeft: Theme.spacing.md }),
			...(buttonStyle as object),
			opacity: disabled ? 0.5 : 1,
		},
		text: {
			color: Theme.colors.primary,
			textTransform: 'none',
			...(variant === 'primary' && { color: 'white' }),
			...(variant === 'text' && { color: Theme.colors.text }),
			...(variant === 'in-list' && {}),
			...(textStyle as object),
		},
	});

	return (
		<TouchableOpacity {...rest} onPress={onPress} style={{ ...style.button }} disabled={disabled}>
			{loading ? (
				<Loading animation='rings' size='icon' />
			) : icon ? (
				icon
			) : (
				<Typography variant='body' style={style.text}>
					{title}
				</Typography>
			)}
		</TouchableOpacity>
	);
}
