import React, { useLayoutEffect, useState } from 'react';
import StyledAvatar, { StyledAvatarProps } from '../../../lib/components/styled/Avatar';
import { Theme } from '../../../providers/Theme';
import * as ImagePicker from 'expo-image-picker';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AppName } from '../../../lib/utils/helper';
import { useChangeProfilePicture } from '../../../data/user';
import Pencil from '../../../lib/icons/Pencil';
import StyledCamera from '../../../lib/components/styled/Camera';

export default function ProfilePicture({ user }: StyledAvatarProps) {
	const changeProfilePicture = useChangeProfilePicture();

	const [cameraOpen, setCameraOpen] = useState(false);
	const [imageIsProcessing, setImageIsProcessing] = useState(false);
	const [photosPermission, setPhotosPermission] = useState<ImagePicker.MediaLibraryPermissionResponse>();

	useLayoutEffect(() => {
		(async () => {
			setPhotosPermission(await ImagePicker.requestMediaLibraryPermissionsAsync());
		})();
	}, []);

	const styles = StyleSheet.create({
		avatar: {
			marginBottom: Theme.spacing.md,
		},
		editIcon: {
			...Theme.util.flexCenter,
			width: 32,
			height: 32,
			backgroundColor: Theme.colors.primary,
			borderWidth: 3,
			borderColor: Theme.colors.background,
			borderRadius: 50,
			position: 'absolute',
			top: 0,
			right: 0,
		},
	});

	const updateProfilePic = async (uri: string | undefined) => {
		try {
			await changeProfilePicture.mutateAsync(uri);
			setCameraOpen(false);
		} catch (error) {
			alert(error);
		}
	};

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
				text: 'Remove Photo',
				onPress: () => updateProfilePic(undefined),
			},
			{
				text: 'Cancel',
			},
		]);
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

	return (
		<>
			<TouchableOpacity onPress={!imageIsProcessing ? onAvatarPress : null}>
				<StyledAvatar user={user} style={styles.avatar} />
				<View style={styles.editIcon}>
					<Pencil fill='white' width={15} height={15} />
				</View>
			</TouchableOpacity>
			<StyledCamera
				open={cameraOpen}
				onCapture={updateProfilePic}
				captureProcessing={imageIsProcessing}
				setCaptureProcessing={setImageIsProcessing}
				onClose={() => setCameraOpen(false)}
			/>
		</>
	);
}
