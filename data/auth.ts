import * as SecureStore from 'expo-secure-store';
import { createRef, ReactNode, useEffect, useState } from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/core';
import { isPast } from 'date-fns';
import base64 from 'react-native-base64';

export interface JwtHeader {
	typ: string;
	alg: string;
}

interface RawJwtPayload {
	user: string;
	userId: number;
	expiryTime: string;
}

export interface JwtPayload {
	username: string;
	userId: number;
	expiryTime: Date;
}

export const useIsLoggedIn = () => {
	const [data, setData] = useState<boolean | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getIt = async () => {
			const isLoggedIn = !!(await getJwtString());
			setIsLoading(false);
			setData(isLoggedIn);
		};
		getIt();
	}, []);

	return { data, isLoading };
};

export const setJwt = async (token: string) => {
	await SecureStore.setItemAsync('jwt', token);
};

export const getJwtString = async (): Promise<string | undefined> => {
	const token = await SecureStore.getItemAsync('jwt');
	return token ?? undefined;
};

export const getJwtObj = async (): Promise<JwtPayload | undefined> => {
	const token = await getJwtString();

	try {
		const base64array = token.split('.');
		const payload = base64array[1];
		const buffered = base64.decode(payload);
		const rawPayload = JSON.parse(buffered) as RawJwtPayload;

		return {
			username: rawPayload.user,
			userId: rawPayload.userId,
			expiryTime: new Date(rawPayload.expiryTime),
		};
	} catch {
		return undefined;
	}
};

export const isExpired = (jwt: JwtPayload) => isPast(jwt.expiryTime);

export const navigationRef = createRef<NavigationContainerRef<ReactNode>>();

export const logOut = async () => {
	await SecureStore.deleteItemAsync('jwt');

	if (navigationRef.current) {
		navigationRef.current?.dispatch(StackActions.replace('AuthStack'));
	}
};
