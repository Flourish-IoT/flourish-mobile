import { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { User } from '../../../data/user';

export interface StyledAvatarProps {
	user: User;
	onPress?: () => void;
	size?: number;
	style?: ViewStyle;
}

export default function StyledAvatar({ user, onPress, size = 110, style }: StyledAvatarProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			{!!user.image ? (
				<Avatar.Image size={size} source={{ uri: user.image }} style={style} />
			) : (
				<Avatar.Text size={size} label={user.username[0].toUpperCase()} style={style} />
			)}
		</TouchableOpacity>
	);
}
