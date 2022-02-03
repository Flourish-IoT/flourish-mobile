import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Caption, Headline } from 'react-native-paper';
import { Plant, plantMetrics } from '../../data/garden';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { GlobalStackNavOptions, Theme } from '../../providers/Theme';
import MetricVisual from './components/MetricVisual';
import SingleMetricScreen from './SingleMetric';

interface SinglePlantScreenProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

interface SinglePlantScreenRouteProps {
	plant: Plant;
}

export function SinglePlantIndex({ route, navigation }: SinglePlantScreenProps) {
	const { plant } = route.params as SinglePlantScreenRouteProps;

	useLayoutEffect(() => {
		navigation.setOptions({ title: plant.name });
	}, []);

	return (
		<ScreenContainer scrolls style={styles.screen}>
			<Image
				source={plant.image ? { url: plant.image } : require('../../lib/assets/placeholder/plant.png')}
				style={styles.image}
			/>
			<View style={styles.content}>
				<View style={styles.contentTitle}>
					<Headline style={{ textAlign: 'center' }}>{plant.name}</Headline>
					<Caption style={{ textAlign: 'center' }}>{plant.commonName}</Caption>
				</View>
				{plantMetrics.map((m) => (
					<MetricVisual
						key={m}
						mode='listItem'
						metricType={m}
						plantId={plant.id}
						onPress={() => {
							navigation.navigate('SingleMetric', { plantId: plant.id, type: m });
						}}
					/>
				))}
			</View>
		</ScreenContainer>
	);
}

interface SinglePlantScreenRouteProps {
	plant: Plant;
}

const Stack = createStackNavigator();

export default function SinglePlantStack({ route, navigation }: SinglePlantScreenProps) {
	const { plant } = route.params as SinglePlantScreenRouteProps;

	return (
		<Stack.Navigator screenOptions={{ ...GlobalStackNavOptions, headerShown: true }}>
			<Stack.Screen
				name='SinglePlantIndex'
				component={SinglePlantIndex}
				options={{ headerLeft: null }}
				initialParams={{ plant }}
			/>
			<Stack.Screen name='SingleMetric' component={SingleMetricScreen} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 0,
	},
	image: {
		width: '100%',
		height: undefined,
		aspectRatio: 1 / 1,
	},
	content: {
		padding: Theme.padding,
	},
	contentTitle: {
		display: 'flex',
		alignItems: 'center',
	},
});