import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Typography from '../../lib/components/styled/Typography';
import TopTabContainer from '../../lib/components/TopTabContainer';

interface BadgesTabProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function BadgesTab({ navigation }: BadgesTabProps) {
	return (
		<TopTabContainer>
			<Typography variant='body'>Badges Tab Content</Typography>
		</TopTabContainer>
	);
}
