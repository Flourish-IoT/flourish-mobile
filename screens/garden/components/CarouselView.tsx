import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Caption, Headline } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { Plant, plantMetrics } from '../../../data/garden';
import { Theme } from '../../../providers/Theme';
import MetricVisual from './MetricVisual';
import PlantPot from './PlantPot';

interface CarouselViewProps {
	navigation: NavigationProp<ParamListBase>;
	plants: Plant[];
	onPress: (plant: Plant) => void;
}

interface CarouselRendererProps {
	item: Plant;
	index: number;
}

export default function CarouselView({ navigation, plants, onPress }: CarouselViewProps) {
	let firstItemIndex = 0;
	const [selectedPlant, setSelectedPlant] = useState(plants[firstItemIndex]);

	return (
		<View style={{ width: '100%', overflow: 'visible' }}>
			<View style={{ width: '100%', overflow: 'visible', marginLeft: -Theme.padding }}>
				<Carousel
					data={plants}
					renderItem={({ item: plant }: CarouselRendererProps) => (
						<PlantPot viewMode={'Carousel'} plant={plant} onPress={() => onPress(plant)} />
					)}
					onSnapToItem={(index) => setSelectedPlant(plants[index])}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width - Theme.padding * 16}
					firstItem={firstItemIndex}
				/>
			</View>

			<View style={{ width: '100%' }}>
				<Headline style={{ textAlign: 'center' }}>{selectedPlant.name}</Headline>
				<Caption style={{ textAlign: 'center' }}>{selectedPlant.commonName}</Caption>
			</View>
			<View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
