import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const ApiUrl = 'http://3.83.190.154:5000/v1';
const ourAxiosInstance = axios.create({
	headers: { 'Content-Type': 'application/json' },
	baseURL: ApiUrl,
});

ourAxiosInstance.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const statusCode = error.response.status;

		if (statusCode !== 404) {
			console.error('API ERROR:', error.request.responseURL, statusCode, error.response);
			return Promise.reject(error);
		}
	}
);

export const useAxios = () => ourAxiosInstance;
export const mockEndpoint = (delay?: number) => {
	return new MockAdapter(ourAxiosInstance, {
		delayResponse: __DEV__ && delay ? delay : 0,
	});
};
