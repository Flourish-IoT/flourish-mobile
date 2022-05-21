import * as SecureStore from 'expo-secure-store';
import { createRef, ReactNode, useEffect, useState } from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/core';

export const getUserId = async () => {
	const userId = await SecureStore.getItemAsync('userId');
	return userId ? Number(userId) : undefined;
};

export const setUserId = async (value: number | null) => {
	return !!value ? await SecureStore.setItemAsync('userId', String(value)) : await SecureStore.deleteItemAsync('userId');
};

export const isLoggedIn = async () => {
	return !!(await getUserId());
};

export const useIsLoggedIn = () => {
	const [data, setData] = useState<boolean | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getIt = async () => {
			const result = await isLoggedIn();
			setIsLoading(false);
			setData(result);
		};
		getIt();
	}, []);

	return { data, isLoading };
};

export const navigationRef = createRef<NavigationContainerRef<ReactNode>>();

export const logOut = async () => {
	await setUserId(null);
	await SecureStore.deleteItemAsync('accessToken');
	await SecureStore.deleteItemAsync('refreshToken');

	if (navigationRef.current) {
		navigationRef.current?.dispatch(StackActions.replace('AuthStack'));
	}
};
