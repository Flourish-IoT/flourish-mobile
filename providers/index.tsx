import React, { PropsWithChildren } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import PreloadProvider from './Preload';
import QueryProvider from './QueryClient';
import ThemeProvider from './Theme';

export default function AppProviders({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryProvider>
			<PreloadProvider>
				<ThemeProvider>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</PreloadProvider>
		</QueryProvider>
	);
}
