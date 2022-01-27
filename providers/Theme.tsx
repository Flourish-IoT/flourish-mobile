import { StackNavigationOptions } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ViewStyle } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from '@use-expo/font';
import Loading from '../lib/components/Loading';

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

interface OurFontsProps {
	// Custom font types here
	heading1: ReactNativePaper.ThemeFont;
	heading2: ReactNativePaper.ThemeFont;
	heading3Bold: ReactNativePaper.ThemeFont;
	headingRegular: ReactNativePaper.ThemeFont;
	body: ReactNativePaper.ThemeFont;
	subHeader: ReactNativePaper.ThemeFont;
	paragraph: ReactNativePaper.ThemeFont;
	placeholder: ReactNativePaper.ThemeFont;
}

const OurFonts: OurFontsProps = {
	heading1: {
		fontFamily: 'Filson-Soft-Bold',
		fontWeight: 'normal',
	},
	heading2: {
		fontFamily: 'Filson-Soft-Bold',
		fontWeight: 'normal',
	},
	heading3Bold: {
		fontFamily: 'Filson-Soft-Bold',
		fontWeight: 'normal',
	},
	headingRegular: {
		fontFamily: 'Filson-Soft-Regular',
		fontWeight: 'normal',
	},
	body: {
		fontFamily: 'Lato-Bold',
		fontWeight: 'normal',
	},
	subHeader: {
		fontFamily: 'Filson-Soft-Regular',
		fontWeight: 'normal',
	},
	paragraph: {
		fontFamily: 'Lato-Regular',
		fontWeight: 'normal',
	},
	placeholder: {
		fontFamily: 'Lato-Regular',
		fontWeight: 'normal',
	},
};

const ReactNativePaperFonts: ReactNativePaper.ThemeFonts = {
	regular: OurFonts.paragraph,
	medium: OurFonts.body,
	light: {
		fontFamily: 'Lato-Light',
		fontWeight: 'normal',
	},
	thin: {
		fontFamily: 'Lato-Thin',
		fontWeight: 'normal',
	},
};

interface CombinedFonts extends OurFontsProps, ReactNativePaper.ThemeFonts {}

interface OurThemeProps extends ReactNativePaper.Theme {
	// Custom theme property types here
	colors: OurColorsProps;
	fonts: CombinedFonts;
	borderRadius: number;
	padding: number;
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
	borderRadius: 10, // Common border radius
	padding: 10, // Common container padding
	animation: {
		scale: DefaultTheme.animation.scale, // Scale for all animations
	},
	lottie: {
		wrapper: {
			// The container around all the lottie animation elements (lottie itself, text beneath)
			height: '100%',
			width: '100%',
			alignSelf: 'center',
			justifyContent: 'center',
			alignItems: 'center',
		},
		width: {
			// Width of the lottie itself
			sm: 75,
			md: 100,
			lg: 200,
		},
		fontSize: {
			// Font size for the text beneath
			sm: 10,
			md: 15,
			lg: 20,
		},
		fontWidth: {
			// Allowed max-width of the text beneath
			sm: 100,
			md: 175,
			lg: 300,
		},
	},
	colors: {
		primary: '#10B295', // Primary color for your app, usually your brand color
		accent: '#6A2B0B', // Secondary color for your app which complements the primary color
		background: 'white', // Background color for pages, such as lists
		surface: DefaultTheme.colors.surface, // Background color for elements containing content, such as cards
		text: DefaultTheme.colors.text, // Text color for content
		disabled: DefaultTheme.colors.disabled, // Color for disabled elements
		placeholder: DefaultTheme.colors.placeholder, // Color for placeholder text, such as input placeholder
		backdrop: DefaultTheme.colors.backdrop, // Color for backdrops of various components such as modals
		onSurface: DefaultTheme.colors.onSurface, // Background color for toast notifications
		notification: DefaultTheme.colors.notification, // Background color for badges
		error: DefaultTheme.colors.error, // The color of error text, for example the error message for text inputs
		border: 'black', // The color of borders
	},
	fonts: {
		...OurFonts,
		...ReactNativePaperFonts,
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
	const [fontsLoaded] = useFonts({
		'Filson-Soft-Bold': require('../lib/assets/fonts/Filson/Soft-Bold.ttf'),
		'Filson-Soft-Regular': require('../lib/assets/fonts/Filson/Soft-Regular.ttf'),
		'Lato-Black-Italic': require('../lib/assets/fonts/Lato/Black-Italic.ttf'),
		'Lato-Black': require('../lib/assets/fonts/Lato/Black.ttf'),
		'Lato-Bold-Italic': require('../lib/assets/fonts/Lato/Bold-Italic.ttf'),
		'Lato-Bold': require('../lib/assets/fonts/Lato/Bold.ttf'),
		'Lato-Italic': require('../lib/assets/fonts/Lato/Italic.ttf'),
		'Lato-Light-Italic': require('../lib/assets/fonts/Lato/Light-Italic.ttf'),
		'Lato-Light': require('../lib/assets/fonts/Lato/Light.ttf'),
		'Lato-Regular': require('../lib/assets/fonts/Lato/Regular.ttf'),
		'Lato-Thin-Italic': require('../lib/assets/fonts/Lato/Thin-Italic.ttf'),
		'Lato-Thin': require('../lib/assets/fonts/Lato/Thin.ttf'),
	});

	if (!fontsLoaded) return null; // TODO: Replace with splash screen

	return (
		<PaperProvider theme={Theme}>
			<StatusBar style='dark' />
			{children}
		</PaperProvider>
	);
}
