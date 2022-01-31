import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Caption, Headline } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { Plant, usePlantData } from '../../../data/garden';
import { useShowHumidity, useUser } from '../../../data/user';
import Loading from '../../../lib/components/Loading';
import { Theme } from '../../../providers/Theme';
import MetricVisual from './MetricVisual';
import PlantPot from './PlantPot';

interface CarouselViewProps {
	plants: Plant[];
	onPress: (plant: Plant) => void;
}

interface CarouselRendererProps {
	item: Plant;
	index: number;
}

export type PlantMetric = 'Water' | 'Sunlight' | 'Temperature' | 'Humidity';

export default function CarouselView({ plants, onPress }: CarouselViewProps) {
	let firstItemIndex = 0;
	const [selectedPlant, setSelectedPlant] = useState(plants[firstItemIndex]);
	const { data: showHumidity, isLoading: showHumidityIsLoading } = useShowHumidity();
	const { data: plantData, isLoading: plantDataIsLoading } = usePlantData(selectedPlant.id);

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
				<MetricVisual
					mode='block'
					type='Water'
					range={plantData?.soilMoisture?.range}
					rawValue={plantData?.soilMoisture?.raw}
					onPress={() => {}}
				/>
				<MetricVisual
					mode='block'
					type='Sunlight'
					range={plantData?.light?.range}
					rawValue={plantData?.light?.raw}
					onPress={() => {}}
				/>
				<MetricVisual
					mode='block'
					type='Temperature'
					range={plantData?.temperature?.range}
					rawValue={plantData?.temperature?.raw}
					onPress={() => {}}
				/>
				{!showHumidityIsLoading && showHumidity && (
					<MetricVisual
						mode='block'
						type='Humidity'
						range={plantData?.humidity?.range}
						rawValue={plantData?.humidity?.raw}
						onPress={() => {}}
					/>
				)}
			</View>
		</View>
	);
}
