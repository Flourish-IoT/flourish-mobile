import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Plant, usePlants } from '../../data/garden';
import Loading from '../../lib/components/Loading';
import Empty from '../../lib/components/Empty';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import CarouselView from './components/CarouselView';
import GridView from './components/GridView';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStackNavOptions, Theme } from '../../providers/Theme';
import SinglePlantStack from './SinglePlant';
import SearchField from '../../lib/components/SearchField';
import { filterData } from '../../lib/utils/helper';
import PreSearchGraphic from './components/PreSearchGraphic';
import ViewModeToggle from './components/ViewModeToggle';
import StyledButton from '../../lib/components/styled/Button';
import ConnectDeviceStack from '../pairing/device';

interface GardenScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export type ViewMode = 'Carousel' | 'Grid';

export function GardenList({ navigation }: GardenScreenProps) {
	const [viewMode, setViewMode] = useState<ViewMode>('Carousel');
	const { data: plants, isLoading: plantsIsLoading, isError: plantsIsError } = usePlants('me');
	const [searchQuery, setSearchQuery] = useState('');
	const [searchFocused, setSearchFocused] = useState(false);

	const showSearchGraphic = searchFocused;
	const showSearchResults = searchQuery.trim().length !== 0;

	const onPlantSelect = (plant: Plant) => {
		navigation.navigate('SinglePlantStack', { plant });
	};

	const toggleView = () => {
		setViewMode(viewMode === 'Carousel' ? 'Grid' : 'Carousel');
	};

	return (
		<ScreenContainer scrolls>
			<View style={styles.filterContainer}>
				<SearchField
					onQuery={setSearchQuery}
					onFocus={() => setSearchFocused(true)}
					onBlur={() => setSearchFocused(false)}
				/>
			</View>

			{!showSearchGraphic && !showSearchResults && (
				<View style={styles.controlsTBar}>
					<View style={{ width: styles.addButton.width }} />
					<ViewModeToggle viewMode={viewMode} onPress={toggleView} containerStyle={styles.viewModeButton} />
					<StyledButton
						variant='primary'
						title='+'
						buttonStyle={styles.addButton}
						onPress={() => navigation.navigate('ConnectDeviceStack')}
					/>
				</View>
			)}

			<View style={styles.viewContainer}>
				{plantsIsLoading ? (
					<Loading animation='rings' text='Loading plants...' />
				) : plantsIsError ? (
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
				) : viewMode === 'Carousel' && !showSearchGraphic && !showSearchResults ? (
					<CarouselView navigation={navigation} plants={plants} onPress={onPlantSelect} />
				) : showSearchGraphic && !showSearchResults ? (
					<PreSearchGraphic containerStyle={styles.preSearchState} />
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
			<Stack.Screen name='ConnectDeviceStack' component={ConnectDeviceStack} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	filterContainer: {
		width: '100%',
		marginBottom: Theme.spacing.md,
	},
	controlsTBar: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	viewModeButton: {},
	addButton: {
		height: 30,
		width: 80,
	},
	viewContainer: {
		width: '100%',
		overflow: 'visible',
	},
	preSearchState: {
		marginTop: 100,
	},
});
