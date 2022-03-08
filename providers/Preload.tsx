import React, { PropsWithChildren } from 'react';
import { useMe } from '../data/user';
import { useQuickTutorials, useLearningCourses, useFeaturedPlants } from '../data/education';
import { usePlants } from '../data/garden';
import { useTasks } from '../data/calendar';
import { useAchievements } from '../data/rewards';
import SplashScreen from '../screens/welcome/Splash';

export default function PreloadProvider({ children }: PropsWithChildren<unknown>) {
	const { isLoading: userIsLoading } = useMe();
	const { isLoading: quickTutorialsIsLoading } = useQuickTutorials();
	const { isLoading: learningCoursesIsLoading } = useLearningCourses();
	const { isLoading: featuredPlantsIsLoading } = useFeaturedPlants();
	const { isLoading: plantsIsLoading } = usePlants('me');
	const { isLoading: tasksIsLoading } = useTasks('me');
	const { isLoading: achievementsIsLoading } = useAchievements('me');

	return userIsLoading ||
		plantsIsLoading ||
		tasksIsLoading ||
		achievementsIsLoading ||
		quickTutorialsIsLoading ||
		learningCoursesIsLoading ||
		featuredPlantsIsLoading ? (
		<SplashScreen />
	) : (
		<>{children}</>
	);
}
