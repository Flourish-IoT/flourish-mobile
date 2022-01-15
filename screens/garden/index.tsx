import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Grid from '../../lib/icons/Grid';
import Plant from './components/Plant';
import { useTestEndpoint } from '../../data/common';
import Loading from '../../lib/components/Loading';

interface GardenScreenStackProps {
	navigation: NavigationProp<ParamListBase>;
}

export type ViewMode = 'Carousel' | 'Grid';

export default function GardenScreenStack({ navigation }: GardenScreenStackProps) {
	const [viewType, setViewType] = useState<ViewMode>('Carousel');
	const { data: plants, isLoading: plantsIsLoading } = useTestEndpoint();

	return (
		<>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Button mode={viewType === 'Carousel' ? 'contained' : 'outlined'} onPress={() => setViewType('Carousel')}>
					Carousel
				</Button>
				<Button mode={viewType === 'Grid' ? 'contained' : 'outlined'} onPress={() => setViewType('Grid')}>
					Grid
				</Button>
			</View>
			<View>
				{plantsIsLoading ? (
					<Loading text='Loading plants...' />
				) : (
					plants.map((p, index) => <Plant key={index + p.id} viewMode={viewType} plantName={p.name} />)
				)}
			</View>
		</>
	);
}
