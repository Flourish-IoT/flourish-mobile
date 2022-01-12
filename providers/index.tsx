import React, { ReactNode } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import QueryProvider from './QueryClient';
import ThemeProvider from './Theme';

interface AppProvidersProps {
	children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
	return (
		<QueryProvider>
			<ThemeProvider>
				<ToastProvider>{children}</ToastProvider>
			</ThemeProvider>
		</QueryProvider>
	);
}
