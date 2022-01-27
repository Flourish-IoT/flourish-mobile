import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import { Theme } from '../../../providers/Theme';

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
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: 'white',
					padding: Theme.padding,
					borderTopLeftRadius: Theme.borderRadius,
					borderTopRightRadius: Theme.borderRadius,
					height: height,
				}}
			>
				<Text style={{ textAlign: 'center' }}>{title}</Text>
				<View style={{ width: '100%' }}>{content}</View>
				<View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>{actionItems}</View>
			</View>
		</Modal>
	);
}
