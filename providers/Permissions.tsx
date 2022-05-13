import { useEffect, PropsWithChildren } from 'react';
import { Alert, Linking } from 'react-native';
import { useSendPushNotificationsToken } from '../data/user';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function PermissionsProvider({ children }: PropsWithChildren<unknown>) {
	const sendPushNotificationsToken = useSendPushNotificationsToken();

	const registerForPushNotificationsAsync = async () => {
		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;

			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				Alert.alert(
					'No Notification Permission Granted',
					'Please go to settings and grant notification permissions manually',
					[
						{ text: 'Cancel', onPress: () => console.log('Notification Permissions not granted by user') },
						{ text: 'Allow', onPress: () => Linking.openURL('app-settings:') },
					],
					{ cancelable: false }
				);
				return;
			}

			const token = (await Notifications.getExpoPushTokenAsync()).data;

			try {
				await sendPushNotificationsToken.mutateAsync({ token });
			} catch (error) {
				console.log(error);
			}
		} else {
			alert('Must use physical device for Push Notifications');
		}
	};

	useEffect(() => {
		registerForPushNotificationsAsync();
	}, []);

	return <>{children}</>;
}
