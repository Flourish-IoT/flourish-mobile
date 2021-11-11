import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function HomeScreen({ navigation }) {
    useLayoutEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { photosPermission } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const { cameraPermission } = await Camera.requestPermissionsAsync();
            }
        })();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>Welcome Home!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: 'black'
    }
});