import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { ViewMode } from '..';
import { Plant } from '../../../data/garden';
import { Theme } from '../../../providers/Theme';

interface PlantProps {
	viewMode: ViewMode;
	plant: Plant;
	image?: any;
}

export default function PlantPot({ viewMode, plant, image }: PlantProps) {
	const styles = StyleSheet.create({
		container: {
			width: viewMode === 'Carousel' ? '100%' : '50%',
			padding: viewMode === 'Carousel' ? 0 : Theme.padding,
		},
		image: {
			width: '100%',
			height: undefined,
			aspectRatio: 1 / 1,
		},
		text: {
			backgroundColor: 'gray',
			width: '100%',
			color: 'white',
			textAlign: 'center',
		},
	});

	return (
		<View style={styles.container}>
			<Image source={image ? { url: image } : require('../../../lib/assets/placeholder/plant.png')} style={styles.image} />
			{viewMode === 'Grid' && <Text style={styles.text}>{plant.name}</Text>}
		</View>
	);
}
