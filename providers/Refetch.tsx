import React, { PropsWithChildren, useEffect } from 'react';
import { usePlants } from '../data/garden';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

const intervalInSeconds = 5;

export default function RefetchProvider({ children }: PropsWithChildren<unknown>) {
	const { refetch: plants } = usePlants('me');

	useEffect(() => {
		const refetchEnabled = Updates.releaseChannel === 'refetch' || (__DEV__ && process.env.REFETCH === 'TRUE');

		if (refetchEnabled) {
			Alert.alert('Frequent Refetch Enabled', `This will occur every ${intervalInSeconds}s.`);

			setInterval(() => {
				plants();
			}, 1000 * intervalInSeconds);
		}
	}, []);

	return <>{children}</>;
}
