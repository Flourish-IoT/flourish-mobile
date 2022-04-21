import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Theme } from '../../../providers/Theme';
import Typography from '../styled/Typography';

interface ModalProps {
	visible: boolean;
	onClose: () => void;
	title: string;
	content: ReactNode;
	actionItems?: ReactNode;
	height?: string | number;
}

export default function StyledModal({ visible, onClose, title, content, actionItems, height, ...rest }: ModalProps) {
	return (
		<Modal
			testID={'modal'}
			isVisible={visible}
			onSwipeComplete={onClose}
			swipeDirection={['down']}
			style={{ justifyContent: 'flex-end', margin: 0 }}
			{...rest}
		>
			<View
				style={{
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: 'white',
					padding: Theme.spacing.md,
					borderTopLeftRadius: Theme.borderRadius,
					borderTopRightRadius: Theme.borderRadius,
					height: height,
				}}
			>
				<Typography variant='h3bold' style={{ textAlign: 'center' }}>
					{title}
				</Typography>
				<View style={{ width: '100%' }}>{content}</View>
				<View style={{ flexDirection: 'row', width: '100%' }}>{actionItems}</View>
			</View>
		</Modal>
	);
}
