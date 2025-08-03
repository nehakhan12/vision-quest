import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const questions = [
  { question: 'Which letter is on the top left?', answer: 'F', options: ['F', 'P', 'Z'], difficulty: 'easy' },
  { question: 'Which letters are on the second line?', answer: 'T Z', options: ['T Z', 'E C', 'D F'], difficulty: 'easy' },
  { question: 'Which line has the letter Z?', answer: 'Line 2', options: ['Line 2', 'Line 4', 'Line 5'], difficulty: 'easy' },
  { question: 'Which of these is NOT on the third line?', answer: 'Z', options: ['E', 'C', 'Z'], difficulty: 'easy' },
  { question: 'What’s the last letter on the bottom row?', answer: 'C', options: ['C', 'D', 'F'], difficulty: 'hard' },
  { question: 'What comes after the letter E on the bottom line?', answer: 'F', options: ['F', 'P', 'L'], difficulty: 'hard' },
  { question: 'How many letters are on the third row?', answer: '4', options: ['2', '3', '4'], difficulty: 'hard' },
  { question: 'Which line is the longest?', answer: 'Bottom', options: ['Top', 'Middle', 'Bottom'], difficulty: 'hard' },
];

export default function LetterHuntScreen() {
  const navigation = useNavigation();
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [correctSound, setCorrectSound] = useState(null);
  const [wrongSound, setWrongSound] = useState(null);
  const scale = new Animated.Value(1);

  const filtered = questions.filter((q) => q.difficulty === difficulty);

  useEffect(() => {
    const loadSounds = async () => {
      const correct = new Audio.Sound();
      const wrong = new Audio.Sound();
      try {
        await correct.loadAsync(require('../../assets/correct.mp3'));
        await wrong.loadAsync(require('../../assets/wrong.mp3'));
        setCorrectSound(correct);
        setWrongSound(wrong);
      } catch (error) {
        console.error('Sound load error:', error);
      }
    };

    loadSounds();

    return () => {
      correctSound?.unloadAsync();
      wrongSound?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (!started || current >= filtered.length) return;

    if (timeLeft === 0) {
      wrongSound?.replayAsync();
      setResult('wrong');
      setStreak(0);
      setTimeout(() => {
        setResult(null);
        setTimeLeft(10);
        setCurrent((prev) => prev + 1);
      }, 1000);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, current, started]);

  const handleAnswer = (option) => {
    const correct = option === filtered[current].answer;

    Animated.sequence([
      Animated.timing(scale, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    if (correct) {
      correctSound?.replayAsync();
      setResult('correct');
      setScore(score + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      wrongSound?.replayAsync();
      setResult('wrong');
      setStreak(0);
    }

    setTimeout(() => {
      setResult(null);
      setTimeLeft(10);
      setCurrent((prev) => prev + 1);
    }, 1000);
  };

  const handleStart = (level) => {
    setDifficulty(level);
    setStarted(true);
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setResult(null);
    setTimeLeft(10);
  };

  if (started && current >= filtered.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎉 GAME OVER 🎉</Text>
        <Text style={styles.question}>Final Score: {score} / {filtered.length}</Text>
        <Text style={styles.streak}>🔥 Best Streak: {bestStreak}</Text>
        <TouchableOpacity style={styles.button} onPress={() => { setStarted(false); setDifficulty(null); }}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!started) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}><Text style={styles.orange}>LETTER </Text><Text style={styles.gray}>HUNT</Text></Text>
        <Image source={require('../../assets/images/eyechart.png')} style={styles.eyeChartLarge} />
        <Text style={styles.question}>Choose Your Challenge:</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleStart('easy')}>
          <Text style={styles.buttonText}>Easy Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleStart('hard')}>
          <Text style={styles.buttonText}>Hard Mode</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrapper}>
        <Image source={require('../../assets/images/arrow.png')} style={styles.backArrow} />
      </TouchableOpacity>

      <Text style={styles.title}><Text style={styles.orange}>LETTER </Text><Text style={styles.gray}>HUNT</Text></Text>

      <Image source={require('../../assets/images/eyechart.png')} style={styles.eyeChart} />
      <Text style={styles.question}>{filtered[current].question}</Text>
      <Text style={styles.timer}>⏱ Time Left: {timeLeft}s</Text>

      {result === 'correct' && <Text style={styles.correct}>✅ Correct!</Text>}
      {result === 'wrong' && <Text style={styles.wrong}>❌ Time's Up or Wrong!</Text>}

      <View style={styles.buttonWrapper}>
        {filtered[current].options.map((opt, idx) => (
          <Animated.View key={idx} style={{ transform: [{ scale }] }}>
            <TouchableOpacity style={styles.button} onPress={() => handleAnswer(opt)}>
              <Text style={styles.buttonText}>{opt}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <View style={styles.navButtons}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.streak}>🔥 Streak: {streak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#585A84',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backWrapper: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  backArrow: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontFamily: 'PressStart2P',
    marginBottom: 20,
    textAlign: 'center',
  },
  orange: {
    color: '#F57C00',
  },
  gray: {
    color: '#ffffff',
  },
  eyeChart: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  eyeChartLarge: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  question: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'PressStart2P',
    marginBottom: 10,
    textAlign: 'center',
  },
  timer: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 10,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9CA6F8',
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: 250,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'PressStart2P',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  correct: {
    color: 'lime',
    fontFamily: 'PressStart2P',
    fontSize: 12,
    marginBottom: 10,
  },
  wrong: {
    color: 'red',
    fontFamily: 'PressStart2P',
    fontSize: 12,
    marginBottom: 10,
  },
  navButtons: {
    marginTop: 20,
    alignItems: 'center',
  },
  score: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#FFD700',
  },
  streak: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: 'orange',
    marginTop: 5,
  },
});