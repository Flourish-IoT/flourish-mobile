import React, { PropsWithChildren, useMemo } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

export default function QueryProvider({ children }: PropsWithChildren<unknown>) {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 10, // ten minutes
					},
				},
				queryCache: new QueryCache({
					onError: (error) => {
						alert(`An error occurred while fetching data: ${error}`);
					},
				}),
			}),
		[]
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
