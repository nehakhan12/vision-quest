import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
const BOX_SIZE = width * 0.7;
const NINJA_SIZE = 50;

export default function NinjaFocusScreen() {
  const ninjaPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [level, setLevel] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [timer, setTimer] = useState(10);

  const levels = {
    easy: 1500,
    medium: 800,
    hard: 400,
  };

  useEffect(() => {
    let interval;
    if (gameRunning && level) {
      let count = 10;
      setTimer(count);
      interval = setInterval(() => {
        count -= 1;
        setTimer(count);
        if (count <= 0) {
          clearInterval(interval);
          setGameRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameRunning, level]);

  useEffect(() => {
    if (gameRunning) {
      const moveNinja = () => {
        const max = BOX_SIZE - NINJA_SIZE;
        Animated.timing(ninjaPosition, {
          toValue: {
            x: Math.random() * max,
            y: Math.random() * max,
          },
          duration: levels[level],
          useNativeDriver: true,
        }).start(() => {
          if (gameRunning) moveNinja();
        });
      };
      moveNinja();
    }
  }, [gameRunning]);

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameRunning(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NINJA HUNT</Text>
      <Text style={styles.subtitle}>TRACK DOWN THE NINJA</Text>

      <View style={styles.box}>
        <Animated.Image
          source={require('../../assets/images/ninja.png')} 
          style={[styles.ninja, { transform: ninjaPosition.getTranslateTransform() }]}
        />
      </View>

      <Text style={styles.subtitle}>FOLLOW THE NINJA WITH YOUR EYES</Text>

      {!gameRunning ? (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.startButton} onPress={() => startGame('easy')}>
            <Text style={styles.startText}>START</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.timer}>{timer}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5e1a22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'monospace',
    marginVertical: 10,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 5,
    borderColor: 'white',
    marginVertical: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  ninja: {
    width: NINJA_SIZE,
    height: NINJA_SIZE,
    position: 'absolute',
  },
  buttons: {
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#f6c344',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  startText: {
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timer: {
    color: 'white',
    fontSize: 36,
    marginTop: 20,
    fontFamily: 'monospace',
  },
});
