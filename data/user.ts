import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getXpReqForLevel } from '../lib/utils/helper';
import { mockEndpoint, useAxios } from './api';
import { getUserId, setUserId, logOut } from './auth';
import { tempMyMissions } from './rewards';

export const useChangeUsername = () => {
	const axios = useAxios();
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(newUsername: string) => {
			const query = `/users/${user.userId}`;
			return axios.put<string>(query, { username: newUsername });
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
	const axios = useAxios();
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(newEmail: string) => {
			const query = `/users/${user.userId}`;
			mockEndpoint(200).onPut(query, { email: newEmail }).replyOnce<string>(200, 'OK');
			return axios.put<string>(query, { email: newEmail });
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
	const axios = useAxios();
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(newImageUri: string | undefined) => {
			const query = `/users/${user.userId}`;
			mockEndpoint(200)
				.onPut(query, { image: newImageUri ?? '' })
				.replyOnce<string>(200, 'OK');
			return axios.put<string>(query, { image: newImageUri ?? '' });
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
	const axios = useAxios();
	const { data: user } = useMe();

	return useMutation(({ password, new_password }: ChangePasswordParams) => {
		const query = `/users/${user.userId}/password`;
		mockEndpoint(200).onPut(query, { password, new_password }).replyOnce<string>(200, 'OK');
		return axios.put<string>(query, { password, new_password });
	});
};

interface SendResetPasswordEmailParams {
	email: string;
}

export const useSendResetPasswordEmail = () => {
	const axios = useAxios();

	return useMutation(({ email }: SendResetPasswordEmailParams) => {
		const query = `/users/reset_password`;
		return axios.post<string>(query, { email });
	});
};

interface CheckPasswordVerificationCodeParams {
	email: string;
	code: string[];
}

export const useVerifyResetPasswordEmail = () => {
	const axios = useAxios();

	return useMutation(
		({ email, code }: CheckPasswordVerificationCodeParams) => {
			const query = `/users/verify?code_type=password_reset`;
			const formattedCode = code.join('');
			mockEndpoint(200).onPost(query, { email, code: formattedCode }).replyOnce<number>(200, tempMyUser.userId);
			return axios.post<number>(query, { email, code: formattedCode });
		},
		{
			onSuccess: async ({ data: userId }) => {
				await setUserId(userId);
			},
		}
	);
};

interface ResetPasswordParams {
	code: string;
	new_password: string;
}

export const useResetPassword = () => {
	const axios = useAxios();
	const { data: user } = useMe();

	return useMutation(({ code, new_password }: ResetPasswordParams) => {
		const query = `/users/${user.userId}/password`;
		mockEndpoint(200).onPut(query, { code, new_password }).replyOnce<string>(200, 'OK');
		return axios.put<string>(query, { code, new_password });
	});
};

export const useExportData = () => {
	const axios = useAxios();
	const { data: user } = useMe();

	return useMutation(() => {
		const query = `/users/${user.userId}/export`;
		mockEndpoint(200).onGet(query).replyOnce<string>(200, 'OK');
		return axios.get<string>(query);
	});
};

export const useDeleteAccount = () => {
	const axios = useAxios();
	const { data: user } = useMe();

	return useMutation(
		(currentPassword: string) => {
			const query = `/users/${user.userId}`;
			mockEndpoint(200)
				.onDelete(query, { params: { password: currentPassword } })
				.replyOnce<string>(200, 'OK');
			return axios.delete<string>(query, { params: { password: currentPassword } });
		},
		{
			onSuccess: () => {
				logOut();
			},
		}
	);
};

export type UnitPreference = 'Fahrenheit' | 'Celsius';
export type ConfidenceRating = 1 | 2 | 3;

export interface User {
	userId: number;
	email: string;
	username: string;
	preferences: UserPreferences | null;
	image: string | null;
	xp: number;
}

export interface UserPreferences {
	unit_preference: UnitPreference;
}

export const tempMyUser: User = {
	userId: 70,
	email: 'janedoe123@gmail.com',
	username: 'Jane Doe',
	image: null,
	xp: getXpReqForLevel(1) + tempMyMissions[0].points,
	preferences: {
		unit_preference: 'Fahrenheit',
	},
};

export const useMe = () => {
	const axios = useAxios();

	return useQuery(['me'], async () => {
		const query = `/users/${tempMyUser.userId}`;
		mockEndpoint(200).onGet(query).replyOnce<User>(200, tempMyUser);
		return (await axios.get<User>(query)).data;
	});
};

export interface PushNotificationParams {
	token: string;
}

export const useSendPushNotificationsToken = () => {
	const axios = useAxios();
	const { data: user } = useMe();

	return useMutation(({ token }: PushNotificationParams) => {
		const query = `/users/${user.userId}/pushNotificationToken`;
		return axios.post<string>(query, { token });
	});
};

interface SendEmailVerificationCodeParams {
	email: string;
	username: string;
	password: string;
}

export const useSendVerifyEmail = () => {
	const axios = useAxios();

	return useMutation(({ email, username, password }: SendEmailVerificationCodeParams) => {
		const query = '/users';
		mockEndpoint(200).onPost(query, { email, username, password }).replyOnce<number>(200, tempMyUser.userId);
		return axios.post<string>(query, { email, username, password });
	});
};

interface CheckEmailVerificationCodeParams {
	email: string;
	code: string[];
}

export const useVerifyEmail = () => {
	const axios = useAxios();

	return useMutation(
		({ email, code }: CheckEmailVerificationCodeParams) => {
			const query = `/users/verify?code_type=verification`;
			const formattedCode = code.join('');
			mockEndpoint(200).onPost(query, { email, code: formattedCode }).replyOnce<number>(200, tempMyUser.userId);
			return axios.post<number>(query, { email, code: formattedCode });
		},
		{
			onSuccess: async ({ data: userId }) => {
				await setUserId(userId);
			},
		}
	);
};

interface EmailLoginParams {
	email: string;
	password: string;
}

export const useLoginWithEmail = () => {
	const axios = useAxios();

	return useMutation(
		({ email, password }: EmailLoginParams) => {
			const query = `/users/login`;
			mockEndpoint(200).onPost(query, { email, password }).replyOnce<number>(200, tempMyUser.userId);
			return axios.post<number>(query, { email, password });
		},
		{
			onSuccess: async ({ data: userId }) => {
				await setUserId(userId);
			},
		}
	);
};
