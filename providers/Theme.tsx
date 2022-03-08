import React, { PropsWithChildren } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, ViewStyle } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from '@use-expo/font';
import Chevron from '../lib/icons/Chevron';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SplashScreen from '../screens/welcome/Splash';

interface OurColorsProps extends ReactNativePaper.ThemeColors {
	// Custom colors types here
	secondary: string;
	warning: string;
	border: string;
	cta: string;
}

export type LottieSize = 'icon' | 'sm' | 'md' | 'lg';

interface LottieSizeObj {
	icon: number;
	sm: number;
	md: number;
	lg: number;
}

interface OurFontObjProps extends ReactNativePaper.ThemeFont {
	fontSize: number;
	color?: string;
}

export type OurFontName = 'h1' | 'h2' | 'h3bold' | 'h3' | 'body' | 'subHeader' | 'paragraph' | 'placeholder';

interface OurFontsProps {
	// Custom font types here
	h1: OurFontObjProps;
	h2: OurFontObjProps;
	h3: OurFontObjProps;
	h3bold: OurFontObjProps;
	body: OurFontObjProps;
	subHeader: OurFontObjProps;
	paragraph: OurFontObjProps;
	placeholder: OurFontObjProps;
}

const OurFonts: OurFontsProps = {
	h1: {
		fontFamily: 'Filson-Soft-Bold',
		fontWeight: 'normal',
		fontSize: 28,
	},
	h2: {
		fontFamily: 'Filson-Soft-Bold',
		fontWeight: 'normal',
		fontSize: 20,
	},
	h3: {
		fontFamily: 'Filson-Soft-Regular',
		fontWeight: 'normal',
		fontSize: 16,
	},
	h3bold: {
		fontFamily: 'Filson-Soft-Bold',
		fontWeight: 'normal',
		fontSize: 16,
	},
	body: {
		fontFamily: 'Lato-Regular',
		fontWeight: 'normal',
		fontSize: 16,
	},
	subHeader: {
		fontFamily: 'Filson-Soft-Regular',
		fontWeight: 'normal',
		fontSize: 14,
	},
	paragraph: {
		fontFamily: 'Lato-Regular',
		fontWeight: 'normal',
		fontSize: 14,
	},
	placeholder: {
		fontFamily: 'Lato-Regular',
		fontWeight: 'normal',
		fontSize: 14,
		color: '#143F4970',
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
	borderWidth: number;
	borderRadius: number;
	spacing: {
		xs: number;
		sm: number;
		md: number;
		lg: number;
		xl: number;
	};
	appBarHeight: number;
	shadow: {
		shadowColor: string;
		shadowOffset: { width: number; height: number };
		shadowOpacity: number;
		shadowRadius: number;
	};
	lottie: {
		wrapper: ViewStyle;
		width: LottieSizeObj;
		fontSize: LottieSizeObj;
		fontWidth: LottieSizeObj;
	};
	util: {
		flexCenter: {
			display: 'flex';
			justifyContent: 'center';
			alignItems: 'center';
		};
	};
}

export const Theme: OurThemeProps = {
	dark: DefaultTheme.dark, // Whether this is a dark theme or light theme
	mode: DefaultTheme.mode, // Color mode for dark theme
	roundness: 2, // Roundness of common elements, such as buttons
	borderWidth: 2,
	borderRadius: 10, // Common border radius
	spacing: {
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 32,
	},
	appBarHeight: 60,
	shadow: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0.25 },
		shadowOpacity: 0.15,
		shadowRadius: 2.5,
	},
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
			icon: 35,
			sm: 75,
			md: 100,
			lg: 200,
		},
		fontSize: {
			// Font size for the text beneath
			icon: 0,
			sm: 10,
			md: 15,
			lg: 20,
		},
		fontWidth: {
			// Allowed max-width of the text beneath
			icon: 0,
			sm: 100,
			md: 175,
			lg: 300,
		},
	},
	util: {
		flexCenter: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},
	colors: {
		primary: '#8BA889', // Primary color for your app, usually your brand color
		secondary: '#568A9A',
		accent: '#9A532F', // Secondary color for your app which complements the primary color
		background: '#F5F7FB', // Background color for pages, such as lists
		surface: DefaultTheme.colors.surface, // Background color for elements containing content, such as cards
		text: '#022229', // Text color for content
		disabled: '#C2D9D2', // Color for disabled elements
		placeholder: '#143F4970', // Color for placeholder text, such as input placeholder
		backdrop: DefaultTheme.colors.backdrop, // Color for backdrops of various components such as modals
		onSurface: DefaultTheme.colors.onSurface, // Background color for toast notifications
		notification: DefaultTheme.colors.notification, // Background color for badges
		warning: 'E7A600',
		error: '#E92000', // The color of error text, for example the error message for text inputs
		border: 'black', // The color of borders
		cta: '#DB7F50',
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

export const GlobalStackNavOptions: StackNavigationOptions = {
	headerShown: false,
	headerStyle: { backgroundColor: Theme.colors.primary },
	headerTitleStyle: { color: 'white' },
	headerLeft: ({ canGoBack, onPress }) =>
		canGoBack ? (
			<TouchableOpacity onPress={onPress} style={{ padding: Theme.spacing.md }}>
				<Chevron direction='left' fill='white' />
			</TouchableOpacity>
		) : null,
};

export const GlobalModalNavOptions: StackNavigationOptions = {
	presentation: 'modal',
	headerShown: true,
	headerLeft: (props) => (
		<TouchableOpacity onPress={props.onPress}>
			<Chevron direction='left' {...props} />
		</TouchableOpacity>
	),
};

export default function ThemeProvider({ children }: PropsWithChildren<unknown>) {
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

	if (!fontsLoaded) return <SplashScreen />;

	return (
		<PaperProvider theme={Theme}>
			<View style={{ flex: 1, backgroundColor: Theme.colors.accent }}>
				<StatusBar style='dark' />
				{children}
			</View>
		</PaperProvider>
	);
}
