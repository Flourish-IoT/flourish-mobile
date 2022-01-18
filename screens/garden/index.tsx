import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Grid from '../../lib/icons/Grid';
import Plant from './components/Plant';
import { useTestEndpoint } from '../../data/common';
import Loading from '../../lib/components/Loading';
import Empty from '../../lib/components/Empty';

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
					<Loading animation='rings' text='Loading plants...' />
				) : !plants ? (
					<Empty animation='error' text='There was an error getting your plants...' />
				) : plants.length === 0 ? (
					<Empty animation='magnifyingGlass' text='No plants in your garden, try adding one to begin...' />
				) : (
					plants.map((p, index) => <Plant key={index + p.id} viewMode={viewType} plantName={p.name} />)
				)}
			</View>
		</>
	);
}
