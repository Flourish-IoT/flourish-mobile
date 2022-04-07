import React, { PropsWithChildren, useLayoutEffect } from 'react';
import { useAllPlantData } from '../data/garden';

export default function RefetchProvider({ children }: PropsWithChildren<unknown>) {
	const { refetch: plantData } = useAllPlantData();

	useLayoutEffect(() => {
		setInterval(() => {
			[plantData].forEach((refetch) => refetch());
		}, 1000 * 60 * 0.5);
	}, []);

	return <>{children}</>;
}
