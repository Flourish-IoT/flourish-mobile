import React, { useLayoutEffect, } from 'react';
import { Platform, Linking, CameraRoll, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Logout'
        });
    }, [navigation]);

    const openPhotos = () => {
        switch (Platform.OS) {
            case 'ios':
                Linking.openURL('photos-redirect://');
                break;
            case 'android':
                Linking.openURL('content://media/internal/images/media');
                break;
            default:
                alert('Could not open gallery app');
        }
    };

    return (
        <Button onPress={openPhotos} raised title='Select Photo' />
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
});