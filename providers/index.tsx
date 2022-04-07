import React, { PropsWithChildren } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import PreloadProvider from './Preload';
import QueryProvider from './QueryClient';
import ThemeProvider from './Theme';
import RefetchProvider from './Refetch';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Require cycle']);

export default function AppProviders({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryProvider>
			<PreloadProvider>
				<RefetchProvider>
					<ThemeProvider>
						<ToastProvider>{children}</ToastProvider>
					</ThemeProvider>
				</RefetchProvider>
			</PreloadProvider>
		</QueryProvider>
	);
}
