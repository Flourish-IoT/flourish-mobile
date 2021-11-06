import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function HomeScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Logout'
        });
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

    return (
        <View style={styles.container}>
            <Image source={image ? { uri: image } : require('../assets/placehold-200.png')} style={{ width: 200, height: 200, marginBottom: 10 }} />
            <Button onPress={openPhotos} raised title='Select Photo' />
            {/* <Camera type={type} sx={{ height: 50 }} >
                <View sx={{ height: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text>Flip</Text>
                    </TouchableOpacity>
                </View>
            </Camera> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    }
});;