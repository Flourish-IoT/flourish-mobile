import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';
import { getUserId, useLogOut } from './auth';

export const getConfidenceText = (rating: ConfidenceRating) => {
	switch (rating) {
		case 1:
			return 'Low';
		case 2:
			return 'Medium';
		case 3:
			return 'High';
	}
};

export const useChangeUsername = () => {
	const queryClient = useQueryClient();
	const { data: user } = useUser('me');

	return useMutation(
		(newUsername: string) => {
			const query = `/users/${user.id}`;
			mockEndpoint(250)
				.onPut(query, { params: { username: newUsername } })
				.reply<string>(200, 'OK');
			return AxiosInstance.put<string>(query, { params: { username: newUsername } });
		},
		{
			onSuccess: (res, newUsername) => {
				queryClient.setQueryData<User>(['get', 'users', user.id], (oldData) => ({
					...oldData,
					username: newUsername,
				}));
			},
		}
	);
};

export const useChangePassword = () => {
	const { data: user } = useUser('me');

	return useMutation((newPassword: string) => {
		const query = `/users/${user.id}`;
		mockEndpoint(250)
			.onPut(query, { params: { password: newPassword } })
			.reply<string>(200, 'OK');
		return AxiosInstance.put<string>(query, { params: { password: newPassword } });
	});
};

export const useForgotPassword = () => {
	return useMutation((email: string) => {
		const query = `/users/reset_password`;
		mockEndpoint(250).onPost(query, { params: { email } }).reply<string>(200, 'OK');
		return AxiosInstance.post<string>(query, { params: { email } });
	});
};

export const useExportData = () => {
	const { data: user } = useUser('me');

	return useMutation(() => {
		const query = `/users/${user.id}/export`;
		mockEndpoint(250).onGet(query).reply<string>(200, 'OK');
		return AxiosInstance.get<string>(query);
	});
};

export const useDeleteAccount = () => {
	const { data: user } = useUser('me');
	const logOut = useLogOut();

	return useMutation(
		(currentPassword: string) => {
			const query = `/users/${user.id}`;
			mockEndpoint(250)
				.onDelete(query, { params: { password: currentPassword } })
				.reply<string>(200, 'OK');
			return AxiosInstance.delete<string>(query, { params: { password: currentPassword } });
		},
		{
			onSuccess: (res, req) => {
				logOut.mutate();
			},
		}
	);
};

export type UnitPreference = 'Fahrenheit' | 'Celsius';
export type ConfidenceRating = 1 | 2 | 3;

export interface User {
	id: number;
	email: string;
	username: string;
	preferences: UserPreferences;
}

export const tempUser: User = {
	id: 1,
	email: 'user@flourish.com',
	username: 'Gabby',
	preferences: {
		unit_preference: 'Fahrenheit',
		confidence_rating: 2,
	},
};

export interface UserPreferences {
	unit_preference: UnitPreference;
	confidence_rating?: ConfidenceRating;
}

export const useUser = (userId: 'me' | number) => {
	return useQuery(['get', 'users', userId], async () => {
		if (userId === 'me') {
			const potentialUserId = await getUserId();
			!!potentialUserId && (userId = Number(potentialUserId));
		}

		mockEndpoint(250).onGet(`/users/${userId}`).reply<User>(200, tempUser);
		const response = await AxiosInstance.get<User>(`/users/${userId}`);
		return response.data;
	});
};
