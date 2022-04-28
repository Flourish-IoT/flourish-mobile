import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../../lib/components/layout/ScreenContainer';
import Button from '../../../lib/components/styled/Button';
import { GlobalStackNavOptions, Theme } from '../../../providers/Theme';
import Typography from '../../../lib/components/styled/Typography';
import CurvedContainer, { TopToCurvedContainer } from '../../../lib/components/layout/CurvedContainer';
import { createStackNavigator } from '@react-navigation/stack';
import CenterMe from '../../../lib/components/CenterMe';
import SearchField from '../../../lib/components/SearchField';
import { PlantType, usePlantTypes } from '../../../data/garden';
import Loading from '../../../lib/components/Loading';
import Empty from '../../../lib/components/Empty';
import { filterData } from '../../../lib/utils/helper';
import PlantTypeCard from './PlantTypeCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AddPlantStackProps {
	navigation: NavigationProp<ParamListBase>;
}

interface StepProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

const IntroStep = ({ navigation }: StepProps) => {
	const { data: plantTypes, isLoading: plantTypesIsLoading } = usePlantTypes();
	const [query, setQuery] = useState('');
	const [selected, setSelected] = useState<PlantType | undefined>();

	const isQuerying = query.trim().length !== 0;
	let filtered = isQuerying ? filterData(plantTypes, query) : plantTypes;

	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<SearchField onQuery={setQuery} disabled={!plantTypes} containerStyle={{ width: '100%' }} />

			<TopToCurvedContainer containerStyle={{ paddingTop: Theme.spacing.sm }}>
				{plantTypesIsLoading ? (
					<Loading text='Loading available plant types...' />
				) : !plantTypes ? (
					<Empty text='No plant types available.' />
				) : (
					filtered.map((pT) => {
						const isSelected = pT.id === selected?.id;

						return (
							<TouchableOpacity
								key={pT.id}
								onPress={() => setSelected(pT)}
								style={{
									borderRadius: 50,
									padding: Theme.spacing.sm,
									backgroundColor: isSelected ? Theme.colors.faded : undefined,
								}}
							>
								<PlantTypeCard plantType={pT} />
							</TouchableOpacity>
						);
					})
				)}
			</TopToCurvedContainer>

			<CurvedContainer containerStyle={styles.curvedContainer} circleStyle={styles.curvedCircleStyle}>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Select the type of plant that you are adding to your garden.
				</Typography>
				<CenterMe horizontal>
					<Button
						variant='primary'
						title='Next'
						onPress={() => navigation.navigate('PairingStep')}
						disabled={!selected}
					/>
				</CenterMe>
			</CurvedContainer>
		</ScreenContainer>
	);
};

const Stack = createStackNavigator();

export default function AddPlantStack({ navigation }: AddPlantStackProps) {
	return (
		<Stack.Navigator
			initialRouteName='IntroStep'
			screenOptions={{
				...GlobalStackNavOptions,
				cardStyle: {
					backgroundColor: Theme.colors.background,
				},
			}}
		>
			<Stack.Screen name='IntroStep' component={IntroStep} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		backgroundColor: Theme.colors.background,
	},
	curvedContainer: {
		alignItems: 'flex-start',
	},
	curvedCircleStyle: {
		left: '55%',
	},
});
