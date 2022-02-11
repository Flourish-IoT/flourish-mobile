import React from 'react';
import Logo from '../../lib/icons/Logo';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/ScreenContainer';
import Button from '../../lib/components/styled/Button';
import { Theme } from '../../providers/Theme';
import CurvedContainer from './components/CurvedContainer';
import { View } from 'react-native';
import Typography from '../../lib/components/styled/Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface WelcomeScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
	return (
		<ScreenContainer
			appBarPadding={false}
			safePadding={false}
			style={{
				justifyContent: 'center',
				backgroundColor: Theme.colors.accent,
			}}
		>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<Logo style={{ height: 250, width: 250 }} />
				<Typography variant='heading3Bold' style={{ textAlign: 'center', color: 'white' }}>
					Plant care made easy.
				</Typography>
			</View>
			<CurvedContainer>
				<Button
					variant='primary'
					buttonStyle={{ marginBottom: Theme.spacing.xl }}
					onPress={() => navigation.navigate('SignUp')}
					title='Sign Up'
				/>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Typography variant='body' style={{ textAlign: 'center' }}>
						Already have an account?
					</Typography>
					<Typography variant='heading3Bold' style={{ textAlign: 'center', color: Theme.colors.cta }}>
						Log In
					</Typography>
				</TouchableOpacity>
			</CurvedContainer>
		</ScreenContainer>
	);
}
