import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Typography from '../../lib/components/styled/Typography';
import TopTabContainer from '../../lib/components/TopTabContainer';

interface FriendsTabProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function FriendsTab({ navigation }: FriendsTabProps) {
	return (
		<TopTabContainer>
			<Typography variant='body'>Friends Tab Content</Typography>
		</TopTabContainer>
	);
}
