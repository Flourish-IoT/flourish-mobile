import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Plant, plantMetrics } from '../../data/garden';
import ModalBackButton from '../../lib/components/ModalBackButton';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import Typography from '../../lib/components/styled/Typography';
import { getPlaceHolder } from '../../lib/utils/helper';
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

	return (
		<ScreenContainer scrolls style={styles.screenContainer} bounces={false}>
			<ModalBackButton absolutePos onPress={navigation.goBack} />
			<Image source={plant.image ? { uri: plant.image } : getPlaceHolder('plant')} style={styles.image} />
			<View style={styles.content}>
				<View style={styles.contentTitle}>
					<Typography variant='h2' style={{ textAlign: 'center' }}>
						{plant.name}
					</Typography>
					<Typography variant='placeholder' style={{ textAlign: 'center' }}>
						{plant.scientificName}
					</Typography>
				</View>
				{plantMetrics.map((m, mIndex, { length }) => (
					<MetricVisual
						key={mIndex + m}
						mode='listItem'
						metricType={m}
						plantId={plant.id}
						onPress={() => navigation.navigate('SingleMetric', { plantId: plant.id, type: m })}
						containerStyle={{ marginBottom: mIndex === length - 1 ? 0 : Theme.spacing.md }}
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
				options={{ headerShown: null }}
				initialParams={{ plant }}
			/>
			<Stack.Screen name='SingleMetric' component={SingleMetricScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		padding: 0,
		backgroundColor: 'white',
	},
	image: {
		width: '100%',
		height: undefined,
		aspectRatio: 1 / 1,
	},
	content: {
		padding: Theme.spacing.screenContainer,
	},
	contentTitle: {
		alignItems: 'center',
		marginBottom: Theme.spacing.md,
	},
});
