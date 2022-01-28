import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';
import { tempUser, User, useUser } from './user';

export const getUserId = async () => {
	return await SecureStore.getItemAsync('userId');
};

export const setUserId = async (value: number | null) => {
	return !!value ? await SecureStore.setItemAsync('userId', String(value)) : await SecureStore.deleteItemAsync('userId');
};

export const useIsLoggedIn = () => {
	return useQuery(['loggedIn'], async () => {
		return !!(await getUserId());
	});
};

export const useLogOut = () => {
	const { data: user } = useUser('me');
	const queryClient = useQueryClient();

	return useMutation(async () => {
		await queryClient.setQueryData<User>(['get', 'users', user.id], () => null);
		await queryClient.setQueryData(['loggedIn'], () => false);
		await setUserId(null);
	});
};

interface SendEmailVerificationCodeParams {
	email: string;
	username: string;
	password: string;
}

export const useSendEmailVerificationCode = () => {
	return useMutation(({ email, username, password }: SendEmailVerificationCodeParams) => {
		const query = '/users';
		mockEndpoint(0).onPost(query, { params: { email, username, password } }).reply<string>(200, 'OK');
		return AxiosInstance.post<string>(query, { params: { email, username, password } });
	});
};

interface CheckEmailVerificationCodeParams {
	email: string;
	code: string;
}

export const useCheckEmailVerificationCode = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ email, code }: CheckEmailVerificationCodeParams) => {
			const query = `/verify`;
			mockEndpoint(0).onPost(query, { params: { email, code } }).reply<User>(200, tempUser);
			return AxiosInstance.post<User>(query, { params: { email, code } });
		},
		{
			onSuccess: ({ data: user }, newUsername) => {
				queryClient.setQueryData<User>(['get', 'users', user.id], () => user);
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
			const query = `/users${user.id}`;
			mockEndpoint(0).onPut(query, { params: { preferences } }).reply<string>(200, 'OK');
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
	const queryClient = useQueryClient();

	return useMutation(
		({ email, password }: EmailLoginParams) => {
			const query = `/users/login`;
			mockEndpoint(0).onPost(query, { params: { email, password } }).reply<User>(200, tempUser);
			return AxiosInstance.post<User>(query, { params: { email, password } });
		},
		{
			onSuccess: ({ data: user }, { email, password }) => {
				queryClient.setQueryData<User>(['get', 'users', user.id], () => user);
			},
		}
	);
};
