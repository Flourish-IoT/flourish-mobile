import React, { createRef, useLayoutEffect, useState } from 'react';
import { Camera, PermissionResponse } from 'expo-camera';
import Typography from '../../../lib/components/styled/Typography';
import { Portal } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Theme } from '../../../providers/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppName } from '../../utils/helper';
import { Action, FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';

interface StyledCameraProps {
	open: boolean;
	onCapture: (photoUri: string) => void;
	captureProcessing: boolean;
	setCaptureProcessing: (isProcessing: boolean) => void;
	onClose: () => void;
}

export default function StyledCamera({ open, onCapture, captureProcessing, setCaptureProcessing, onClose }: StyledCameraProps) {
	const insets = useSafeAreaInsets();
	const cameraTypes = Camera.Constants.Type;
	const [cameraType, setCameraType] = useState(cameraTypes.back);
	const [cameraPermission, setCameraPermission] = useState<PermissionResponse>();
	const cameraRef = createRef<Camera>();

	useLayoutEffect(() => {
		(async () => {
			setCameraPermission(await Camera.requestCameraPermissionsAsync());
		})();
	}, []);

	if (!open) return null;

	const styles = StyleSheet.create({
		cameraContainer: {
			...(StyleSheet.absoluteFill as object),
		},
		cameraTopBar: {
			paddingTop: insets.top,
			paddingLeft: Theme.spacing.md,
			paddingRight: Theme.spacing.md,
			paddingBottom: Theme.spacing.md,
			width: '100%',
			backgroundColor: '#000000',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		cameraBottomBar: {
			position: 'absolute',
			bottom: 0,
			alignSelf: 'center',
			opacity: captureProcessing ? 0.2 : 1,
			marginBottom: insets.bottom,
		},
	});

	const flipCamera = () => {
		if (!cameraPermission) {
			alert(`You must allow ${AppName} to access the camera to do this.`);
			return;
		}

		setCameraType(cameraType === cameraTypes.back ? cameraTypes.front : cameraTypes.back);
	};

	const takePicture = async () => {
		if (!cameraRef) {
			alert('Error taking photo. Please try again.');
			return;
		}

		setCaptureProcessing(true);

		let photo = await cameraRef.current.takePictureAsync();
		let actions: Action[] = [];

		if (cameraType === Camera.Constants.Type.front) {
			actions.push({ rotate: 180 }, { flip: FlipType.Vertical });
		}

		photo = await manipulateAsync(photo.uri, actions, {
			compress: 1,
			format: SaveFormat.PNG,
		});

		onCapture(photo.uri);
		setCaptureProcessing(false);
	};

	return (
		<Portal>
			<View style={styles.cameraContainer}>
				<View style={styles.cameraTopBar}>
					<TouchableOpacity onPress={onClose} disabled={captureProcessing}>
						<Typography variant='body' style={{ color: 'white' }}>
							Cancel
						</Typography>
					</TouchableOpacity>
					<TouchableOpacity onPress={flipCamera} disabled={captureProcessing}>
						<Ionicons name='ios-camera-reverse' style={{ color: 'white', fontSize: 40 }} />
					</TouchableOpacity>
				</View>
				<Camera type={cameraType} style={{ flex: 1 }} ref={cameraRef} ratio='1:1'>
					<TouchableOpacity style={styles.cameraBottomBar} disabled={captureProcessing} onPress={takePicture}>
						<Ionicons name='radio-button-on' style={{ color: 'white', fontSize: 100 }} />
					</TouchableOpacity>
				</Camera>
			</View>
		</Portal>
	);
}
