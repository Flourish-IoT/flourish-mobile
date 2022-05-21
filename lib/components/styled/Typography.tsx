import React, { ReactNode } from 'react';
import { Text, TextStyle, Linking } from 'react-native';
import { OurFontName, Theme } from '../../../providers/Theme';

interface TypographyProps {
	variant: OurFontName;
	children?: ReactNode;
	externalLink?: string;
	style?: TextStyle;
}

export default function Typography({ variant, children, externalLink, style, ...rest }: TypographyProps) {
	const fontStyle: TextStyle = {
		...Theme.fonts[variant],
		...(!Theme.fonts[variant].color && {
			color: Theme.colors.text,
		}),
		...(!!Theme.fonts[variant].lineHeight && {
			lineHeight: Theme.fonts[variant].lineHeight,
		}),
		...(variant === 'link' && {
			textDecorationLine: 'underline',
		}),
		...style,
	};

	if (!children) return null;

	return (
		<Text style={fontStyle} {...rest}>
			{variant === 'li' && '\u2022   '}
			{children}
		</Text>
	);
}
