import axios, { AxiosInstance, AxiosRequestHeaders, AxiosError } from 'axios';
import { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { getJwtString } from '../data/auth';
import { logOut } from '../data/auth';
import useJSONDateParser from '../lib/utils/jsonDateParser';
import SplashScreen from '../screens/welcome/Splash';
import MockAdapter from 'axios-mock-adapter';

export const ApiUrl = 'http://3.83.190.154:5000/v1';

const AxiosContext = createContext<AxiosInstance>(axios);

export const mockAxios = axios.create();
export const mockEndpoint = (delay?: number) => {
	return new MockAdapter(mockAxios, { delayResponse: __DEV__ ? delay ?? 0 : 0 });
};

export default function AxiosProvider({ children }: React.PropsWithChildren<unknown>) {
	useJSONDateParser();
	const [jwtStatus, setJwtStatus] = useState<'loading' | 'available' | 'unset'>('loading'); // -1 = Checked but is unset, undefined = loading
	const [jwtToken, setJwtToken] = useState<string>();

	useEffect(() => {
		const getIt = async () => {
			const token = await getJwtString();

			if (!!token) {
				setJwtStatus('available');
				setJwtToken(token);
			} else {
				setJwtStatus('unset');
				setJwtToken(null);
			}
		};
		getIt();
	}, []);

	const axiosMemo = useMemo(() => {
		const headers: AxiosRequestHeaders = { 'Content-Type': 'application/json' };
		if (jwtStatus === 'available') headers.Authorization = `Bearer ${jwtToken}`;
		const axiosInstance = axios.create({ headers, baseURL: ApiUrl });

		axiosInstance.interceptors.response.use(
			(response) => response,
			(error: AxiosError) => {
				const statusCode = error.response.status;
				if (statusCode !== 404) {
					console.error('API ERROR:', error.request.responseURL, statusCode, error.response);
					return Promise.reject(error);
				}

				logOut();
			}
		);

		return axiosInstance;
	}, []);

	return jwtStatus === 'loading' ? (
		<SplashScreen />
	) : (
		<AxiosContext.Provider value={axiosMemo}>{children}</AxiosContext.Provider>
	);
}

export const useAxios = () => useContext(AxiosContext);
