import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createAuthResponseInterceptor from 'axios-auth-refresh';
import * as SecureStore from 'expo-secure-store';

export const ApiUrl = 'https://f8rxwugjzj.execute-api.us-east-1.amazonaws.com/default';

// TODO: Don't use this once auth is implemented
export const AxiosInstance = axios.create({
	baseURL: ApiUrl,
	timeout: 1000 * 60 * 0.5, // 30s
});

export const mockEndpoint = (delay?: number) => {
	return new MockAdapter(AxiosInstance, { delayResponse: delay ?? 0 });
};

export interface Token {
	tokenType: string;
	accessToken: string;
	refreshToken: string;
	accessTokenExpiry: number;
	refreshTokenExpiry: number;
}

export interface AccessToken {
	tokenType: string;
	accessToken: string;
	expiresIn: number;
}

export type RefreshToken = string;

export const getAccessToken = async () => {
	const token = await SecureStore.getItemAsync('accessToken');
	return token ? (JSON.parse(token) as AccessToken) : undefined;
};

export const setAccessToken = async (tokenType: string, accessToken: string, expiresIn: number) => {
	await SecureStore.setItemAsync('accessToken', JSON.stringify({ tokenType, accessToken, expiresIn }));
};

export const getRefreshToken = async () => {
	return SecureStore.getItemAsync('refreshToken');
};

export const setRefreshToken = async (refreshToken: string) => {
	await SecureStore.setItemAsync('refreshToken', refreshToken);
};

export const isExpired = async () => {
	const token = await getAccessToken();
	const tokenExpiry = !!token ? token.expiresIn : 0;
	const now = new Date().getTime();
	return tokenExpiry < now;
};

export const tempToken = {
	tokenType: 'tokenType',
	accessToken: 'access-abc.xyz',
	refreshToken: 'refresh-abc.xyz',
	// accessTokenExpiry: new Date().getTime() + 1000 * 60 * 3, // 3 min from now
	// refreshTokenExpiry: new Date().getTime() + 1000 * 60 * 5, // 5 min from now
	accessTokenExpiry: new Date().getTime() + 1000 * 60 * 0.5, // 30 sec from now
	refreshTokenExpiry: new Date().getTime() + 1000 * 60 * 1, // 1 min from now
};

export const refresh = async () => {
	const accessToken = await getAccessToken();
	const refreshToken = await getRefreshToken();

	const query = '/token';
	mockEndpoint(250)
		.onPost(query, {
			grantType: 'refresh_token',
			accessToken: accessToken.accessToken,
			refreshToken: refreshToken,
		})
		.replyOnce<Token>(200, tempToken);
	return axios
		.post<Token>(query, {
			grantType: 'refresh_token',
			accessToken: accessToken.accessToken,
			refreshToken: refreshToken,
		})
		.then(async (response) => {
			const { refreshToken, tokenType, accessToken, accessTokenExpiry } = response.data;

			await setAccessToken(tokenType, accessToken, accessTokenExpiry);
			await setRefreshToken(refreshToken);

			return Promise.resolve();
		})
		.catch(async (error) => {
			// TODO: Need to figure out how to set logged in to false in query-context not in a hook
			// await useLogOut();
			return Promise.reject(error.message);
		});
};

export const initAxios = () => {
	axios.defaults.baseURL = ApiUrl;

	// handle refresh token logic, if we return a 401 error then this code
	// will automatically get a new auth + refresh token
	createAuthResponseInterceptor(axios, refresh);

	// intercept errors and return error data
	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response) {
				// Request made and server responded
				throw new Error(error.response.data);
			} else if (error.request) {
				// The request was made but no response was received
				throw new Error(error.request);
			}

			// Something happened in setting up the request that triggered an Error
			throw new Error(error.message);
		}
	);

	// add the access token to any requests if we have one
	axios.interceptors.request.use(async (request) => {
		const accessToken = await getAccessToken();

		const token = accessToken.accessToken;
		if (token) {
			request.headers.Authorization = `Bearer ${token}`;
		}
		return request;
	});
};
