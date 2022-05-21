import React, { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { PlantType } from '../../../data/garden';
import Typography from '../../../lib/components/styled/Typography';
import { getPlaceHolder } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface PlantTypeCardProps {
	plantType: PlantType;
	containerStyle?: ViewStyle;
}

export default function PlantTypeCard({ plantType, containerStyle }: PlantTypeCardProps) {
	const styles = StyleSheet.create({
		container: {
			height: 64,
			width: '100%',
			flexDirection: 'row',
			borderRadius: 32,
			...containerStyle,
		},
		image: {
			height: '100%',
			width: 64,
			borderRadius: 32,
			marginRight: Theme.spacing.md,
		},
		textContainer: {
			height: '100%',
			flexGrow: 1,
			justifyContent: 'center',
		},
	});

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={plantType.image ? { uri: plantType.image } : getPlaceHolder('plant')} />
			<View style={styles.textContainer}>
				<Typography variant='h3bold'>{plantType.scientificName}</Typography>
				<Typography variant='paragraph'>{plantType.scientificName}</Typography>
			</View>
		</View>
	);
}
