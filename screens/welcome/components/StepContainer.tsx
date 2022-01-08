import React from 'react';
import { View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Chevron from '../../../lib/icons/Chevron';

interface StepContainerProps {
	canGoBack?: boolean;
	style?: ViewStyle;
	children?: React.ReactNode;
	navigation?: NavigationProp<ParamListBase>;
}

export default function StepContainer({ children, navigation, canGoBack = true, style = {}, ...rest }: StepContainerProps) {
	return (
		<View
			{...rest}
			style={{
				flex: 1,
				backgroundColor: 'transparent',
				...style,
			}}
		>
			{canGoBack && (
				<View
					style={{
						width: '100%',
						height: 50,
					}}
				>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'black',
						}}
					>
						<Chevron
							width={20}
							height={20}
							style={{ transform: [{ rotate: '-90deg' }, { translateY: -1.5 }] }}
							fill='white'
						/>
					</TouchableOpacity>
				</View>
			)}

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{children}</View>
		</View>
	);
}
