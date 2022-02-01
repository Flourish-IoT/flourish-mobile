import { NavigationProp } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import { useLayoutEffect } from 'react';
import { PlantMetric } from '../../data/garden';
import MetricVisual from './components/MetricVisual';

interface SingleMetricScreenProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

interface SinglePlantScreenRouteProps {
	plantId: number;
	type: PlantMetric;
}

export default function SingleMetricScreen({ navigation, route }: SingleMetricScreenProps) {
	const { plantId, type } = route.params as SinglePlantScreenRouteProps;

	useLayoutEffect(() => {
		navigation.setOptions({ title: type });
	}, []);

	return <MetricVisual mode={'block'} metricType={type} plantId={plantId} />;
}
