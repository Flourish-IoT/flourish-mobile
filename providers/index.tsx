import React, { ReactNode } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import QueryProvider from './QueryClient';

interface AppProvidersProps {
	children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
	return (
		<QueryProvider>
			<ToastProvider>{children}</ToastProvider>
		</QueryProvider>
	);
}
