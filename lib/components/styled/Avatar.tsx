import { ViewStyle } from 'react-native';
import { Avatar } from 'react-native-paper';
import { User } from '../../../data/user';

export interface StyledAvatarProps {
	user: User;
	size?: number;
	style?: ViewStyle;
}

export default function StyledAvatar({ user, size = 110, style }: StyledAvatarProps) {
	return !!user.image ? (
		<Avatar.Image size={size} source={{ uri: user.image }} style={style} />
	) : (
		<Avatar.Text size={size} label={user.username[0].toUpperCase()} style={style} />
	);
}
