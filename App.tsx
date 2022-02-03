import React from 'react';
import AppProviders from './providers';
import Navigation from './navigation';

// initAxios(); // TODO: Enable when backend supports authentication

export default function App() {
	return (
		<AppProviders>
			<Navigation />
		</AppProviders>
	);
}
