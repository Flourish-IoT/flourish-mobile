import { useMutation, useQuery, useQueryClient } from 'react-query';
import { mockEndpoint, AxiosInstance } from './api';
import { useMe, User } from './user';

export interface Achievement {
	id: number;
	title: string;
	description: string;
	level: number;
	points: number;
	image?: string;
	progress: number; // 0-100 (represents a %)
	claimed: boolean;
}

const tempMyAchievements: Achievement[] = [
	{
		id: 1,
		title: 'The Journey Begins',
		image: undefined,
		description: 'Add your first plant to a collection!',
		level: 1,
		points: 100,
		progress: 100,
		claimed: true,
	},
	{
		id: 2,
		title: 'Monstera Monster',
		image: undefined,
		description: 'Keep your Monstera alive for at least 30 days',
		level: 1,
		points: 1000,
		progress: 100,
		claimed: false,
	},
	{
		id: 3,
		title: 'Fern-It-Up',
		image: undefined,
		description: 'Add 5 indoor plants to your home collection.',
		level: 1,
		points: 250,
		progress: 100,
		claimed: false,
	},
	{
		id: 4,
		title: 'Fern-It-Up-2',
		image: undefined,
		description: 'Add 5 indoor plants to your home collection.',
		level: 1,
		points: 250,
		progress: 100,
		claimed: false,
	},
	{
		id: 5,
		title: 'Fern-It-Up-3',
		image: undefined,
		description: 'Add 5 indoor plants to your home collection.',
		level: 1,
		points: 250,
		progress: 100,
		claimed: false,
	},
];

export const useAchievements = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['achievements', userId],
		async () => {
			const query = `/achievements/${userId}`;
			mockEndpoint(250).onGet(query).replyOnce<Achievement[]>(200, tempMyAchievements);
			const { data: achievements } = await AxiosInstance.get<Achievement[]>(query);
			return achievements.filter((a) => !a.claimed);
		},
		{
			enabled: !!user,
		}
	);
};

export const useClaimAchievement = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(achievement: Achievement) => {
			const query = `/achievements/${user.id}/claim/${achievement.id}`;
			mockEndpoint(250).onPost(query).replyOnce<string>(200, 'OK');
			return AxiosInstance.post<string>(query);
		},
		{
			onSuccess: (res, achievement) => {
				// Remove achievement from available achievements
				queryClient.setQueryData<Achievement[]>(['achievements', user.id], (oldData) => {
					const claimedAchievement = oldData.find((a) => a.id === achievement.id);

					const index = oldData.indexOf(claimedAchievement);
					oldData.splice(index, 1); // Remove the claimed achievement

					return [...oldData];
				});

				// Add achievement to claimed badges
				queryClient.setQueryData<Achievement[]>(['badges', user.id], (oldData) => [
					...oldData,
					{ ...achievement, claimed: true },
				]);

				// Add xp to user
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					xp: oldData.xp + achievement.points,
				}));
			},
		}
	);
};

export const useBadges = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['badges', userId],
		async () => {
			const query = `/achievements/${userId}`;
			mockEndpoint(250).onGet(query).replyOnce<Achievement[]>(200, tempMyAchievements);
			const { data: achievements } = await AxiosInstance.get<Achievement[]>(query);
			return achievements.filter((a) => a.claimed);
		},
		{
			enabled: !!user,
		}
	);
};

export const useUnClaimAchievement = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(achievement: Achievement) => {
			const query = `/achievements/${user.id}/unclaim/${achievement.id}`;
			mockEndpoint(250).onPost(query).replyOnce<string>(200, 'OK');
			return AxiosInstance.post<string>(query);
		},
		{
			onSuccess: (res, achievement) => {
				// Remove achievement from claimed badges
				queryClient.setQueryData<Achievement[]>(['badges', user.id], (oldData) => {
					const claimedAchievement = oldData.find((a) => a.id === achievement.id);

					const index = oldData.indexOf(claimedAchievement);
					oldData.splice(index, 1);

					return [...oldData];
				});

				// Add achievement to available achievements
				queryClient.setQueryData<Achievement[]>(['achievements', user.id], (oldData) => [
					...oldData,
					{ ...achievement, claimed: false },
				]);

				// Remove xp from user
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					xp: oldData.xp - achievement.points,
				}));
			},
		}
	);
};
