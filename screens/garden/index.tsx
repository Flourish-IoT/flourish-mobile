import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Grid from '../../lib/icons/Grid';
import { Plant, usePlants } from '../../data/garden';
import Loading from '../../lib/components/Loading';
import Empty from '../../lib/components/Empty';
import ScreenContainer from '../../lib/components/ScreenContainer';
import CarouselIcon from '../../lib/icons/Carousel';
import CarouselView from './components/CarouselView';
import GridView from './components/GridView';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalNavigatorOptions } from '../../providers/Theme';
import SinglePlantScreen from './SinglePlant';

interface GardenScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export type ViewMode = 'Carousel' | 'Grid';
const viewModes: ViewMode[] = ['Carousel', 'Grid'];

export function GardenList({ navigation }: GardenScreenProps) {
	const [viewMode, setViewType] = useState<ViewMode>('Carousel');
	const { data: plants, isLoading: plantsIsLoading } = usePlants('me');

	const onPlantSelect = (plant: Plant) => {
		navigation.navigate('SinglePlant', { plant });
	};

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
					<Empty animation='magnifyingGlass' size='lg' text='No plants in your garden, try adding one to begin...' />
				) : viewMode === 'Carousel' ? (
					<CarouselView plants={plants} onPress={onPlantSelect} />
				) : (
					<GridView plants={plants} onPress={onPlantSelect} />
				)}
			</View>
		</ScreenContainer>
	);
}

const Stack = createStackNavigator();

export default function GardenScreenStack() {
	return (
		<Stack.Navigator screenOptions={{ ...GlobalNavigatorOptions, headerShown: false }}>
			<Stack.Screen name='GardenList' component={GardenList} />
			<Stack.Screen name='SinglePlant' component={SinglePlantScreen} />
		</Stack.Navigator>
	);
}
