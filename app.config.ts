export default {
	name: 'Flourish',
	slug: 'Flourish',
	owner: 'hmh84',
	version: '1.8.1',
	orientation: 'portrait',
	icon: './lib/assets/icon.png',
	platforms: ['ios', 'android'],
	assetBundlePatterns: ['**/*'],
	updates: {
		fallbackToCacheTimeout: 0,
	},
	splash: {
		image: './lib/assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#F5F7FB',
	},
	plugins: ['sentry-expo'],
	ios: {
		supportsTablet: false,
		bundleIdentifier: 'com.dev.flourish',
		infoPlist: {
			NSPhotoLibraryUsageDescription: true,
			ITSAppUsesNonExemptEncryption: false,
			NSAppTransportSecurity: {
				NSAllowsArbitraryLoads: true,
			},
		},
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './lib/assets/adaptive-icon.png',
			backgroundColor: '#F5F7FB',
		},
	},
	hooks: {
		postPublish: [
			{
				file: 'sentry-expo/upload-sourcemaps',
				config: {
					organization: process.env.SENTRY_PROJECT_NAME,
					project: process.env.SENTRY_ORG_NAME,
					authToken: process.env.SENTRY_AUTH,
				},
			},
		],
	},
};
