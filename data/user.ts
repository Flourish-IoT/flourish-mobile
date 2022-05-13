import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getJwtObj, logOut, setJwt } from './auth';
import { useAxios, mockEndpoint, mockAxios } from '../providers/Axios';
import { useEffect, useState } from 'react';
interface SendEmailVerificationCodeParams {
	email: string;
	username: string;
	password: string;
}

export const useSendVerifyEmail = () => {
	const axios = useAxios();
	return useMutation(({ email, username, password }: SendEmailVerificationCodeParams) => {
		return axios.post<string>('/users', { email, username, password });
	});
};

interface CheckEmailVerificationCodeParams {
	email: string;
	code: number[];
}

export const useVerifyEmail = () => {
	const axios = useAxios();
	return useMutation(
		({ email, code }: CheckEmailVerificationCodeParams) => {
			const query = `/users/verify`;
			const formattedCode = Number(code.join(''));
			return axios.post<string>(query, { email, code: formattedCode });
		},
		{
			onSuccess: async ({ data: jwt }) => {
				await setJwt(jwt);
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
			return axios.post<string>(query, { email, password });
		},
		{
			onSuccess: async ({ data: jwt }) => {
				await setJwt(jwt);
			},
		}
	);
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
	reset_code: number[];
}

export const useVerifyResetPasswordEmail = () => {
	const axios = useAxios();
	return useMutation(
		({ email, reset_code }: CheckPasswordVerificationCodeParams) => {
			const query = `/users/verify`;
			const formattedCode = reset_code.join('');
			return axios.post<string>(query, { email, reset_code: formattedCode });
		},
		{
			onSuccess: async ({ data: jwt }) => {
				await setJwt(jwt);
			},
		}
	);
};

export const useChangeUsername = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(newUsername: string) => {
			const query = `/users/${user.id}`;
			mockEndpoint(200).onPut(query, { username: newUsername }).replyOnce<string>(200, 'OK');
			return mockAxios.put<string>(query, { username: newUsername });
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
			mockEndpoint(200).onPut(query, { email: newEmail }).replyOnce<string>(200, 'OK');
			return mockAxios.put<string>(query, { email: newEmail });
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
				.onPut(query, { image: newImageUri ?? '' })
				.replyOnce<string>(200, 'OK');
			return mockAxios.put<string>(query, { image: newImageUri ?? '' });
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
		mockEndpoint(200).onPut(query, { password, new_password }).replyOnce<string>(200, 'OK');
		return mockAxios.put<string>(query, { password, new_password });
	});
};

interface ResetPasswordParams {
	reset_code: string;
	new_password: string;
}

export const useResetPassword = () => {
	const { data: user } = useMe();

	return useMutation(({ reset_code, new_password }: ResetPasswordParams) => {
		const query = `/users/${user.id}/password`;
		mockEndpoint(200).onPut(query, { reset_code, new_password }).replyOnce<string>(200, 'OK');
		return mockAxios.put<string>(query, { reset_code, new_password });
	});
};

export const useExportData = () => {
	const { data: user } = useMe();

	return useMutation(() => {
		const query = `/users/${user.id}/export`;
		mockEndpoint(200).onGet(query).replyOnce<string>(200, 'OK');
		return mockAxios.get<string>(query);
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
			return mockAxios.delete<string>(query, { params: { password: currentPassword } });
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
	id: number;
	email: string;
	username: string;
	preferences: {
		unit_preference: UnitPreference;
	} | null;
	image: string | null;
	xp: number;
}

export const useUserId = () => {
	const [data, setData] = useState<number | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getIt = async () => {
			const jwt = await getJwtObj();
			setIsLoading(false);
			setData(jwt?.userId);
		};
		getIt();
	}, []);

	return { data, isLoading };
};
export const useMe = () => {
	const axios = useAxios();
	const { data: userId } = useUserId();

	return useQuery(
		['me'],
		async () => {
			const me = (await axios.get<User>(`/users/${userId}`)).data;
			return {
				...me,
				preferences: {
					...me.preferences,
					unit_preference: me.preferences?.unit_preference ?? 'Fahrenheit',
				},
			};
		},
		{
			enabled: !!userId,
		}
	);
};

export interface PushNotificationParams {
	token: string;
}

export const useSendPushNotificationsToken = () => {
	const { data: user } = useMe();
	const axios = useAxios();

	return useMutation(async ({ token }: PushNotificationParams) => {
		const query = `/users/${user.id}/pushNotificationToken`;
		return axios.post<string>(query, { token });
	});
};
