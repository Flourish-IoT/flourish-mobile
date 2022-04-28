import React, { PropsWithChildren, useMemo } from 'react';
import { Alert } from 'react-native';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

export default function QueryProvider({ children }: PropsWithChildren<unknown>) {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 5000, // ten minutes
					},
				},
				queryCache: new QueryCache({
					onError: (error, { queryKey }) => {
						console.warn('An error occurred in query with key: ' + queryKey);
						Alert.alert('Whoops... Network Error', String(error));
					},
				}),
			}),
		[]
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
