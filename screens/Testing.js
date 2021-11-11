import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Button, TouchableOpacity } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import axios from 'axios';

export default function TestingScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [endPointIsLoading, setEndPointIsLoading] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { photosPermission } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const { cameraPermission } = await Camera.requestPermissionsAsync();
            }
        })();
    }, [navigation]);

    const openPhotos = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const hitEndpoint = () => {
        setEndPointIsLoading(true);

        axios.get('/flourish-test').then((res) => {
            alert(JSON.stringify(res.data));
        }).catch((error) => {
            alert(error.message);
        }).finally(() => {
            setEndPointIsLoading(false);
        });
    };

    return (
        <View style={styles.container}>
            <Image source={image ? { uri: image } : require('../assets/placehold-200-2.png')} style={{ width: 200, height: 200, marginBottom: 10 }} />
            <Button style={styles.button} onPress={openPhotos} raised title='Select Photo' />
            <Button style={styles.button} onPress={hitEndpoint} loading={endPointIsLoading} raised title='Hit AWS Endpoint' />
            {/* <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity
                        style={styles.camButton}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity> */}
            {/* </View> */}
            {/* </Camera >} */}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button: {
        width: 200
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        width: 200
    },
    camButton: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});;