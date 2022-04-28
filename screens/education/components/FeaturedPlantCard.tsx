import React from 'react';
import { View, Image, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { PlantType } from '../../../data/garden';
import Typography from '../../../lib/components/styled/Typography';
import { getPlaceHolder } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface FeaturedPlantProps {
	plant: PlantType;
	containerStyle?: ViewStyle;
	onPress: () => void;
}

export default function FeaturedPlantCard({ plant, onPress, containerStyle }: FeaturedPlantProps) {
	return (
		<TouchableOpacity style={{ ...styles.container, ...(containerStyle as object) }} onPress={onPress}>
			<Image style={styles.image} source={plant.image ? { uri: plant.image } : getPlaceHolder('plant')} />
			<View style={styles.titleContainer}>
				<Typography variant='paragraph' style={styles.titleText}>
					{plant.scientificName}
				</Typography>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 125,
		height: 175,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: Theme.borderRadius,
	},
	titleContainer: {
		...Theme.util.flexCenter,
		position: 'absolute',
		bottom: 10,
		right: -Theme.spacing.md / 2,
		borderRadius: Theme.borderRadius / 2,
		backgroundColor: Theme.colors.primary,
		paddingVertical: Theme.spacing.xs,
		paddingHorizontal: Theme.spacing.sm,
		maxHeight: 50,
	},
	titleText: {
		color: 'white',
	},
});
