import React, { useEffect, useState, useRef, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '../../../components/typography/text.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const ProfileCamera = styled(Camera)`
	width: 100%;
	height: 100%;
`;

const InnerSnap = styled.View`
	width: 100%;
	height: 100%;
	z-index: 999;
`;

export const CameraScreen = ({ navigation }) => {
	const { user } = useContext(AuthenticationContext);

	const [hasPermission, setHasPermission] = useState(null);

	const cameraRef = useRef();

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const snap = async () => {
		console.log('antes ref');
		if (cameraRef) {
			console.log('toma la foto');
			const photo = await cameraRef.current.takePictureAsync();
			console.log('toma la foto', photo);
			AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
			navigation.goBack();
		}
	};

	return (
		<ProfileCamera
			ref={(camera) => (cameraRef.current = camera)}
			type={Camera.Constants.Type.front}
		>
			<TouchableOpacity onPress={snap}>
				<InnerSnap />
			</TouchableOpacity>
		</ProfileCamera>
	);
};
