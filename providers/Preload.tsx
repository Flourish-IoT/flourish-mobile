import React, { PropsWithChildren } from 'react';
import { useTasks } from '../data/calendar';
import { usePlants } from '../data/garden';
import { useAchievements } from '../data/rewards';
import { useMe } from '../data/user';
import SplashScreen from '../screens/welcome/Splash';

export default function PreloadProvider({ children }: PropsWithChildren<unknown>) {
	const { isLoading: userIsLoading } = useMe();
	const { isLoading: plantsIsLoading } = usePlants('me');
	const { isLoading: tasksIsLoading } = useTasks('me');
	const { isLoading: achievementsIsLoading } = useAchievements('me');

	if (userIsLoading || plantsIsLoading || tasksIsLoading || achievementsIsLoading) return <SplashScreen />;

	return <>{children}</>;
}
