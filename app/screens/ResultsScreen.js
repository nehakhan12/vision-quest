import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ResultsScreen() {
  const data = {
    labels: ['Letter Hunt', 'Color Quest'],
    datasets: [
      {
        data: [5, 4], 
        colors: [
          () => '#cbe76d', // Greenish for "Letter Hunt"
          () => '#ffe153', // Yellow for "Color Quest"
        ],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FINAL ANALYSIS</Text>
      <Text style={styles.subtitle}>
        HERES THE RESULT BASED ON THE GAMES YOU PLAYED
      </Text>
      <View style={styles.chartWrapper}>
        <BarChart
            data={data}
            width={screenWidth - 40}
            height={220}
            fromZero
            withInnerLines={false}
            showBarTops={false}
            flatColor={true}
            chartConfig={{
            backgroundGradientFrom: '#6b699e',
            backgroundGradientTo: '#6b699e',
            fillShadowGradientOpacity: 1,
            color: () => '#cbe76d',
            labelColor: () => '#ffffff',
            barPercentage: 0.5,
            }}
            style={styles.chart}
        />
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#6b699e',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    color: '#dfc3ff',
  },
  subtitle: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  chart: {
    borderRadius: 8,
  },
  chartWrapper: {
  borderWidth: 3,
  borderColor: '#d9e6f2', 
  borderRadius: 8,
  padding: 0,
  backgroundColor: '#6b699e',
  marginBottom: 20,
},

});
