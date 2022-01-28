import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Grid from '../../lib/icons/Grid';
import Plant from './components/Plant';
import { usePlants } from '../../data/garden';
import Loading from '../../lib/components/Loading';
import Empty from '../../lib/components/Empty';
import ScreenContainer from '../../lib/components/ScreenContainer';
import Carousel from '../../lib/icons/Carousel';

interface GardenScreenStackProps {
	navigation: NavigationProp<ParamListBase>;
}

export type ViewMode = 'Carousel' | 'Grid';
const viewModes: ViewMode[] = ['Carousel', 'Grid'];

export default function GardenScreenStack({ navigation }: GardenScreenStackProps) {
	const [viewType, setViewType] = useState<ViewMode>('Carousel');
	const { data: plants, isLoading: plantsIsLoading } = usePlants();

	return (
		<ScreenContainer>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				{viewModes.map((m) => (
					<Button
						key={m}
						style={{ width: 50, opacity: viewType === m ? 1 : 0.5 }}
						mode='contained'
						onPress={() => setViewType(m)}
					>
						{m === 'Carousel' ? <Carousel /> : <Grid />}
					</Button>
				))}
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
			<View>
				<Text>Temporary navigation to screens:</Text>
				<Button onPress={() => navigation.navigate('Testing')}>Testing</Button>
				<Button onPress={() => navigation.navigate('SettingsStack')}>Settings</Button>
				<Button onPress={() => navigation.navigate('Calendar')}>Calendar</Button>
			</View>
		</ScreenContainer>
	);
}
