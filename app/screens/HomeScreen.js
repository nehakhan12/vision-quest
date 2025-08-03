import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Link } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    PressStart2P: PressStart2P_400Regular,
  });

  const leftArrowAnim = useRef(new Animated.Value(0)).current;
  const rightArrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  // Left arrow animation (starts immediately)
  Animated.loop(
    Animated.sequence([
      Animated.timing(leftArrowAnim, {
        toValue: 10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(leftArrowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ])
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(rightArrowAnim, {
        toValue: 10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rightArrowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);


  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.overlay}>
      <Image
        source={require('../../assets/images/stars-header.png')}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>VISION QUEST</Text>
      <Text style={styles.subtitle}>MAKE SURE THAT YOUR KIDS CAN SEE THE FUTURE</Text>
      <Image
        source={require('../../assets/images/friends-icon.png')}
        style={styles.friendsImage}
        resizeMode="contain"
      />

      <View style={styles.buttonRow}>
        <Animated.Image
          source={require('../../assets/images/yellow-arrow.png')}
          style={[
            styles.arrow,
            { transform: [
              { translateX: leftArrowAnim },             
              { scaleX: -1 },
              ]},
          ]}
          resizeMode="contain"
        />
        <Link href="/TestSelection" asChild>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../../assets/images/start-btn.png')}
              style={styles.startBtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Link>
        <Animated.Image
          source={require('../../assets/images/yellow-arrow.png')}
          style={[
            styles.arrow,
            {
              transform: [
                { translateX: rightArrowAnim },
              ],
            },
          ]}
          resizeMode="contain"
        />
      </View>

      <Link href="/About" asChild>
        <TouchableOpacity style={styles.aboutButton}>
          <Image
            source={require('../../assets/images/about-btn.png')}
            style={styles.aboutBtn}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Link>

      
    </View>
    
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#b8e0d2',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  headerImage: {
    width: '170%',
    height: 80,
    marginTop: 30,
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 22,
    color: '#fee761',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: '#f77722',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
    lineHeight: 40,
    letterSpacing: -2,
  },
  subtitle: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 0,
    lineHeight: 15,
    letterSpacing: -1,
  },
  friendsImage: {
    width: '80%',
    marginTop: -20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
  },
  startBtn: {
    width: 180,
    height: 70,
  },
  arrow: {
    width: 50,
    height: 50,
    margin: 10,
  },
  aboutButton: {
  marginTop: 10,
  alignItems: 'center',
},
aboutBtn: {
  width: 150,
  height: 60,
},

});
