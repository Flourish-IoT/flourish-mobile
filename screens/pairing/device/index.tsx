import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../../lib/components/layout/ScreenContainer';
import Button from '../../../lib/components/styled/Button';
import { GlobalStackNavOptions, Theme } from '../../../providers/Theme';
import Typography from '../../../lib/components/styled/Typography';
import CurvedContainer, { TopToCurvedContainer } from '../../../lib/components/layout/CurvedContainer';
import PotPlantAndSensor from '../../../lib/icons/PotPlantAndSensor';
import { createStackNavigator } from '@react-navigation/stack';
import CenterMe from '../../../lib/components/CenterMe';
import BluetoothScanningModal from './BluetoothScanningModal';
import { Sensor, useAddDevice } from '../../../data/garden';
import BluetoothScanning from '../../../lib/components/animations/BluetoothScanning';

interface ConnectDeviceStackProps {
	navigation: NavigationProp<ParamListBase>;
}

interface StepProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

const IntroStep = ({ navigation }: StepProps) => {
	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<TopToCurvedContainer containerStyle={{ alignItems: 'center' }}>
				<PotPlantAndSensor />
			</TopToCurvedContainer>
			<CurvedContainer containerStyle={styles.curvedContainer}>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Turn your Sensor device on and place it in your plant's pot, so that the stake is fully planted into the soil.
				</Typography>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Make sure that the top of the sensor device is facing the sun, so the light sensor can get an accurate
					reading.
				</Typography>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					For further instructions, see the manual
				</Typography>
				<Button variant='primary' title='Next' onPress={() => navigation.navigate('PairingStep')} />
			</CurvedContainer>
		</ScreenContainer>
	);
};

const PairingStep = ({ navigation }: StepProps) => {
	const [showScanningModal, setShowScanningModal] = useState(false);
	const addDevice = useAddDevice();

	const onPaired = async (sensor: Sensor) => {
		try {
			await addDevice.mutateAsync(sensor);

			setShowScanningModal(false);
			navigation.navigate('SuccessStep', { deviceId: sensor.id });
		} catch (error) {
			Alert.alert('Failed to add device...', error);
		}
	};

	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<TopToCurvedContainer containerStyle={{ alignItems: 'center' }}>
				<BluetoothScanning size='lg' />
			</TopToCurvedContainer>
			<CurvedContainer>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md, textAlign: 'center' }}>
					Make sure your bluetooth is on so we can connect to your device.
				</Typography>
				<Button variant='primary' onPress={() => setShowScanningModal(true)} title='Next' />
			</CurvedContainer>

			{showScanningModal && <BluetoothScanningModal onPaired={onPaired} onClose={() => setShowScanningModal(false)} />}
		</ScreenContainer>
	);
};

interface SuccessStepRouteParams {
	deviceId: number;
}

const SuccessStep = ({ navigation, route }: StepProps) => {
	const { deviceId } = route.params as SuccessStepRouteParams;

	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<TopToCurvedContainer containerStyle={{ alignItems: 'center' }}>
				<PotPlantAndSensor />
			</TopToCurvedContainer>
			<CurvedContainer containerStyle={styles.curvedContainer}>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Congrats! Your Sensor has been successfully connected to the app!
				</Typography>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Please take a few moments to add some information about your plant.
				</Typography>
				<CenterMe horizontal>
					<Button
						variant='primary'
						onPress={() => navigation.navigate('AddPlantStack', { deviceId })}
						title='Set Up Plant'
					/>
				</CenterMe>
			</CurvedContainer>
		</ScreenContainer>
	);
};

const Stack = createStackNavigator();

export default function ConnectDeviceStack({ navigation }: ConnectDeviceStackProps) {
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
			<Stack.Screen name='PairingStep' component={PairingStep} />
			<Stack.Screen name='SuccessStep' component={SuccessStep} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		backgroundColor: Theme.colors.background,
	},
	curvedContainer: {},
});
