import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// Uncomment when you add appicon.lottie file
 import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Uncomment these lines when you add appicon.lottie file to src/assets/lotties/
const LOTTIE_SOURCE = require('../assets/lotties/appicon.json');

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  // Set to true when you add the lottie file and uncomment the imports above
 const showLottie = true;


  useEffect(() => {
    // Get user from AsyncStorage 
    // Navigate to Home or Login after 3 seconds
    const timer = setTimeout(async () => {  
      const user = await AsyncStorage.getItem('user');
      if (user) navigation.replace('Home');
      else navigation.replace('Login');
    }, 1500);
    return () => clearTimeout(timer);
    
  }, [navigation]);

  return (
    <View style={styles.container}>
      {showLottie ? (
        // Uncomment when you add appicon.lottie file
        <LottieView
          source={LOTTIE_SOURCE}
          autoPlay
          loop
          style={styles.lottie}
          onAnimationFailure={() => {
            console.log('Lottie animation failed');
          }}
        />
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>App Icon</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA'
  },
  lottie: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 20,
  },
  fallbackContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  fallbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

