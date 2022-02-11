import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ViewMode } from '..';
import { Plant } from '../../../data/garden';
import Typography from '../../../lib/components/styled/Typography';
import { Theme } from '../../../providers/Theme';
import PotBaseSvg from './PotBaseSvg';

interface PlantProps {
	viewMode: ViewMode;
	plant: Plant;
	onPress: () => void;
	containerStyle?: ViewStyle;
}

export default function PlantPot({ viewMode, plant, onPress, containerStyle }: PlantProps) {
	const styles = StyleSheet.create({
		touchContainer: {
			width: viewMode === 'Carousel' ? '100%' : '50%',
			...containerStyle,
		},
		container: {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
		},
		image: {
			width: 150,
			height: undefined,
			aspectRatio: 1 / 1,
			borderTopLeftRadius: Theme.borderRadius,
			borderTopRightRadius: Theme.borderRadius,
		},
		potBaseGraphic: {},
		potBaseText: {
			position: 'absolute',
			bottom: 0,
			width: 150,
			height: 70,
		},
		text: {
			width: '100%',
			color: 'white',
			textAlign: 'center',
		},
	});

	return (
		<TouchableOpacity style={styles.touchContainer} onPress={onPress}>
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={!!plant.image ? { uri: plant.image } : require('../../../lib/assets/placeholder/plant.png')}
				/>
				<PotBaseSvg width='100%' style={styles.potBaseGraphic} />
				<View style={styles.potBaseText}>
					<Typography variant='heading3Bold' style={styles.text}>
						{plant.name}
					</Typography>
					<Typography variant='body' style={styles.text}>
						{plant.commonName}
					</Typography>
				</View>
			</View>
		</TouchableOpacity>
	);
}
