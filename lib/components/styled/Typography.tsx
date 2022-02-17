import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { OurFontName, Theme } from '../../../providers/Theme';

interface TypographyProps {
	variant: OurFontName;
	children?: ReactNode;
	style?: TextStyle;
}

export default function Typography({ variant, children, style, ...rest }: TypographyProps) {
	const fontStyle: TextStyle = {
		...Theme.fonts[variant],
		...(!Theme.fonts[variant].color && { color: Theme.colors.text }),
		...style,
	};

	if (!children) return null;

	return (
		<Text style={fontStyle} {...rest}>
			{children}
		</Text>
	);
}
