import { ViewStyle } from 'react-native';
import { Avatar } from 'react-native-paper';
import { User } from '../../../data/user';

interface StyledAVatarProps {
	user: User;
	size?: number;
	style?: ViewStyle;
}

export default function StyledAvatar({ user, size = 110, style }: StyledAVatarProps) {
	if (!!user.image) return <Avatar.Image size={size} source={{ uri: user.image }} style={style} />;
	return <Avatar.Text size={size} label={user.username[0].toUpperCase()} style={style} />;
}
