import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';
import { getUserId, setUserId, useLogOut } from './auth';

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
				.replyOnce<string>(200, 'OK');
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

interface ChangePasswordParams {
	password: string;
	new_password: string;
}

export const useChangePassword = () => {
	const { data: user } = useUser('me');

	return useMutation(({ password, new_password }: ChangePasswordParams) => {
		const query = `/users/${user.id}/password`;
		mockEndpoint(250).onPut(query, { params: { password, new_password } }).replyOnce<string>(200, 'OK');
		return AxiosInstance.put<string>(query, { params: { password, new_password } });
	});
};

interface SendResetPasswordEmailParams {
	email: string;
}

export const useSendResetPasswordEmail = () => {
	return useMutation(({ email }: SendResetPasswordEmailParams) => {
		const query = `/users/reset_password`;
		mockEndpoint(250).onPost(query, { params: { email } }).replyOnce<string>(200, 'OK');
		return AxiosInstance.post<string>(query, { params: { email } });
	});
};

interface CheckPasswordVerificationCodeParams {
	email: string;
	reset_code: string;
}

export const useVerifyResetPasswordEmail = () => {
	return useMutation(
		({ email, reset_code }: CheckPasswordVerificationCodeParams) => {
			const query = `/users/verify?code=password_reset`;
			mockEndpoint(0).onPost(query, { params: { email, reset_code } }).replyOnce<number>(200, tempMyUser.id);
			return AxiosInstance.post<number>(query, { params: { email, reset_code } });
		},
		{
			onSuccess: async ({ data: userId }, { email, reset_code }) => {
				await setUserId(userId);
			},
		}
	);
};

interface ResetPasswordParams {
	reset_code: string;
	new_password: string;
}

export const useResetPassword = () => {
	const { data: user } = useUser('me');

	return useMutation(({ reset_code, new_password }: ResetPasswordParams) => {
		const query = `/users/${user.id}/password`;
		mockEndpoint(250).onPut(query, { params: { reset_code, new_password } }).replyOnce<string>(200, 'OK');
		return AxiosInstance.put<string>(query, { params: { reset_code, new_password } });
	});
};

export const useExportData = () => {
	const { data: user } = useUser('me');

	return useMutation(() => {
		const query = `/users/${user.id}/export`;
		mockEndpoint(250).onGet(query).replyOnce<string>(200, 'OK');
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
				.replyOnce<string>(200, 'OK');
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

export const tempMyUser: User = {
	id: 1,
	email: 'user@flourish.com',
	username: 'Gabby',
	preferences: {
		unit_preference: 'Fahrenheit',
		confidence_rating: 2,
	},
};

export const tempOtherUser: User = {
	id: 2,
	email: 'user2@flourish.com',
	username: 'Dolma',
	preferences: {
		unit_preference: 'Fahrenheit',
		confidence_rating: 3,
	},
};

export interface UserPreferences {
	unit_preference: UnitPreference;
	confidence_rating?: ConfidenceRating;
}

export const useUser = (userId: 'me' | number) => {
	return useQuery(['get', 'users', userId], async () => {
		const useMyId = userId === 'me';

		if (useMyId) {
			const potentialUserId = await getUserId();
			!!potentialUserId && (userId = Number(potentialUserId));
		}

		mockEndpoint(250)
			.onGet(`/users/${userId}`)
			.replyOnce<User>(200, useMyId ? tempMyUser : tempOtherUser);
		const response = await AxiosInstance.get<User>(`/users/${userId}`);
		return response.data;
	});
};

export const useShowHumidity = () => {
	const { data: user } = useUser('me');

	return useQuery(
		['showHumidity'],
		async () => {
			return user.preferences.confidence_rating === 3;
		},
		{
			enabled: !!user,
		}
	);
};
