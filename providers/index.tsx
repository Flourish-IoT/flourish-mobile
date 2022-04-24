import React, { PropsWithChildren } from 'react';
import SentryProvider from './Sentry';
import QueryProvider from './QueryClient';
import PreloadProvider from './Preload';
import RefetchProvider from './Refetch';
import ThemeProvider from './Theme';
import { ToastProvider } from 'react-native-toast-notifications';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Require cycle:']);

export default function AppProviders({ children }: PropsWithChildren<unknown>) {
	return (
		<SentryProvider>
			<QueryProvider>
				<PreloadProvider>
					<RefetchProvider>
						<ThemeProvider>
							<ToastProvider>{children}</ToastProvider>
						</ThemeProvider>
					</RefetchProvider>
				</PreloadProvider>
			</QueryProvider>
		</SentryProvider>
	);
}
