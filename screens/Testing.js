import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useTestEndpoint } from '../data/common';
import Loading from '../lib/components/Loading';
import Theme from '../lib/theme';

export default function TestingScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState();
    const [imageIsProcessing, setImageIsProcessing] = useState(false);
    const { data: testData, isLoading: testDataIsLoading } = useTestEndpoint();
    const [photosPermission, setPhotosPermission] = useState();
    const [cameraPermission, setCameraPermission] = useState();

    useLayoutEffect(() => {
        (async () => {
            setPhotosPermission(await ImagePicker.requestMediaLibraryPermissionsAsync());
            setCameraPermission(await Camera.requestPermissionsAsync());
        })();
    }, [navigation]);

    const openPhotos = async () => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!photo.cancelled) {
            setImage(photo.uri);
        }
    };

    const toggleCamera = () => {
        if (!cameraPermission) return alert(`You must allow ${require('../app.json').expo.name} to access photos to do this.`);

        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back);
    };

    const takePicture = async () => {
        if (!cameraRef) return;
        setImageIsProcessing(true);
        let photo = await cameraRef.takePictureAsync();

        if (cameraType === Camera.Constants.Type.front) {
            photo = await manipulateAsync(
                photo.localUri || photo.uri,
                [
                    { rotate: 180 },
                    { flip: FlipType.Vertical },
                ],
                { compress: 1, format: SaveFormat.PNG }
            );
        }

        setImage(photo.uri);
        setImageIsProcessing(false);
    };

    if (testDataIsLoading) return <Loading />;

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 10 }}>Your Plants</Text>
            <View style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
                backgroundColor: Theme.colors.gray_1,
                borderRadius: 10,
                overflow: 'hidden'
            }}>
                <Image
                    source={image ? { uri: image } : require('../assets/placeholder-profile.png')}
                    style={{ width: 150, height: 150 }} />
                <View style={{ padding: 10 }}>
                    <Text>Name: {testData.plant.name}</Text>
                    <Text>ID: {testData.plant.id}</Text>
                    <Text>Sensor ID: {testData.sensorId}</Text>
                    <Text>Light: {testData.lux}</Text>
                    <Text>Water: {testData.soilMoisture}</Text>
                    <Text>Temp: {testData.temperature}</Text>
                </View>
            </View>
            <Button style={styles.button} onPress={openPhotos} raised title='Select Photo' />
            <View style={{ width: '100%', height: 350 }} >
                <Camera
                    type={cameraType}
                    style={{ flex: 1 }}
                    ref={ref => {
                        setCameraRef(ref);
                    }}
                >
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            alignSelf: 'flex-end',
                        }}
                        onPress={toggleCamera}
                    >
                        <Ionicons
                            name='ios-camera-reverse'
                            style={{ color: 'white', fontSize: 40 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            alignSelf: 'center',
                            opacity: imageIsProcessing ? 0.2 : 1
                        }}
                        disabled={imageIsProcessing}
                        onPress={takePicture}
                    >
                        <Ionicons
                            name='radio-button-on'
                            style={{ color: 'white', fontSize: 80 }}
                        />
                    </TouchableOpacity>
                </Camera>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 16,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginBottom: 10
    },
});;