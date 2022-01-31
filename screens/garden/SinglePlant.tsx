import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Caption, Headline } from 'react-native-paper';
import { Plant, usePlantData } from '../../data/garden';
import { useShowHumidity } from '../../data/user';
import ScreenContainer from '../../lib/components/ScreenContainer';
import MetricVisual from './components/MetricVisual';

interface SinglePlantScreenProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

interface SinglePlantScreenRouteProps {
	plant: Plant;
}

export default function SinglePlantScreen({ route, navigation }: SinglePlantScreenProps) {
	const { plant } = route.params as SinglePlantScreenRouteProps;
	const { data: showHumidity, isLoading: showHumidityIsLoading } = useShowHumidity();
	const { data: plantData, isLoading: plantDataIsLoading } = usePlantData(plant.id);

	return (
		<ScreenContainer scrolls>
			<Image
				source={plant.image ? { url: plant.image } : require('../../lib/assets/placeholder/plant.png')}
				style={styles.image}
			/>
			<View style={{ width: '100%' }}>
				<Headline style={{ textAlign: 'center' }}>{plant.name}</Headline>
				<Caption style={{ textAlign: 'center' }}>{plant.commonName}</Caption>
			</View>
			<View>
				<MetricVisual
					mode='listItem'
					type='Water'
					range={plantData?.soilMoisture?.range}
					rawValue={plantData?.light?.raw}
					onPress={() => {}}
				/>
				<MetricVisual
					mode='listItem'
					type='Sunlight'
					range={plantData?.light?.range}
					rawValue={plantData?.light?.raw}
					onPress={() => {}}
				/>
				<MetricVisual
					mode='listItem'
					type='Temperature'
					range={plantData?.temperature?.range}
					rawValue={plantData?.light?.raw}
					onPress={() => {}}
				/>
				{!showHumidityIsLoading && showHumidity && (
					<MetricVisual
						mode='listItem'
						type='Humidity'
						range={plantData?.humidity?.range}
						rawValue={plantData?.light?.raw}
						onPress={() => {}}
					/>
				)}
			</View>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: undefined,
		aspectRatio: 1 / 1,
	},
});
