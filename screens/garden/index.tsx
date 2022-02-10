import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
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
import { GlobalStackNavOptions, Theme } from '../../providers/Theme';
import SinglePlantStack from './SinglePlant';
import SearchField from '../../lib/components/SearchField';
import { filterData } from '../../lib/utils/helper';

interface GardenScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export type ViewMode = 'Carousel' | 'Grid';

export function GardenList({ navigation }: GardenScreenProps) {
	const [viewMode, setViewType] = useState<ViewMode>('Carousel');
	const { data: plants, isLoading: plantsIsLoading } = usePlants('me');
	const [searchQuery, setSearchQuery] = useState('');

	const onPlantSelect = (plant: Plant) => {
		navigation.navigate('SinglePlantStack', { plant });
	};

	return (
		<ScreenContainer scrolls>
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				<Button
					mode='contained'
					onPress={() => setViewType('Carousel')}
					style={{
						...styles.segmentBtn,
						...styles.segmentBtnContent,
						backgroundColor: viewMode === 'Carousel' ? 'white' : Theme.colors.primary,
						borderTopLeftRadius: 25,
						borderTopRightRadius: 0,
						borderBottomLeftRadius: 25,
						borderBottomRightRadius: 0,
					}}
				>
					<CarouselIcon fill={viewMode === 'Carousel' ? Theme.colors.primary : 'white'} />
				</Button>
				<Button
					mode='contained'
					onPress={() => setViewType('Grid')}
					style={{
						...styles.segmentBtn,
						...styles.segmentBtnContent,
						backgroundColor: viewMode === 'Grid' ? 'white' : Theme.colors.primary,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 25,
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 25,
					}}
				>
					<Grid fill={viewMode === 'Grid' ? Theme.colors.primary : 'white'} />
				</Button>
			</View>

			<View style={{ width: '100%', marginBottom: Theme.spacing.md }}>
				<SearchField onQuery={setSearchQuery} />
			</View>

			<View style={{ width: '100%', overflow: 'visible' }}>
				{plantsIsLoading ? (
					<Loading animation='rings' text='Loading plants...' />
				) : !plants ? (
					<Empty animation='error' text='There was an error getting your plants...' />
				) : filterData(plants, searchQuery).length === 0 ? (
					<Empty
						animation='magnifyingGlass'
						size='lg'
						text={
							!searchQuery
								? 'No plants in your garden, try adding one to begin...'
								: 'No plants found with the current filters.'
						}
					/>
				) : viewMode === 'Carousel' ? (
					<CarouselView navigation={navigation} plants={filterData(plants, searchQuery)} onPress={onPlantSelect} />
				) : (
					<GridView plants={filterData(plants, searchQuery)} onPress={onPlantSelect} />
				)}
			</View>
		</ScreenContainer>
	);
}

const Stack = createStackNavigator();

export default function GardenScreenStack() {
	return (
		<Stack.Navigator screenOptions={GlobalStackNavOptions}>
			<Stack.Screen name='GardenList' component={GardenList} />
			<Stack.Screen
				name='SinglePlantStack'
				component={SinglePlantStack}
				options={{ presentation: 'modal', headerLeft: null }}
			/>
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	segmentBtnContent: {
		width: 50,
		borderStyle: 'solid',
		borderColor: Theme.colors.primary,
		borderWidth: Theme.borderWidth,
		margin: 0,
	},
	segmentBtn: {
		...Theme.util.flexCenter,
		shadowColor: 'transparent',
	},
});
