import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, AlertButton, StyleSheet, Image } from 'react-native';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../../lib/components/layout/ScreenContainer';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../../lib/components/styled/Button';
import { GlobalStackNavOptions, Theme } from '../../../providers/Theme';
import Typography from '../../../lib/components/styled/Typography';
import CurvedContainer, { TopToCurvedContainer } from '../../../lib/components/layout/CurvedContainer';
import { createStackNavigator } from '@react-navigation/stack';
import CenterMe from '../../../lib/components/CenterMe';
import SearchField from '../../../lib/components/SearchField';
import { PlantType, useAddPlant, usePlantTypes, useSinglePlantType } from '../../../data/garden';
import Loading from '../../../lib/components/Loading';
import Empty from '../../../lib/components/Empty';
import { AppName, filterData, getPlaceHolder } from '../../../lib/utils/helper';
import PlantTypeCard from './PlantTypeCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PotPlant from '../../../lib/icons/PotPlant';
import StyledTextInput from '../../../lib/components/styled/TextInput';
import StyledCamera from '../../../lib/components/styled/Camera';

interface StepProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

interface PlantTypeStepRouteProps {
	deviceId: number | undefined; // Will be available if coming straight from device pairing
}

const PlantTypeStep = ({ navigation, route }: StepProps) => {
	const routeProps = route.params as PlantTypeStepRouteProps;
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
					<Empty animation='error' size='lg' text='Failed to load plant types...' />
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
						onPress={() =>
							navigation.navigate('NameStep', { deviceId: routeProps.deviceId, plantTypeId: selected.id })
						}
						disabled={!selected}
					/>
				</CenterMe>
			</CurvedContainer>
		</ScreenContainer>
	);
};

interface NameStepRouteProps extends PlantTypeStepRouteProps {
	plantTypeId: number;
}

const NameStep = ({ navigation, route }: StepProps) => {
	const { plantTypeId, deviceId } = route.params as NameStepRouteProps;

	const [name, setName] = useState('New Plant');

	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<TopToCurvedContainer containerStyle={{ alignItems: 'center' }}>
				<PotPlant />
				<Typography variant='h3bold' style={{ marginBottom: Theme.spacing.md }}>
					Would you like to name your plant?
				</Typography>
				<StyledTextInput placeholder='Plant Name' onChangeText={setName} value={name} />
			</TopToCurvedContainer>

			<CurvedContainer containerStyle={styles.curvedContainer} circleStyle={styles.curvedCircleStyle}>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Select the type of plant that you are adding to your garden.
				</Typography>
				<CenterMe horizontal>
					<Button
						variant='primary'
						title='Done'
						onPress={() => navigation.navigate('ImageStep', { plantTypeId, deviceId, name })}
						disabled={name.trim().length === 0}
						buttonStyle={{ marginBottom: Theme.spacing.md }}
					/>
					<Button
						variant='text'
						title="I don't want to name my plant"
						onPress={() => navigation.navigate('ImageStep', { plantTypeId, deviceId, name: undefined })}
					/>
				</CenterMe>
			</CurvedContainer>
		</ScreenContainer>
	);
};

interface ImageStepRouteProps extends NameStepRouteProps {
	name: string;
}

const ImageStep = ({ navigation, route }: StepProps) => {
	const { deviceId, plantTypeId, name } = route.params as ImageStepRouteProps;
	const [imageUri, setImageUri] = useState<string | undefined>();
	const [imageIsProcessing, setImageIsProcessing] = useState(false);
	const [photosPermission, setPhotosPermission] = useState<ImagePicker.MediaLibraryPermissionResponse>();
	const [cameraOpen, setCameraOpen] = useState(false);

	useLayoutEffect(() => {
		(async () => {
			setPhotosPermission(await ImagePicker.requestMediaLibraryPermissionsAsync());
		})();
	}, []);

	const onTakePhotoPress = () => {
		const options: AlertButton[] = [
			{
				text: 'Camera',
				onPress: () => setCameraOpen(true),
			},
			{
				text: 'Photos',
				onPress: openPhotos,
			},
			{
				text: 'Cancel',
				style: 'cancel',
			},
		];

		// If there's a photo, add remove option
		!!imageUri &&
			options.splice(options.length - 1, 0, {
				text: 'Remove Photo',
				style: 'destructive',
				onPress: () => setImageUri(undefined),
			});

		Alert.alert('Select photo...', undefined, options);
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
			setImageUri(
				// @ts-ignore: This is correct
				photo.uri
			);
		}

		setImageIsProcessing(false);
	};

	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<TopToCurvedContainer containerStyle={{ alignItems: 'center' }}>
				<PotPlant />
				<Typography variant='h3bold' style={{ marginBottom: Theme.spacing.md }}>
					Would you like to add a picture of your plant?
				</Typography>
			</TopToCurvedContainer>

			<CurvedContainer containerStyle={styles.curvedContainer} circleStyle={styles.curvedCircleStyle}>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Select the type of plant that you are adding to your garden.
				</Typography>
				<CenterMe horizontal>
					<Button
						variant='primary'
						title='Add Picture'
						onPress={onTakePhotoPress}
						buttonStyle={{ marginBottom: Theme.spacing.md }}
					/>
					<Button
						variant='text'
						title="I don't want to add a picture of my plant"
						onPress={() => navigation.navigate('SuccessStep', { plantTypeId, deviceId, name, imageUri: undefined })}
						disabled={name.trim().length === 0}
					/>
				</CenterMe>
			</CurvedContainer>

			<StyledCamera
				open={cameraOpen}
				onCapture={(imageUri) => {
					setImageUri(imageUri);
					navigation.navigate('SuccessStep', { plantTypeId, deviceId, name, imageUri });
					setCameraOpen(false);
				}}
				captureProcessing={imageIsProcessing}
				setCaptureProcessing={setImageIsProcessing}
				onClose={() => setCameraOpen(false)}
			/>
		</ScreenContainer>
	);
};

interface SuccessStepRouteProps extends ImageStepRouteProps {
	imageUri: string | undefined;
}

const SuccessStep = ({ navigation, route }: StepProps) => {
	const { name, plantTypeId, deviceId, imageUri } = route.params as SuccessStepRouteProps;
	const { data: plantType } = useSinglePlantType(plantTypeId);
	const addPlant = useAddPlant();

	useEffect(() => {
		try {
			addPlant.mutateAsync({ name, plantTypeId, deviceId, image: imageUri });
			navigation.navigate('Garden');
		} catch (error) {
			Alert.alert('Failed to add plant', error);
			navigation.goBack();
		}
	}, []);

	if (addPlant.isError) return null;

	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<TopToCurvedContainer containerStyle={{ alignItems: 'center' }}>
				<Image source={imageUri ? { uri: imageUri } : getPlaceHolder('plant')} style={styles.plantImage} />
				<Typography variant='h3bold' style={{ marginTop: Theme.spacing.md }}>
					{name}
				</Typography>
				{!!plantType && (
					<Typography variant='paragraph' style={{ marginTop: Theme.spacing.md }}>
						{plantType.scientificName}
					</Typography>
				)}
			</TopToCurvedContainer>

			<CurvedContainer containerStyle={styles.curvedContainer} circleStyle={styles.curvedCircleStyle}>
				<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
					Congrats! {name} has been added to your garden!
				</Typography>
				<CenterMe horizontal>
					<Button variant='primary' title='Done' onPress={() => navigation.navigate('Garden')} />
				</CenterMe>
			</CurvedContainer>
		</ScreenContainer>
	);
};

const Stack = createStackNavigator();

export default function AddPlantStack({ navigation, route }: StepProps) {
	const routeParams = route.params as PlantTypeStepRouteProps;

	return (
		<Stack.Navigator
			initialRouteName='PlantTypeStep'
			screenOptions={{
				...GlobalStackNavOptions,
				cardStyle: {
					backgroundColor: Theme.colors.background,
				},
			}}
		>
			<Stack.Screen name='PlantTypeStep' component={PlantTypeStep} initialParams={routeParams} />
			<Stack.Screen name='NameStep' component={NameStep} />
			<Stack.Screen name='ImageStep' component={ImageStep} />
			<Stack.Screen name='SuccessStep' component={SuccessStep} />
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
	plantImage: {
		width: 200,
		height: 200,
		borderRadius: 1000,
	},
});
