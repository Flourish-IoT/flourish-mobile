import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Logo from '../lib/icons/Logo';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        });
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            {/* <Image
                source={require('../assets/logo.png')}
                style={{ width: 125, height: 125 }}
            /> */}
            <Logo />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' type='email' value={email} onChangeText={setEmail} />
                <Input placeholder='Password' secureTextEntry type='password' value={password} onChangeText={setPassword} />
                <Button containerStyle={styles.button} onPress={signIn} title='Login' />
                <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} title='Register' type='outline' />
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
        backgroundColor: 'white',
        shadowColor: 'black'
    },
    inputContainer: {
        width: '85%'
    },
    button: {
        marginTop: 10
    }
});