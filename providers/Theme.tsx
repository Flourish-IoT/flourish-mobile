import { StackNavigationOptions } from '@react-navigation/stack';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

interface OurColorsProps extends ReactNativePaper.ThemeColors {
	// Custom colors types here
	border: string;
}

export type LottieSize = 'sm' | 'md' | 'lg';

interface LottieSizeObj {
	sm: number;
	md: number;
	lg: number;
}

interface OurThemeProps extends ReactNativePaper.Theme {
	// Custom theme property types here
	colors: OurColorsProps;
	lottie: {
		wrapper: ViewStyle;
		width: LottieSizeObj;
		fontSize: LottieSizeObj;
		fontWidth: LottieSizeObj;
	};
}

export const Theme: OurThemeProps = {
	dark: DefaultTheme.dark, // Whether this is a dark theme or light theme
	mode: DefaultTheme.mode, // Color mode for dark theme
	roundness: 2, // Roundness of common elements, such as buttons
	animation: {
		scale: DefaultTheme.animation.scale, // Scale for all animations
	},
	lottie: {
		wrapper: {
			height: '100%',
			width: '100%',
			alignSelf: 'center',
			justifyContent: 'center',
			alignItems: 'center',
		},
		width: {
			sm: 75,
			md: 100,
			lg: 200,
		},
		fontSize: {
			sm: 10,
			md: 15,
			lg: 20,
		},
		fontWidth: {
			sm: 100,
			md: 175,
			lg: 300,
		},
	},
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
		error: DefaultTheme.colors.error, // The color of error text, for example the error message for text inputs
		border: 'black', // The color of borders
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

export const GlobalNavigatorOptions: StackNavigationOptions = {
	headerStyle: { backgroundColor: Theme.colors.primary },
	headerTitleStyle: { color: 'white' },
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	return <PaperProvider theme={Theme}>{children}</PaperProvider>;
}
