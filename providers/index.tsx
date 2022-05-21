import React, { PropsWithChildren } from 'react';
import SentryProvider from './Sentry';
import QueryProvider from './QueryClient';
import PreloadProvider from './Preload';
import RefetchProvider from './Refetch';
import ThemeProvider from './Theme';
import PermissionsProvider from './Permissions';
import { LogBox } from 'react-native';
import SplashScreen from '../screens/welcome/Splash';
import { useIsLoggedIn } from '../data/auth';

LogBox.ignoreLogs(['Require cycle:']);

const LoggedInProviders = ({ children }: PropsWithChildren<unknown>) => {
	const { isLoading: isLoggedInIsLoading, data: isLoggedIn } = useIsLoggedIn();

	if (isLoggedInIsLoading || isLoggedIn === undefined) return <SplashScreen />;

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
			<QueryProvider>
				<LoggedInProviders>
					<ThemeProvider>{children}</ThemeProvider>
				</LoggedInProviders>
			</QueryProvider>
		</SentryProvider>
	);
}
