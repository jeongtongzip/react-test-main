import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function Domestic() {
  const [currentPerson, setCurrentPerson] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [domesticClicked, setDomesticClicked] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const handlePersonClick = (person) => {
    setCurrentPerson(person);
    setShowDescription(true);
    setTimeout(() => setShowDescription(false), 5000);
  };

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCapturedImage(uri);
      saveImageToGallery(uri);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const saveImageToGallery = async (uri) => {
    if (Platform.OS === 'android') {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Visioners', asset, false);
    } else {
      MediaLibrary.saveToLibraryAsync(uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <Text style={styles.link}>VISIONERS</Text>
        </Text>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => handlePersonClick("선애")}><Text>선애</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => handlePersonClick("효진")}><Text>효진</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => handlePersonClick("홍민")}><Text>홍민</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => handlePersonClick("유빈")}><Text>유빈</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.webcamContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
        />
        <View style={styles.hero}>
          <Text>규칙</Text>
          <Text>새로운 규칙2</Text>
          <Text>새로운 규칙3</Text>
          <Text>새로운 규칙4</Text>
        </View>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.captureButtonText}>촬영하기</Text>
        </TouchableOpacity>
      </View>
      {showDescription && (
        <View style={styles.personDescription}>
          <Text>{currentPerson}</Text>
          {currentPerson === "선애" && <Text>AI기능 개발을 담당하고 있어.</Text>}
          {currentPerson === "효진" && <Text>BackEnd 개발을 담당하고 있어.</Text>}
          {currentPerson === "홍민" && <Text>FrontEnd 개발을 담당하고 있어.</Text>}
          {currentPerson === "유빈" && <Text>FrontEnd 개발을 담당하고 있어.</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'abster',
  },
  link: {
    textDecorationLine: 'underline',
  },
  nav: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 20,
  },
  webcamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  hero: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'rgba(192, 88, 23, 0.8)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
  },
  personDescription: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
});
