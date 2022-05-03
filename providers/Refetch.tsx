import React, { PropsWithChildren, useEffect } from 'react';
import { usePlants } from '../data/garden';

export default function RefetchProvider({ children }: PropsWithChildren<unknown>) {
	const { refetch: plants } = usePlants('me');

	useEffect(() => {
		setInterval(() => {
			// plants();
		}, 1000 * 5);
	}, []);

	return <>{children}</>;
}
