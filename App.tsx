import React from 'react';
import AppProviders from './providers';
import Navigation from './navigation';

export default function App() {
	return (
		<AppProviders>
			<Navigation />
		</AppProviders>
	);
}
