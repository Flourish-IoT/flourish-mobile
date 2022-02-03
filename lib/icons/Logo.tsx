import React from 'react';
import { Image } from 'react-native';

export default function Logo({ style, ...rest }) {
	return <Image style={{ height: 150, width: 150, ...style }} {...rest} source={require('../assets/logo.png')} />;
}
