import React, { ReactNode } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import QueryProvider from './QueryClient';
import ThemeProvider from './Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface AppProvidersProps {
	children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
	return (
		<QueryProvider>
			<ThemeProvider>
				<ToastProvider>
					{/* <SafeAreaProvider> */}
						{children}
					{/* </SafeAreaProvider> */}
				</ToastProvider>
			</ThemeProvider>
		</QueryProvider>
	);
}
