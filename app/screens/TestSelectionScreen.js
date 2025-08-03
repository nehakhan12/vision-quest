import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function TestSelectionScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={require('../../assets/images/green-cloud.png')}
          style={styles.cloudImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>TESTZZZ</Text>
        <Image
          source={require('../../assets/images/green-cloud.png')}
          style={styles.cloudImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.cardsRow}>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/images/color-pattern.png')}
            style={styles.cardImage1}
            resizeMode="contain"
          />
          <Text style={styles.cardLabel}>Color Quest</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cardCenter}>
        <Image
          source={require('../../assets/images/letter-hunt-card.png')}
          style={styles.cardImage2}
          resizeMode="contain"
        />
        <Text style={styles.cardLabel}>Letter Hunt</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/brick-footer.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8e0d2',
    paddingTop: 40,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  cloudImage: {
    width: 120,
    height: 100,
    marginTop: -15,
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 20,
    color: 'white',
    marginTop: 30,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 70,
    marginTop: 30,
  },
  card: {
    alignItems: 'center',
    width: 150,
  },
  cardCenter: {
    alignItems: 'center',
    width: 150,
    marginBottom: 50,
  },
  cardImage1: {
    width: 140,
    height: 140,
    marginBottom: 10,
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 50 },
    shadowOpacity: 0.4,
    shadowRadius: 0,
  },
  cardImage2: {
    width: 140,
    height: 140,
    marginBottom: 10,
    shadowColor: 'black', 
    shadowOffset: { width: 20, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 0,
  },
  cardLabel: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#3d3b52',
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: '140%',
    height: 50,
  },
});
