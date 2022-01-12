import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export const Theme: ReactNativePaper.Theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#5ABB98',
		accent: '#f1c40f',
	},
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	// @tss-ignore Ignoring because the theme obj is not typed, this isn't really possible to make a type of
	return <PaperProvider theme={Theme}>{children}</PaperProvider>;
}
