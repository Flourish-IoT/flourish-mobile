import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import Typography from '../../../lib/components/styled/Typography';
import { getPlaceHolder } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface PlantProps {
	containerStyle?: ViewStyle;
}

export default function PreSearchGraphic({ containerStyle }: PlantProps) {
	const styles = StyleSheet.create({
		container: {
			width: '100%',
			...Theme.util.flexCenter,
			...containerStyle,
		},
		image: {
			width: 163,
			height: 176,
			marginBottom: Theme.spacing.lg,
		},
		text: {
			color: Theme.colors.primary,
		},
	});

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={getPlaceHolder('preSearchState')} />
			<Typography variant='h3bold' style={styles.text}>
				Let’s find your plant!
			</Typography>
		</View>
	);
}
