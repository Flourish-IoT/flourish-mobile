import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/routers';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { TextInput } from 'react-native-paper';
import { Theme, GlobalStackNavOptions } from '../../providers/Theme';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { logOut } from '../../data/auth';
import ChangePasswordScreen from './ChangePassword';
import DeleteAccountScreen from './DeleteAccount';
import StyledTextInput from '../../lib/components/styled/TextInput';
import { useChangeEmail, useChangeUsername, useExportData, useMe } from '../../data/user';
import Loading from '../../lib/components/Loading';
import { isValidEmail, isValidUsername } from '../../lib/utils/validation';
import Button from '../../lib/components/styled/Button';
import SegmentedList from '../../lib/components/styled/SegmentedList';
import Typography from '../../lib/components/styled/Typography';
import ProfilePicture from './components/ProfilePicture';

interface ProfileScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const ProfileIndex = ({ navigation }: ProfileScreenProps) => {
	const { data: user, isLoading: userIsLoading } = useMe();

	useEffect(() => {
		setUsername(user.username);
		setEmail(user.email);
	}, [user]);

	// Username
	const [username, setUsername] = useState(user.username);
	const changeUsername = useChangeUsername();
	const usernameChanged = username !== user.username;
	const updateUsername = () => {
		try {
			changeUsername.mutateAsync(username);
			Keyboard.dismiss();
			alert('Updated.');
		} catch (error) {
			alert(`Failed to update username: ${error}`);
		}
	};

	// Email
	const [email, setEmail] = useState(user.email);
	const changeEmail = useChangeEmail();
	const emailChanged = email !== user.email;
	const updateEmail = () => {
		try {
			changeEmail.mutateAsync(email);
			Keyboard.dismiss();
			alert('Updated.');
		} catch (error) {
			alert(`Failed to update email: ${error}`);
		}
	};

	// Export Data
	const exportData = useExportData();
	const onExportDataBtnPress = () => {
		Alert.alert(
			'Export Data?',
			`This will send an email to "${user.email}" with a spreadsheet containing all the data related to your profile.`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Send',
					onPress: async () => {
						try {
							await exportData.mutateAsync();
							Alert.alert(
								'Request Received',
								`We will send an email to "${user.email}". Please wait a few minutes and be sure to check your spam or junk folders.`
							);
						} catch (error) {
							alert(error);
						}
					},
				},
			]
		);
	};

	// Logout
	const onLogOutBtnPress = () => {
		Alert.alert('Are your sure?', 'You are about to log out.', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Yes',
				style: 'destructive',
				onPress: logOut,
			},
		]);
	};

	if (userIsLoading) return <Loading animation='rings' />;

	return (
		<ScreenContainer scrolls style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
			<View style={{ ...Theme.util.flexCenter, width: '100%', marginBottom: Theme.spacing.md }}>
				<ProfilePicture user={user} />
				<Typography variant='heading3Bold'>{user.username}</Typography>
			</View>
			<Typography variant='heading3Bold' style={{ marginBottom: Theme.spacing.md }}>
				General
			</Typography>
			{
				<SegmentedList style={{ marginBottom: Theme.spacing.md }}>
					<StyledTextInput
						label='Display Name'
						value={username}
						error={!isValidUsername(username)}
						onChangeText={setUsername}
						right={
							usernameChanged ? (
								<TextInput.Icon name='content-save' onPress={updateUsername} />
							) : (
								<TextInput.Icon name='pencil' />
							)
						}
					/>
					<StyledTextInput
						label='Email'
						value={email}
						error={!isValidEmail(email)}
						onChangeText={setEmail}
						right={
							emailChanged ? (
								<TextInput.Icon name='content-save' onPress={updateEmail} />
							) : (
								<TextInput.Icon name='pencil' />
							)
						}
					/>
					<Button variant='in-list' title='FAQ' />
				</SegmentedList>
			}
			<Typography variant='heading3Bold' style={{ marginBottom: Theme.spacing.md }}>
				Data
			</Typography>
			<SegmentedList style={{ marginBottom: Theme.spacing.md }}>
				<Button variant='in-list' onPress={onExportDataBtnPress} title='Export Data' />
			</SegmentedList>
			<Typography variant='heading3Bold' style={{ marginBottom: Theme.spacing.md }}>
				Account
			</Typography>
			<SegmentedList style={{ marginBottom: Theme.spacing.md }}>
				<Button variant='in-list' onPress={() => navigation.navigate('ChangePassword')} title='Change Password' />
				<Button variant='in-list' onPress={onLogOutBtnPress} title='Log Out' />
				<Button
					onPress={() => navigation.navigate('DeleteAccount')}
					variant='in-list'
					textStyle={{ color: Theme.colors.error }}
					title='Delete Account'
				/>
			</SegmentedList>
		</ScreenContainer>
	);
};

const Stack = createStackNavigator();

export default function ProfileScreenStack() {
	return (
		<Stack.Navigator
			screenOptions={{ ...GlobalStackNavOptions, presentation: 'modal', headerShown: true, headerLeft: null }}
			initialRouteName='ProfileIndex'
		>
			<Stack.Screen name='ProfileIndex' component={ProfileIndex} options={{ headerShown: false }} />
			<Stack.Screen name='ChangePassword' options={{ title: 'Change Password' }} component={ChangePasswordScreen} />
			<Stack.Screen name='DeleteAccount' options={{ title: 'Delete Account' }} component={DeleteAccountScreen} />
		</Stack.Navigator>
	);
}
