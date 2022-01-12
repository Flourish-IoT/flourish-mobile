import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { AxiosInstance, mockEndpoint } from './api';
import { ConfidenceRating } from './user';

interface SignUpParams {
	confidenceRating: ConfidenceRating;
}

export const getAccessToken = async () => {
	return await SecureStore.getItemAsync('accessToken');
};

export const setAccessToken = async (value: string) => {
	return await SecureStore.setItemAsync('accessToken', value);
};

export const getLoggedIn = async () => {
	return (await AsyncStorage.getItem('loggedIn')) === 'TRUE';
};

export const setLoggedIn = async (value: boolean) => {
	return await AsyncStorage.setItem('loggedIn', String(value).toUpperCase());
};

export const sendEmailVerificationCode = (email: string, password: string) => {
	mockEndpoint(0).onPost('/send_email_verification_code', { params: { email, password } }).reply(200, true);
	return AxiosInstance.post('/send_email_verification_code', { params: { email, password } });
};

export const checkEmailVerificationCode = (email: string, code: string) => {
	mockEndpoint(100).onPost('/users/${user_id}/verify', { params: { code } }).reply(200, true);
	return AxiosInstance.post('/users/${user_id}/verify', { params: { code } });
};

export const finishAccountSetup = (signUpParams: SignUpParams) => {
	mockEndpoint(100).onPost('/finish_account_setup', { params: { signUpParams } }).reply(200, true);
	return AxiosInstance.post('/finish_account_setup', { params: { signUpParams } });
};

export const attemptEmailLogin = (email: string, password: string) => {
	mockEndpoint(100).onPost('/users/login', { params: { email, password } }).reply(200, '123abc');
	return AxiosInstance.post<string>('/users/login', { params: { email, password } });
};
