import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture, CameraView } from 'expo-camera';

export function ScanPM() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (photo) {
      console.log('Foto capturada:', photo);
    }
  }, [photo]);

  if (hasPermission === null) {
    return <View />;
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={() => Camera.requestCameraPermissionsAsync()} title="Grant permission" />
      </View>
    );
  }

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const capturedPhoto: CameraCapturedPicture = await cameraRef.current!.takePictureAsync({
          base64: true,
          quality: 1.0, // Melhor qualidade possível
        });
        setPhoto(`${capturedPhoto.base64}`);
      } catch (error) {
        console.error('Erro ao capturar a foto:', error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={capturePhoto}>
            <Text style={styles.text}>Capture Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
