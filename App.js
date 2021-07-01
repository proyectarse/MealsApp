import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as firebase from 'firebase';

import {
	useFonts as useOswald,
	Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import { theme } from './src/infrastructure/theme';
import { Navigation } from './src/infrastructure/navigation';

import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import firebaseConf from './src/utils/firebase-data';

const firebaseConfig = firebaseConf;

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default function App() {
	const [oswaldLoaded] = useOswald({
		Oswald_400Regular,
	});

	const [latoLoaded] = useLato({
		Lato_400Regular,
	});

	if (!oswaldLoaded || !latoLoaded) {
		return null;
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<AuthenticationContextProvider>
					<Navigation />
				</AuthenticationContextProvider>
			</ThemeProvider>
			<ExpoStatusBar style="auto" />
		</>
	);
}
