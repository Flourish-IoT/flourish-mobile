export default {
	name: 'Flourish',
	slug: 'Flourish',
	owner: 'hmh84',
	version: '1.9.2',
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
	plugins: [
		'sentry-expo',
		[
			'expo-image-picker',
			{
				photosPermission:
					'The app accesses your photos to let you set your profile picture and add pictures of your plants.',
				cameraPermission:
					'The app accesses your camera to let you set your profile picture and add pictures of your plants.',
			},
		],
	],
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
					organization: 'flourish-mobile',
					project: 'flourish-mobile',
					authToken: '26afe15d9db34a3fbe764c68f124407e54c6633090984ff499402751d67e67fd',
				},
			},
		],
	},
};
