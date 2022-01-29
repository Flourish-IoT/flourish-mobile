import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const ApiUrl = 'https://f8rxwugjzj.execute-api.us-east-1.amazonaws.com/default';

export const AxiosInstance = axios.create({
	baseURL: ApiUrl,
	timeout: 1000 * 60 * 0.5, // 30s
	headers: { 'Content-Type': 'foobar' },
});

export const mockEndpoint = (delay?: number) => {
	return new MockAdapter(AxiosInstance, { delayResponse: delay ?? 0 });
};
