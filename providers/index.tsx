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
import PermissionsProvider from './Permissions';

LogBox.ignoreLogs(['Require cycle:']);

const LoggedInProviders = ({ children }: PropsWithChildren<unknown>) => {
	const { isLoading: isLoggedInIsLoading, data: isLoggedIn } = useIsLoggedIn();

	if (isLoggedInIsLoading) return <SplashScreen />;

	return isLoggedIn ? (
		<PreloadProvider>
			<RefetchProvider>
				<PermissionsProvider>{children}</PermissionsProvider>
			</RefetchProvider>
		</PreloadProvider>
	) : (
		<>{children}</>
	);
};

export default function AppProviders({ children }: PropsWithChildren<unknown>) {
	return (
		<SentryProvider>
			<AxiosProvider>
				<QueryProvider>
					<LoggedInProviders>
						<ThemeProvider>
							<ToastProvider>{children}</ToastProvider>
						</ThemeProvider>
					</LoggedInProviders>
				</QueryProvider>
			</AxiosProvider>
		</SentryProvider>
	);
}
