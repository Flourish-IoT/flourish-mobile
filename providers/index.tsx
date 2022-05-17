import React, { PropsWithChildren } from 'react';
import SentryProvider from './Sentry';
import AxiosProvider from './Axios';
import QueryProvider from './QueryClient';
import PreloadProvider from './Preload';
import RefetchProvider from './Refetch';
import ThemeProvider from './Theme';
import { ToastProvider } from 'react-native-toast-notifications';
import { LogBox } from 'react-native';
import { useIsLoggedIn } from '../data/auth';
import SplashScreen from '../screens/welcome/Splash';

LogBox.ignoreLogs(['Require cycle:']);

interface FetchProviders extends PropsWithChildren<unknown> {
	isLoggedIn: boolean;
}

const FetchProviders = ({ isLoggedIn, children }: FetchProviders) => {
	return isLoggedIn ? (
		<PreloadProvider>
			<RefetchProvider>{children}</RefetchProvider>
		</PreloadProvider>
	) : (
		<>{children}</>
	);
};

export default function AppProviders({ children }: PropsWithChildren<unknown>) {
	const { isLoading: isLoggedInIsLoading, data: isLoggedIn } = useIsLoggedIn();

	if (isLoggedInIsLoading) return <SplashScreen />;

	return (
		<SentryProvider>
			<AxiosProvider>
				<QueryProvider>
					<FetchProviders isLoggedIn={isLoggedIn}>
						<ThemeProvider>
							<ToastProvider>{children}</ToastProvider>
						</ThemeProvider>
					</FetchProviders>
				</QueryProvider>
			</AxiosProvider>
		</SentryProvider>
	);
}
