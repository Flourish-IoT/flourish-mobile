import React from 'react';
import { StyleSheet } from 'react-native';
import Logo from '../../lib/icons/Logo';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import Button from '../../lib/components/styled/Button';
import { Theme } from '../../providers/Theme';
import CurvedContainer, { TopToCurvedContainer } from '../../lib/components/layout/CurvedContainer';
import Typography from '../../lib/components/styled/Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface WelcomeScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
	return (
		<ScreenContainer appBarPadding={false} safePadding={false} style={styles.screenContainer}>
			<TopToCurvedContainer containerStyle={{ alignItems: 'center', paddingTop: 100 }}>
				<Logo style={{ height: 250, width: 250 }} />
				<Typography variant='h3bold' style={{ textAlign: 'center', color: 'white' }}>
					Plant care made easy.
				</Typography>
			</TopToCurvedContainer>
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
					<Typography variant='h3bold' style={{ textAlign: 'center', color: Theme.colors.cta }}>
						Log In
					</Typography>
				</TouchableOpacity>
			</CurvedContainer>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		justifyContent: 'center',
		backgroundColor: Theme.colors.darkBrown,
	},
});
