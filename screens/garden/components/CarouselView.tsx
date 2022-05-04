import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Plant, plantMetrics } from '../../../data/garden';
import Typography from '../../../lib/components/styled/Typography';
import { Theme } from '../../../providers/Theme';
import MetricVisual from './MetricVisual';
import PlantPot from './PlantPot';

interface CarouselViewProps {
	navigation: NavigationProp<ParamListBase>;
	plants: Plant[];
	onPress: (plant: Plant) => void;
	containerStyle?: ViewStyle;
}

interface CarouselRendererProps {
	item: Plant;
	index: number;
}

export default function CarouselView({ navigation, plants, onPress, containerStyle }: CarouselViewProps) {
	let firstItemIndex = 0;
	const [selectedPlant, setSelectedPlant] = useState(plants[firstItemIndex]);

	return (
		<View style={{ ...styles.container, ...containerStyle }}>
			<View style={styles.carouselContainer}>
				<Carousel
					data={plants}
					onSnapToItem={(index) => setSelectedPlant(plants[index])}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width - Theme.spacing.md * 16}
					firstItem={firstItemIndex}
					renderItem={({ item: plant }: CarouselRendererProps) => (
						<PlantPot viewMode={'Carousel'} image={plant.image} onPress={() => onPress(plant)} />
					)}
				/>
			</View>

			<View style={styles.nameContainer}>
				<Typography variant='h1'>{selectedPlant.name}</Typography>
				<Typography variant='subHeader'>{selectedPlant.plantType.scientificName}</Typography>
			</View>

			<View style={styles.metricBlocksContainer}>
				{plantMetrics.map((m, index) => (
					<View key={index + m} style={styles.metricBlock}>
						<MetricVisual
							mode='block'
							metricType={m}
							plantId={selectedPlant.id}
							onPress={() => {
								navigation.navigate('SinglePlantStack', {
									screen: 'SingleMetric',
									params: { plantId: selectedPlant.id, type: m },
								});
							}}
						/>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		overflow: 'visible',
		marginVertical: Theme.spacing.screenContainer,
	},
	carouselContainer: {
		width: '100%',
		overflow: 'visible',
		marginLeft: -Theme.spacing.screenContainer,
		marginBottom: Theme.spacing.md,
	},
	nameContainer: {
		alignItems: 'center',
		marginBottom: Theme.spacing.md,
	},
	metricBlocksContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	metricBlock: {
		width: '50%',
		...Theme.util.flexCenter,
	},
});
