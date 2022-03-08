import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, View, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Plant, plantMetrics } from '../../../data/garden';
import { Theme } from '../../../providers/Theme';
import MetricVisual from './MetricVisual';
import PlantPot from './PlantPot';

interface CarouselViewProps {
	navigation: NavigationProp<ParamListBase>;
	plants: Plant[];
	onPress: (plant: Plant) => void;
	style?: ViewStyle;
}

interface CarouselRendererProps {
	item: Plant;
	index: number;
}

export default function CarouselView({ navigation, plants, onPress, style }: CarouselViewProps) {
	let firstItemIndex = 0;
	const [selectedPlant, setSelectedPlant] = useState(plants[firstItemIndex]);

	return (
		<View style={{ width: '100%', overflow: 'visible', marginVertical: Theme.spacing.screenContainer, ...style }}>
			<View style={{ width: '100%', overflow: 'visible', marginLeft: -Theme.spacing.screenContainer, marginBottom: Theme.spacing.screenContainer }}>
				<Carousel
					data={plants}
					renderItem={({ item: plant }: CarouselRendererProps) => (
						<PlantPot
							viewMode={'Carousel'}
							image={plant.image}
							title={plant.name}
							subtitle={plant.commonName}
							onPress={() => onPress(plant)}
						/>
					)}
					onSnapToItem={(index) => setSelectedPlant(plants[index])}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width - Theme.spacing.md * 16}
					firstItem={firstItemIndex}
				/>
			</View>
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				{plantMetrics.map((m) => (
					<MetricVisual
						key={m}
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
				))}
			</View>
		</View>
	);
}
