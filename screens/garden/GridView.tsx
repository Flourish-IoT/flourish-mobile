import React, { useState } from 'react';
import { View } from 'react-native';
import { Plant } from '../../data/garden';
import PlantPot from './components/PlantPot';

interface GridViewProps {
	plants: Plant[];
}

export default function GridView({ plants }: GridViewProps) {
	return (
		<View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
			{plants.map((p, index) => (
				<PlantPot viewMode={'Grid'} key={index + p.id} plant={p} />
			))}
		</View>
	);
}
