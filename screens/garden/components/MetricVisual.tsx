import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { GaugeValue, Plant, PlantMetric, useSinglePlant } from '../../../data/garden';
import AnimatedGauge from '../../../lib/components/animations/AnimatedGauge';
import Typography from '../../../lib/components/styled/Typography';
import Chevron from '../../../lib/icons/Chevron';
import {
	getFullMetricName,
	getGaugeValueColor,
	getGaugeValuePhrase,
	getMetricSuggestion,
	getMetricUnitSuffix,
	usePlantTypeBestRange,
} from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface MetricVisualProps {
	mode: 'block' | 'listItem';
	showBlockGaugePhrase?: boolean;
	metricType: PlantMetric;
	plantId: number;
	onPress?: () => void;
	containerStyle?: ViewStyle;
	innerContainerStyle?: ViewStyle;
}

const getSensorAndGaugeVals = (
	plant: Plant,
	metricType: PlantMetric
): { sensorValue: number | undefined; gaugeValue: GaugeValue | undefined } => {
	const sensorData = plant?.sensorData;
	const gaugeRatings = plant?.gaugeRatings;

	switch (metricType) {
		case 'Water':
			return { sensorValue: sensorData?.soilMoisture, gaugeValue: gaugeRatings?.soilMoisture };
		case 'Sunlight':
			return { sensorValue: sensorData?.light, gaugeValue: gaugeRatings?.light };
		case 'Temperature':
			return { sensorValue: sensorData?.temperature, gaugeValue: gaugeRatings?.temperature };
		case 'Humidity':
			return { sensorValue: sensorData?.humidity, gaugeValue: gaugeRatings?.humidity };
	}
};

export default function MetricVisual({
	mode,
	showBlockGaugePhrase = true,
	metricType,
	plantId,
	onPress,
	containerStyle,
	innerContainerStyle,
}: MetricVisualProps) {
	const { data: plant, isLoading: plantIsLoading } = useSinglePlant('me', plantId);
	const { data: bestRange } = usePlantTypeBestRange(plant?.plantType?.id, metricType);
	const { sensorValue, gaugeValue } = getSensorAndGaugeVals(plant, metricType);

	if (plantIsLoading || !plant) return null;

	const styles = StyleSheet.create({
		container: {
			backgroundColor: mode === 'block' ? 'transparent' : Theme.colors.background,
			width: '100%',
			flexDirection: mode === 'block' ? 'column' : 'row',
			justifyContent: mode === 'block' ? 'center' : 'space-between',
			alignItems: 'center',
			borderRadius: Theme.borderRadius,
			padding: Theme.spacing.sm,
			...containerStyle,
		},
		iconContainer: {
			height: mode === 'block' ? 80 : undefined,
			width: '100%',
			alignItems: 'center',
			justifyContent: 'space-between',
			...(mode === 'listItem' && Theme.util.flexCenter),
		},
		innerContainer: {
			width: mode === 'block' ? '100%' : 90,
			alignItems: 'center',
			...innerContainerStyle,
		},
		textContainer: {
			flex: 1,
			paddingHorizontal: Theme.spacing.sm,
		},
	});

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.innerContainer}>
				<View style={styles.iconContainer}>
					<AnimatedGauge type={metricType} newValue={gaugeValue} />
				</View>
				{mode === 'block' && showBlockGaugePhrase && (
					<>
						<Typography variant='subHeader'>{getFullMetricName(metricType)}</Typography>
						<Typography variant='h3bold' style={{ color: getGaugeValueColor(gaugeValue) }}>
							{getGaugeValuePhrase(gaugeValue)}
						</Typography>
					</>
				)}
				{mode === 'listItem' && (
					<Typography variant='h3bold' style={{ width: '100%', textAlign: 'center' }}>
						{sensorValue + getMetricUnitSuffix(metricType)}
					</Typography>
				)}
			</View>
			{mode === 'listItem' && (
				<>
					<View style={styles.textContainer}>
						<Typography variant='body' style={{ fontWeight: 'bold' }}>
							{getFullMetricName(metricType)}
							{': '}
							<Typography variant='h3bold' style={{ color: getGaugeValueColor(gaugeValue) }}>
								{getGaugeValuePhrase(gaugeValue)}
							</Typography>
						</Typography>
						{!!bestRange && <Typography variant='placeholder'>Best Range: {bestRange}</Typography>}
						<Typography variant='paragraph'>{getMetricSuggestion(metricType, gaugeValue, plant.name)}</Typography>
					</View>
					{!!onPress && <Chevron direction='right' withBackground />}
				</>
			)}
		</TouchableOpacity>
	);
}
