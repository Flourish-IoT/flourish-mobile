import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';
import { MetricRange, PlantMetric, usePlantData } from '../../../data/garden';
import { useShowHumidity } from '../../../data/user';
import Chevron from '../../../lib/icons/Chevron';
import Sunlight from '../../../lib/icons/Sunlight';
import Temperature from '../../../lib/icons/Temperature';
import WaterDrop from '../../../lib/icons/WaterDrop';
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
}

export default function MetricVisual({ mode, metricType, plantId, onPress }: MetricVisualProps) {
	const { data: showHumidity, isLoading: showHumidityIsLoading } = useShowHumidity();
	const { data: plantData, isLoading: plantDataIsLoading } = usePlantData(plantId);

	if (metricType === 'Humidity' && (showHumidityIsLoading || !showHumidity)) return null;

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

	const blocks = [
		{ range: 1, color: '#DADADA' },
		{ range: 2, color: '#B0B0B0' },
		{ range: 3, color: '#6B6B6B' },
		{ range: 4, color: '#B0B0B0' },
		{ range: 5, color: '#DADADA' },
	];

	const styles = StyleSheet.create({
		container: {
			width: mode === 'block' ? 100 : Dimensions.get('window').width,
			display: 'flex',
			flexDirection: mode === 'block' ? 'column' : 'row',
			justifyContent: mode === 'block' ? 'center' : 'space-between',
			alignItems: 'center',
			padding: Theme.padding,
		},
		iconContainer: {
			height: 50,
			width: undefined,
			aspectRatio: 1 / 1,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: mode === 'block' ? Theme.margin : 0,
		},
		materBar: {
			width: mode === 'block' ? '100%' : 100,
			display: 'flex',
			flexDirection: 'row',
		},
		meterBarBlock: {
			width: 100 / blocks.length + '%',
			height: undefined,
			aspectRatio: 1 / 1,
		},
	});

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<MetricIcon type={metricType} height={mode === 'block' ? 50 : 40} />
			</View>
			{mode === 'listItem' && <Text>{raw}</Text>}
			<View style={styles.materBar}>
				{blocks.map((b) => (
					<View
						key={b.range}
						style={{ ...styles.meterBarBlock, backgroundColor: b.color, borderWidth: b.range === range ? 2 : 0 }}
					/>
				))}
			</View>
			{mode === 'listItem' && <Chevron direction='right' />}
		</TouchableOpacity>
	);
}
