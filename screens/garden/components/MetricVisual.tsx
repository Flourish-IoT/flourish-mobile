import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { MetricRange, PlantMetric, usePlantData } from '../../../data/garden';
import Typography from '../../../lib/components/styled/Typography';
import Chevron from '../../../lib/icons/Chevron';
import MeasurementGauge from '../../../lib/icons/MeasurementGauge';
import MeasurementGraphic from '../../../lib/icons/MeasurementGraphic';
import Sunlight from '../../../lib/icons/Sunlight';
import Temperature from '../../../lib/icons/Temperature';
import WaterDrop from '../../../lib/icons/WaterDrop';
import { getFullMetricName, getMetricGaugeColor, getMetricRangeDescription } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface MetricIconProps extends SvgProps {
	type: PlantMetric;
}

function MetricIcon({ type, ...rest }: MetricIconProps) {
	switch (type) {
		case 'Water':
			return <WaterDrop {...rest} />;
		case 'Sunlight':
			return <Sunlight {...rest} />;
		case 'Temperature':
			return <Temperature {...rest} />;
		case 'Humidity':
			// TODO: Need different icon for this
			return <WaterDrop {...rest} />;
	}
}

interface MetricVisualProps {
	mode: 'block' | 'listItem';
	metricType: PlantMetric;
	plantId: number;
	onPress?: () => void;
	containerStyle?: ViewStyle;
}

export default function MetricVisual({ mode, metricType, plantId, onPress, containerStyle }: MetricVisualProps) {
	const { data: plantData, isLoading: plantDataIsLoading } = usePlantData(plantId);

	let raw: number;
	let range: MetricRange;

	switch (metricType) {
		case 'Water':
			raw = plantData?.soilMoisture?.raw;
			range = plantData?.soilMoisture?.range;
			break;
		case 'Sunlight':
			raw = plantData?.light?.raw;
			range = plantData?.light?.range;
			break;
		case 'Temperature':
			raw = plantData?.temperature?.raw;
			range = plantData?.temperature?.range;
			break;
		case 'Humidity':
			raw = plantData?.humidity?.raw;
			range = plantData?.humidity?.range;
			break;
	}

	const styles = StyleSheet.create({
		container: {
			backgroundColor: mode === 'block' ? 'transparent' : Theme.colors.background,
			width: mode === 'block' ? 100 : '100%',
			flexDirection: mode === 'block' ? 'column' : 'row',
			justifyContent: mode === 'block' ? 'center' : 'space-between',
			alignItems: 'center',
			borderRadius: Theme.borderRadius,
			padding: Theme.spacing.sm,
			...containerStyle,
		},
		iconContainer: {
			height: mode === 'block' ? 80 : undefined,
			width: 70,
			alignItems: 'center',
			justifyContent: 'space-between',
			...(mode === 'listItem' && Theme.util.flexCenter),
		},
		textContainer: {
			flex: 1,
			paddingLeft: Theme.spacing.sm,
		},
		graphic: {
			...(mode === 'block' && {
				position: 'absolute',
				bottom: 0,
				left: '50%',
				transform: [{ translateX: -35 }],
			}),
		},
		gauge: {},
	});

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<MeasurementGauge range={range} style={styles.gauge} />
				<MeasurementGraphic type={metricType} range={range} width='100%' style={styles.graphic} />
			</View>
			{mode === 'listItem' && (
				<View style={styles.textContainer}>
					<Typography variant='body' style={{ fontWeight: 'bold' }}>
						{getFullMetricName(metricType)}
						{': '}
						<Typography variant='h3bold' style={{ color: getMetricGaugeColor(range) }}>
							{getMetricRangeDescription(range)}
						</Typography>
					</Typography>
					<Typography variant='placeholder'>{raw}</Typography>
				</View>
			)}
			{mode === 'listItem' && !!onPress && <Chevron direction='right' withBackground />}
		</TouchableOpacity>
	);
}
