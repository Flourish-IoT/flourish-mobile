import React from 'react';
import { View } from 'react-native';
import { Plant } from '../../../data/garden';
import PlantPot from './PlantPot';

interface GridViewProps {
	plants: Plant[];
	onPress: (plant: Plant) => void;
}

export default function GridView({ plants, onPress }: GridViewProps) {
	return (
		<View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
			{plants.map((p, index) => (
				<PlantPot viewMode={'Grid'} key={index + p.id} plant={p} onPress={() => onPress(p)} />
			))}
		</View>
	);
}
