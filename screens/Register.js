import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        });
    }, [navigation]);

    const register = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        });
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />

            <Text h3 style={{ marginBottom: 50 }}>
                Create a {require('../app.json').expo.name} account
            </Text>

            <View style={styles.inputContainer}>
                <Input placeholder='Name' autoFocus type='text' value={name} onChangeText={setName} />
                <Input placeholder='Email' type='text' value={email} onChangeText={setEmail} />
                <Input placeholder='Password' type='password' secureTextEntry value={password} onChangeText={setPassword} />
                <Button onPress={register} raised title='Register' />
            </View>

            {/* Spacer */}
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: '85%'
    },
});