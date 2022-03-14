import React, { Children, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '../../../providers/Theme';

interface SegmentedListProps {
	children?: ReactNode;
	containerStyle?: ViewStyle;
}

export default function SegmentedList({ children, containerStyle, ...rest }: SegmentedListProps) {
	return (
		<View style={{ ...styles.container, ...containerStyle }}>
			{Children.toArray(children).map((item, index, { length }) => {
				const isFirst = index === 0;
				const isLast = index === length - 1;

				return (
					<View
						key={index}
						style={{
							...styles.listItem,
							...(!isLast && { borderBottomWidth: 1, borderColor: Theme.colors.disabled }),
							...(isFirst && { borderTopLeftRadius: Theme.borderRadius, borderTopRightRadius: Theme.borderRadius }),
							...(isLast && {
								borderBottomLeftRadius: Theme.borderRadius,
								borderBottomRightRadius: Theme.borderRadius,
							}),
						}}
						{...rest}
					>
						{item}
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		...Theme.shadow,
	},
	divider: {
		width: '100%',
		minHeight: 3,
	},
	listItem: {
		width: '100%',
		height: 65,
		backgroundColor: 'white',
		overflow: 'hidden',
	},
});
