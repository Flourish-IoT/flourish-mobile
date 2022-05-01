import React from 'react';
import { StyleSheet } from 'react-native';
import { Alert, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { Sensor } from '../../../data/garden';
import CenterMe from '../../../lib/components/CenterMe';
import StyledButton from '../../../lib/components/styled/Button';
import Typography from '../../../lib/components/styled/Typography';
import { Theme } from '../../../providers/Theme';

interface BluetoothScanningModalProps {
	onPaired: (sensor: Sensor) => void;
	onClose: () => void;
}

const sensors: Sensor[] = [
	{
		id: 9,
		model: 'Flourish Device',
		deviceType: 'Sensor',
		deviceState: 'Connected',
		userId: 1,
		name: 'Flourish Sensor Device',
		ip: null,
		apiVersion: '1.0',
		softwareVersion: '1.0',
	},
];

export default function BluetoothScanningModal({ onPaired, onClose }: BluetoothScanningModalProps) {
	const startPairing = (sensor: Sensor) => {
		Alert.alert('Bluetooth Pairing Request', `"${sensor.name}" would like to pair with your mobile device.`, [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => onPaired(sensor),
			},
		]);
	};

	return (
		<Portal>
			<View style={{ backgroundColor: Theme.colors.backdrop, flex: 1, ...Theme.util.flexCenter }}>
				<View style={styles.modalBackdrop}>
					<CenterMe horizontal vertical style={styles.headerAndFooter}>
						<Typography variant='h3bold'>Select an Accessory</Typography>
					</CenterMe>
					<View style={styles.modal}>
						{sensors.map((s) => (
							<View key={s.id} style={styles.option}>
								<StyledButton
									variant='text'
									title={s.name}
									textStyle={{
										color: 'black',
										marginVertical: 24,
									}}
									onPress={() => startPairing(s)}
								/>
							</View>
						))}
					</View>
					<CenterMe horizontal vertical style={styles.headerAndFooter}>
						<StyledButton variant='text' textStyle={styles.cancelButton} title='Cancel' onPress={onClose} />
					</CenterMe>
				</View>
			</View>
		</Portal>
	);
}

const styles = StyleSheet.create({
	modalBackdrop: {
		backgroundColor: '#F9F7F7',
		width: '100%',
		maxWidth: 360,
		height: '100%',
		maxHeight: 400,
		borderRadius: 13,
		borderWidth: 1,
		borderColor: '#F9F7F7',
	},
	modal: {
		backgroundColor: 'white',
		flex: 1,
		paddingHorizontal: 26,
	},
	headerAndFooter: {
		height: 55,
	},
	option: {
		borderBottomWidth: 1,
		borderBottomColor: '#E1E1E1',
	},
	cancelButton: {
		color: '#007AFF',
		fontWeight: 'bold',
	},
});
