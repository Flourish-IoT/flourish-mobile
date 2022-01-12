import React, { ReactNode } from 'react';
import { Modal, View, Text } from 'react-native';

interface ModalProps {
	visible: boolean;
	onClose: () => void;
	title: string;
	content: ReactNode;
	actionItems: ReactNode;
}

export default function OurModal({ visible, onClose, title, content, actionItems }: ModalProps) {
	return (
		<Modal animationType='slide' visible={visible} onRequestClose={onClose}>
			<View
				style={{
					flex: 1,
					padding: '10%',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Text style={{ textAlign: 'center' }}>{title}</Text>
				<View>{content}</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
					}}
				>
					{actionItems}
				</View>
			</View>
		</Modal>
	);
}
