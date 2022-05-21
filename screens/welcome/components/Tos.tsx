import React from 'react';
import { TextStyle } from 'react-native';
import Typography from '../../../lib/components/styled/Typography';

interface TosProps {
	style?: TextStyle;
}

export default function Tos({ style }: TosProps) {
	return (
		<Typography variant='paragraph' {...style}>
			By continuing you accept our <Typography variant='link'>Privacy Policy</Typography>,{' '}
			<Typography variant='link'>Terms of Service</Typography>, and{' '}
			<Typography variant='link'>Subscription Policy</Typography>
		</Typography>
	);
}
