import { Camera, PermissionResponse } from 'expo-camera';
import React, { createRef, useLayoutEffect, useState } from 'react';
import StyledAvatar, { StyledAvatarProps } from '../../../lib/components/styled/Avatar';
import { Theme } from '../../../providers/Theme';
import * as ImagePicker from 'expo-image-picker';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Action, FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import Typography from '../../../lib/components/styled/Typography';
import { AppName } from '../../../lib/utils/helper';
import { useChangeProfilePicture } from '../../../data/user';
import { Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePicture({ user }: StyledAvatarProps) {
	const insets = useSafeAreaInsets();
	const cameraTypes = Camera.Constants.Type;
	const changeProfilePicture = useChangeProfilePicture();

	const cameraRef = createRef<Camera>();

	const [cameraType, setCameraType] = useState(cameraTypes.back);
	const [cameraOpen, setCameraOpen] = useState(false);
	const [imageIsProcessing, setImageIsProcessing] = useState(false);
	const [photosPermission, setPhotosPermission] = useState<ImagePicker.MediaLibraryPermissionResponse>();
	const [cameraPermission, setCameraPermission] = useState<PermissionResponse>();

	const styles = StyleSheet.create({
		avatar: {
			marginBottom: Theme.spacing.md,
			opacity: imageIsProcessing ? 0.2 : 1,
		},
		cameraContainer: { ...(StyleSheet.absoluteFill as object), display: 'flex' },
		cameraTopBar: {
			paddingTop: insets.top,
			paddingLeft: Theme.spacing.md,
			paddingRight: Theme.spacing.md,
			paddingBottom: Theme.spacing.md,
			width: '100%',
			backgroundColor: '#000000',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		cameraBottomBar: {
			position: 'absolute',
			bottom: 0,
			alignSelf: 'center',
			opacity: imageIsProcessing ? 0.2 : 1,
			marginBottom: insets.bottom,
		},
	});

	const updateProfilePic = async (uri: string) => {
		try {
			await changeProfilePicture.mutateAsync(uri);
			setCameraOpen(false);
			alert('Updated.');
		} catch (error) {
			alert(error);
		}
	};

	useLayoutEffect(() => {
		(async () => {
			setPhotosPermission(await ImagePicker.requestMediaLibraryPermissionsAsync());
			setCameraPermission(await Camera.requestCameraPermissionsAsync());
		})();
	}, []);

	const onAvatarPress = () => {
		Alert.alert('Select photo...', undefined, [
			{
				text: 'Camera',
				onPress: () => {
					setCameraOpen(true);
				},
			},
			{
				text: 'Photos',
				onPress: openPhotos,
			},
			{
				text: 'Cancel',
			},
		]);
	};

	const flipCamera = () => {
		if (!cameraPermission) {
			alert(`You must allow ${AppName} to access the camera to do this.`);
			return;
		}

		setCameraType(cameraType === cameraTypes.back ? cameraTypes.front : cameraTypes.back);
	};

	const openPhotos = async () => {
		if (!photosPermission) {
			alert(`You must allow ${AppName} to access photos to do this.`);
			return;
		}

		setImageIsProcessing(true);
		const photo = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!photo.cancelled) {
			updateProfilePic(
				// @ts-ignore
				photo.uri
			);
		}
		setImageIsProcessing(false);
	};

	const takePicture = async () => {
		if (!cameraRef) {
			alert('Error taking photo. Please try again.');
			return;
		}

		setImageIsProcessing(true);

		let photo = await cameraRef.current.takePictureAsync();
		let actions: Action[] = [];

		if (cameraType === Camera.Constants.Type.front) {
			actions.push({ rotate: 180 }, { flip: FlipType.Vertical });
		}

		photo = await manipulateAsync(photo.uri, actions, {
			compress: 1,
			format: SaveFormat.PNG,
		});

		updateProfilePic(photo.uri);
		setImageIsProcessing(false);
	};

	return (
		<>
			<StyledAvatar user={user} style={styles.avatar} onPress={!imageIsProcessing ? onAvatarPress : null} />
			{cameraOpen && (
				<Portal>
					<View style={styles.cameraContainer}>
						<View style={styles.cameraTopBar}>
							<TouchableOpacity onPress={() => setCameraOpen(false)} disabled={imageIsProcessing}>
								<Typography variant='body' style={{ color: 'white' }}>
									Cancel
								</Typography>
							</TouchableOpacity>
							<TouchableOpacity onPress={flipCamera} disabled={imageIsProcessing}>
								<Ionicons name='ios-camera-reverse' style={{ color: 'white', fontSize: 40 }} />
							</TouchableOpacity>
						</View>
						<Camera type={cameraType} style={{ flex: 1 }} ref={cameraRef} ratio='1:1'>
							<TouchableOpacity style={styles.cameraBottomBar} disabled={imageIsProcessing} onPress={takePicture}>
								<Ionicons name='radio-button-on' style={{ color: 'white', fontSize: 100 }} />
							</TouchableOpacity>
						</Camera>
					</View>
				</Portal>
			)}
		</>
	);
}
