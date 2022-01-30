import React, { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Grid from '../../lib/icons/Grid';
import PlantPot from './components/PlantPot';
import { Plant, usePlants } from '../../data/garden';
import Loading from '../../lib/components/Loading';
import Empty from '../../lib/components/Empty';
import ScreenContainer from '../../lib/components/ScreenContainer';
import CarouselIcon from '../../lib/icons/Carousel';
import Carousel from 'react-native-snap-carousel';
import { Theme } from '../../providers/Theme';
import { Dimensions } from 'react-native';
import CarouselView from './CarouselView';
import GridView from './GridView';

interface GardenScreenStackProps {
	navigation: NavigationProp<ParamListBase>;
}

export type ViewMode = 'Carousel' | 'Grid';
const viewModes: ViewMode[] = ['Carousel', 'Grid'];

export default function GardenScreen({ navigation }: GardenScreenStackProps) {
	const [viewMode, setViewType] = useState<ViewMode>('Carousel');
	const { data: plants, isLoading: plantsIsLoading } = usePlants();

	return (
		<ScreenContainer scrolls>
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				{viewModes.map((m) => (
					<Button
						key={m}
						style={{ width: 50, opacity: viewMode === m ? 1 : 0.5 }}
						mode='contained'
						onPress={() => setViewType(m)}
					>
						{m === 'Carousel' ? <CarouselIcon /> : <Grid />}
					</Button>
				))}
			</View>
			<View style={{ width: '100%', overflow: 'visible' }}>
				{plantsIsLoading ? (
					<Loading animation='rings' text='Loading plants...' />
				) : !plants ? (
					<Empty animation='error' text='There was an error getting your plants...' />
				) : plants.length === 0 ? (
					<Empty animation='magnifyingGlass' text='No plants in your garden, try adding one to begin...' />
				) : viewMode === 'Carousel' ? (
					<CarouselView plants={plants} />
				) : (
					<GridView plants={plants} />
				)}
			</View>
			{viewMode === 'Carousel' && (
				<View>
					<Text>{}</Text>
					<Text>{}</Text>
				</View>
			)}
		</ScreenContainer>
	);
}
