import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from '../theme';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
	loaderContainer: {
		alignSelf: 'center',
		height: '100%',
		justifyContent: 'center',
	},
	animation: {
		height: 300,
	},
	emptyText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: Theme.colors.primary,
		alignSelf: 'center',
	},
});

export default function Loading({ style, text = 'Loading' }) {
	return (
		<View style={[styles.loaderContainer, style]}>
			<LottieView
				style={styles.animation}
				resizeMode='cover'
				source={require('../../assets/lottie/growing.json')}
				autoPlay
				loop
			/>
			{!!text && <Text style={styles.emptyText}>{String(text)}</Text>}
		</View>
	);
}
