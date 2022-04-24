import * as Sentry from 'sentry-expo';
import * as Updates from 'expo-updates';
import { PropsWithChildren } from 'react';
import { Alert } from 'react-native';

const dsn = process.env.SENTRY_DSN;

export const isSentryActive = () => {
	const client = Sentry.Native.getCurrentHub().getClient();
	return !!client;
};

export const initializeSentry = () => {
	if (dsn !== null) {
		Sentry.init({
			dsn: dsn,
			enableInExpoDevelopment: false,
			debug: true,
			ignoreErrors: ['Network request failed'],
			enableAutoSessionTracking: true,
			release: Updates.releaseChannel || 'development',
		});
	} else {
		Sentry.Native.captureMessage('No Sentry key provided; skipping initialization');
		console.log('No Sentry key provided; skipping initialization');
	}
};

// We don't send the following errors to Sentry
const UNTRACKED_ERRORS = [
	// Location not allowed
	'Permission to access location was denied',
	'Location provider is unavailable. Make sure that location services are enabled',
	'Location request timed out',
	'Location request failed due to unsatisfied device settings',
	// Notifications not allowed
	'Permission to access notifications was denied',
];

/**
 * Sends an error to Sentry
 *
 * To use in a try/catch:
 *   try { ... }
 *   catch(error) {
 *     sentryError('category')(error)
 *   };
 *
 * To use in a promise catch
 *   promise()
 *     .then(...)
 *     .catch(sentryError('category'))
 */
export const sentryError = (namespace: string, alert = true) => {
	return function (error: Error) {
		if (isSentryActive() && !UNTRACKED_ERRORS.some((msg) => error.message.includes(msg))) {
			Sentry.Native.captureException(error);
		}

		if (__DEV__) {
			console.log(`[${namespace}]: ${error.message}`);
		}

		if (alert) {
			Alert.alert('Error', error.message);
		}
	};
};

!__DEV__ && initializeSentry();

export default function SentryProvider({ children }: PropsWithChildren<unknown>) {
	return <Sentry.Native.ErrorBoundary>{children}</Sentry.Native.ErrorBoundary>;
}
