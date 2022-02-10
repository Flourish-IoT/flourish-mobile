import React, { PropsWithChildren } from 'react';
import { useTasks } from '../data/calendar';
import { usePlants } from '../data/garden';
import { useMe } from '../data/user';
import SplashScreen from '../screens/welcome/Splash';

export default function PreloadProvider({ children }: PropsWithChildren<unknown>) {
	const { isLoading: userIsLoading } = useMe();
	const { isLoading: plantsIsLoading } = usePlants('me');
	const { isLoading: tasksIsLoading } = useTasks('me');

	if (userIsLoading || plantsIsLoading || tasksIsLoading) return <SplashScreen />;

	return <>{children}</>;
}
