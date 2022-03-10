import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getXpReqForLevel } from '../lib/utils/helper';
import { AxiosInstance, mockEndpoint } from './api';
import { getUserId, setUserId, logOut } from './auth';
import { tempMyMissions } from './rewards';

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
	const { data: user } = useMe();

	return useMutation(
		(newUsername: string) => {
			const query = `/users/${user.id}`;
			mockEndpoint(200)
				.onPut(query, { params: { username: newUsername } })
				.replyOnce<string>(200, 'OK');
			return AxiosInstance.put<string>(query, { params: { username: newUsername } });
		},
		{
			onSuccess: (res, newUsername) => {
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					username: newUsername,
				}));
			},
		}
	);
};

export const useChangeEmail = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(newEmail: string) => {
			const query = `/users/${user.id}`;
			mockEndpoint(200)
				.onPut(query, { params: { email: newEmail } })
				.replyOnce<string>(200, 'OK');
			return AxiosInstance.put<string>(query, { params: { email: newEmail } });
		},
		{
			onSuccess: (res, newEmail) => {
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					email: newEmail,
				}));
			},
		}
	);
};

export const useChangeProfilePicture = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(newImageUri: string | undefined) => {
			const query = `/users/${user.id}`;
			mockEndpoint(200)
				.onPut(query, { params: { image: newImageUri ?? '' } })
				.replyOnce<string>(200, 'OK');
			return AxiosInstance.put<string>(query, { params: { image: newImageUri ?? '' } });
		},
		{
			onSuccess: (res, newImageUri) => {
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					image: newImageUri,
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
	const { data: user } = useMe();

	return useMutation(({ password, new_password }: ChangePasswordParams) => {
		const query = `/users/${user.id}/password`;
		mockEndpoint(200).onPut(query, { params: { password, new_password } }).replyOnce<string>(200, 'OK');
		return AxiosInstance.put<string>(query, { params: { password, new_password } });
	});
};

interface SendResetPasswordEmailParams {
	email: string;
}

export const useSendResetPasswordEmail = () => {
	return useMutation(({ email }: SendResetPasswordEmailParams) => {
		const query = `/users/reset_password`;
		mockEndpoint(200).onPost(query, { params: { email } }).replyOnce<string>(200, 'OK');
		return AxiosInstance.post<string>(query, { params: { email } });
	});
};

interface CheckPasswordVerificationCodeParams {
	email: string;
	reset_code: number[];
}

export const useVerifyResetPasswordEmail = () => {
	return useMutation(
		({ email, reset_code }: CheckPasswordVerificationCodeParams) => {
			const query = `/users/verify?code=password_reset`;
			const formattedCode = reset_code.join('');

			mockEndpoint(0)
				.onPost(query, { params: { email, reset_code: formattedCode } })
				.replyOnce<number>(200, tempMyUser.id);
			return AxiosInstance.post<number>(query, { params: { email, reset_code: formattedCode } });
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
	const { data: user } = useMe();

	return useMutation(({ reset_code, new_password }: ResetPasswordParams) => {
		const query = `/users/${user.id}/password`;
		mockEndpoint(200).onPut(query, { params: { reset_code, new_password } }).replyOnce<string>(200, 'OK');
		return AxiosInstance.put<string>(query, { params: { reset_code, new_password } });
	});
};

export const useExportData = () => {
	const { data: user } = useMe();

	return useMutation(() => {
		const query = `/users/${user.id}/export`;
		mockEndpoint(200).onGet(query).replyOnce<string>(200, 'OK');
		return AxiosInstance.get<string>(query);
	});
};

export const useDeleteAccount = () => {
	const { data: user } = useMe();

	return useMutation(
		(currentPassword: string) => {
			const query = `/users/${user.id}`;
			mockEndpoint(200)
				.onDelete(query, { params: { password: currentPassword } })
				.replyOnce<string>(200, 'OK');
			return AxiosInstance.delete<string>(query, { params: { password: currentPassword } });
		},
		{
			onSuccess: (res, req) => {
				logOut();
			},
		}
	);
};

export type UnitPreference = 'Fahrenheit' | 'Celsius';
export type ConfidenceRating = 1 | 2 | 3;

export interface User {
	// NOTE: Update the type omits for type FinishAccountParams if you add/remove any fields from User
	id: number;
	email: string;
	username: string;
	preferences: UserPreferences;
	image: string | undefined;
	xp: number;
}

export interface UserPreferences {
	unit_preference: UnitPreference;
	confidence_rating?: ConfidenceRating;
}

export const tempMyUser: User = {
	id: 1,
	email: 'janedoe123@gmail.com',
	username: 'Jane Doe',
	image: undefined,
	xp: getXpReqForLevel(1) + tempMyMissions[0].points,
	preferences: {
		unit_preference: 'Fahrenheit',
		confidence_rating: 2,
	},
};

export const tempOtherUser: User = {
	id: 2,
	email: 'johnsmith321@gmail.com',
	username: 'John Smith',
	image: undefined,
	xp: 200,
	preferences: {
		unit_preference: 'Fahrenheit',
		confidence_rating: 3,
	},
};

export const useMe = () => {
	return useQuery(['me'], async () => {
		const userId = await getUserId();

		mockEndpoint(200).onGet(`/users/${userId}`).replyOnce<User>(200, tempMyUser);
		const response = await AxiosInstance.get<User>(`/users/${userId}`);
		return response.data;
	});
};

export const useUser = (userId: number) => {
	return useQuery(['get', 'users', userId], async () => {
		mockEndpoint(200).onGet(`/users/${userId}`).replyOnce<User>(200, tempOtherUser);
		const response = await AxiosInstance.get<User>(`/users/${userId}`);
		return response.data;
	});
};

export const useShowHumidity = () => {
	const { data: user } = useMe();

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
