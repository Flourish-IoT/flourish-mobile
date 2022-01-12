import React, { useMemo } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

export default function QueryProvider({ children }: React.PropsWithChildren<unknown>) {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 10, // ten minutes
					},
				},
				queryCache: new QueryCache({
					onError: error => {
						console.log(`An error occured while fetching data: ${error}`);
					},
				}),
			}),
		[]
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}