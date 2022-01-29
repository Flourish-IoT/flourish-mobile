import * as SecureStore from 'expo-secure-store';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	AxiosInstance,
	getAccessToken,
	getRefreshToken,
	isExpired,
	mockEndpoint,
	setAccessToken,
	setRefreshToken,
	tempToken,
	Token,
} from './api';
import { tempMyUser, User, useUser } from './user';

export const getUserId = async () => {
	return await SecureStore.getItemAsync('userId');
};

export const setUserId = async (value: number | null) => {
	return !!value ? await SecureStore.setItemAsync('userId', String(value)) : await SecureStore.deleteItemAsync('userId');
};

export const useIsLoggedIn = () => {
	return useQuery(['loggedIn'], async () => {
		return !!(await getAccessToken()) && !!(await getRefreshToken());
	});
};

export const useLogOut = () => {
	const { data: user } = useUser('me');
	const queryClient = useQueryClient();

	return useMutation(async () => {
		await queryClient.setQueryData<User>(['get', 'users', user.id], () => null);
		await queryClient.setQueryData(['loggedIn'], () => false);
		await setUserId(null);
		await SecureStore.deleteItemAsync('accessToken');
		await SecureStore.deleteItemAsync('refreshToken');
	});
};

interface SendEmailVerificationCodeParams {
	email: string;
	username: string;
	password: string;
}

export const useSendVerifyEmail = () => {
	return useMutation(({ email, username, password }: SendEmailVerificationCodeParams) => {
		const query = '/users';
		mockEndpoint(0).onPost(query, { params: { email, username, password } }).replyOnce<string>(200, 'OK');
		return AxiosInstance.post<string>(query, { params: { email, username, password } });
	});
};

interface CheckEmailVerificationCodeParams {
	email: string;
	code: string;
}

interface AuthResponse {
	jwt: Token;
	userId: number;
}

export const useVerifyEmail = () => {
	return useMutation(
		({ email, code }: CheckEmailVerificationCodeParams) => {
			const query = `/users/verify?code=verification`;
			mockEndpoint(0).onPost(query, { params: { email, code } }).replyOnce<AuthResponse>(200, {
				jwt: tempToken,
				userId: tempMyUser.id,
			});
			return AxiosInstance.post<AuthResponse>(query, { params: { email, code } });
		},
		{
			onSuccess: async ({ data }, { email, code }) => {
				await setUserId(data.userId);
				await setAccessToken(data.jwt.tokenType, data.jwt.accessToken, data.jwt.accessTokenExpiry);
				await setRefreshToken(data.jwt.refreshToken);
			},
		}
	);
};

type FinishAccountParams = Omit<User, 'id' | 'email' | 'username'>;

export const useFinishAccountSetup = () => {
	const { data: user } = useUser('me');
	const queryClient = useQueryClient();

	return useMutation(
		({ preferences }: FinishAccountParams | undefined) => {
			const query = `/users/${user.id}`;
			mockEndpoint(0).onPut(query, { params: { preferences } }).replyOnce<string>(200, 'OK');
			return AxiosInstance.put<string>(query, { params: { preferences } });
		},
		{
			onSuccess: (res, { preferences }) => {
				queryClient.setQueryData<User>(['get', 'users', user.id], (oldData) => ({ ...oldData, preferences }));
			},
		}
	);
};

interface EmailLoginParams {
	email: string;
	password: string;
}

export const useLoginWithEmail = () => {
	return useMutation(
		({ email, password }: EmailLoginParams) => {
			const query = `/users/login`;
			mockEndpoint(0).onPost(query, { params: { email, password } }).reply<AuthResponse>(200, {
				jwt: tempToken,
				userId: tempMyUser.id,
			});
			return AxiosInstance.post<AuthResponse>(query, { params: { email, password } });
		},
		{
			onSuccess: async ({ data }, { email, password }) => {
				await setUserId(data.userId);
				await setAccessToken(data.jwt.tokenType, data.jwt.accessToken, data.jwt.accessTokenExpiry);
				await setRefreshToken(data.jwt.refreshToken);
			},
		}
	);
};
