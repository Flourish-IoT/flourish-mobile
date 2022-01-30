import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Caption, Headline } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { Plant } from '../../data/garden';
import { Theme } from '../../providers/Theme';
import PlantPot from './components/PlantPot';

interface CarouselViewProps {
	plants: Plant[];
}

interface CarouselRendererProps {
	item: Plant;
	index: number;
}

export default function CarouselView({ plants }: CarouselViewProps) {
	const [activePlant, setActivePlant] = useState(plants[0]);

	return (
		<View style={{ width: '100%', overflow: 'visible' }}>
			<View style={{ width: '100%', overflow: 'visible', marginLeft: -Theme.padding }}>
				<Carousel
					data={plants}
					renderItem={({ item: plant, index }: CarouselRendererProps) => (
						<PlantPot viewMode={'Carousel'} plant={plant} />
					)}
					onSnapToItem={(index) => setActivePlant(plants[index])}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width - Theme.padding * 16}
				/>
			</View>
			<View style={{ width: '100%' }}>
				<Headline style={{ textAlign: 'center' }}>{activePlant.name}</Headline>
				<Caption style={{ textAlign: 'center' }}>{activePlant.commonName}</Caption>
			</View>
		</View>
	);
}
