import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const getLoggedIn = async () => {
	return (await AsyncStorage.getItem('loggedIn')) === 'TRUE';
};

export const setLoggedIn = async (value: boolean) => {
	return await AsyncStorage.setItem('loggedIn', String(value).toUpperCase());
};

export const getAccessToken = async () => {
	return await AsyncStorage.getItem('accessToken');
};

export const setAccessToken = async (value: string) => {
	return await AsyncStorage.setItem('accessToken', value);
};

export const getRefreshToken = async () => {
	return await SecureStore.getItemAsync('refreshToken');
};

export const setRefreshToken = async (value: string) => {
	await SecureStore.setItemAsync('refreshToken', value);
};

export const isValidEmail = (value: string) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(value.toLowerCase());
};

export const isValidPassword = (value: string) => {
	const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
	return regex.test(value);
};
