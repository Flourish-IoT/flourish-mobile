import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

interface OurColorsProps extends ReactNativePaper.ThemeColors {
	// Custom colors types here
	border: string;
}

interface OurThemeProps extends ReactNativePaper.Theme {
	// Custom theme property types here
	colors: OurColorsProps;
}

export const Theme: OurThemeProps = {
	dark: DefaultTheme.dark, // Whether this is a dark theme or light theme
	mode: DefaultTheme.mode, // Color mode for dark theme
	roundness: 2, // Roundness of common elements, such as buttons
	colors: {
		primary: '#5ABB98', // Primary color for your app, usually your brand color
		accent: '#f1c40f', // Secondary color for your app which complements the primary color
		background: 'white', // Background color for pages, such as lists
		surface: DefaultTheme.colors.surface, // Background color for elements containing content, such as cards
		text: DefaultTheme.colors.text, // Text color for content
		disabled: DefaultTheme.colors.disabled, // Color for disabled elements
		placeholder: DefaultTheme.colors.placeholder, // Color for placeholder text, such as input placeholder
		backdrop: DefaultTheme.colors.backdrop, // Color for backdrops of various components such as modals
		onSurface: DefaultTheme.colors.onSurface, // Background color for snackbars
		notification: DefaultTheme.colors.notification, // Background color for badges
		error: DefaultTheme.colors.error,
		border: 'black',
	},
	fonts: {
		regular: {
			fontFamily: DefaultTheme.fonts.regular.fontFamily,
			fontWeight: DefaultTheme.fonts.regular.fontWeight,
		},
		medium: {
			fontFamily: DefaultTheme.fonts.medium.fontFamily,
			fontWeight: DefaultTheme.fonts.regular.fontWeight,
		},
		light: {
			fontFamily: DefaultTheme.fonts.light.fontFamily,
			fontWeight: DefaultTheme.fonts.regular.fontWeight,
		},
		thin: {
			fontFamily: DefaultTheme.fonts.thin.fontFamily,
			fontWeight: DefaultTheme.fonts.regular.fontWeight,
		},
	},
	animation: {
		scale: DefaultTheme.animation.scale, // Scale for all animations
	},
};

export const NavigatorTheme = {
	dark: Theme.dark,
	colors: {
		primary: Theme.colors.primary, // The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
		background: Theme.colors.background, // The color of various backgrounds, such as background color for the screens.
		notification: Theme.colors.notification, // The color of Tab Navigator badge.
		text: Theme.colors.text, // The text color of various elements.
		card: Theme.colors.surface, // The background color of card-like elements, such as headers, tab bars etc.
		border: Theme.colors.border, // The color of borders, e.g. header border, tab bar border etc.
	},
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	return <PaperProvider theme={Theme}>{children}</PaperProvider>;
}
