import React, { PropsWithChildren, useEffect } from 'react';
import { usePlants } from '../data/garden';

export default function RefetchProvider({ children }: PropsWithChildren<unknown>) {
	const { refetch: plants } = usePlants('me');

	useEffect(() => {
		if (__DEV__) return;
		setInterval(() => {
			plants();
		}, 1000 * 5);
	}, []);

	return <>{children}</>;
}
