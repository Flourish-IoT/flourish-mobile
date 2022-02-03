import React from 'react';
import { Image } from 'react-native';
import { Theme } from '../../providers/Theme';

export default function SplashScreen() {
	return (
		<Image
			style={{ backgroundColor: Theme.colors.accent, width: '100%', height: '100%' }}
			source={require('../../lib/assets/splash.png')}
		/>
	);
}
