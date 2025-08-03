import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const questions = [
  {
    id: 1,
    question: "What is the number you see on the screen?",
    options: ['OPTION A: 1', 'OPTION B: 5', 'OPTION C: 0'],
    correctAnswer: 'OPTION A: 1'
  },
  {
    id: 2,
    question: "What is the number you see on the screen?",
    options: ['OPTION A: 76', 'OPTION B: 74', 'OPTION C: 78'],
    correctAnswer: 'OPTION B: 74'
  },
  {
    id: 3,
    question: "What is the number you see on the screen?",
    options: ['OPTION A: 27', 'OPTION B: 29', 'OPTION C: 17'],
    correctAnswer: 'OPTION A: 27'
  },
  {
    id: 4,
    question: "What is the number you see on the screen?",
    options: ['OPTION A: 6', 'OPTION B: 9', 'OPTION C: 2'],
    correctAnswer: 'OPTION C: 2'
  },
  {
    id: 5,
    question: "What is the number you see on the screen?",
    options: ['OPTION A: 39', 'OPTION B: 36', 'OPTION C: 28'],
    correctAnswer: 'OPTION B: 36'
  }
];

export default function ColorQuestScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const optionScale = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelectOption = (option) => {
    Animated.sequence([
      Animated.timing(optionScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(optionScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    
    setSelectedOption(option);
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      
      if (currentQuestion < questions.length - 1) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      } else {
        setShowResults(true);
      }
    });
  };

  const handleBack = () => {
    setShowConfirmation(true);
  };

  const confirmExit = () => {
    navigation.navigate('HomeScreen');
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResults(false);
    setScore(0);
  };

  const questionImages = {
    1: require('../../assets/images/colortest-q1.webp'),
    2: require('../../assets/images/colortest-q2.png'),
    3: require('../../assets/images/colortest-q3.png'),
    4: require('../../assets/images/colortest-q4.png'),
    5: require('../../assets/images/colortest-q5.png'),
  };

  const backArrowImage = require('../../assets/images/home-arrow.png');
  const nextArrowImage = require('../../assets/images/next-arrow.png');
  const titleImage = require('../../assets/images/colorquest.png');

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={backArrowImage} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
        <View style={styles.headerSpacer} />
      </Animated.View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image 
            source={questionImages[questions[currentQuestion].id]} 
            style={styles.questionImage}
            resizeMode="contain"
          />
          
          <View style={styles.content}>
            <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
            
            <Text style={styles.progressText}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
            
            <View style={styles.optionsContainer}>
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => handleSelectOption(option)}
                >
                  <Animated.View
                    style={[
                      styles.option,
                      selectedOption === option && styles.selectedOption,
                      { 
                        transform: [{ scale: selectedOption === option ? optionScale : 1 }],
                      }
                    ]}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      
      <TouchableOpacity
        style={[styles.nextButton, !selectedOption && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedOption}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Image source={nextArrowImage} style={styles.arrowIconNext} />
        </Animated.View>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResults}
        onRequestClose={() => setShowResults(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quiz Completed!</Text>
            <Text style={styles.modalText}>
              You scored {score} out of {questions.length}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.restartButton]}
                onPress={restartQuiz}
              >
                <Text style={styles.buttonText}>RESTART</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.homeButton]}
                onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.buttonText}>HOME</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>End Game?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to end the game? Your progress will be lost.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmExit}
              >
                <Text style={styles.buttonText}>YES, END GAME</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9CA6F8',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex',
    paddingVertical: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  
  arrowIcon: {
    width: 60,
    height: 30,
    marginHorizontal: 10,
   
  },
  arrowIconNext: {
    width: 120,
    height: 60,
  },
  titleImage: {
    width: 350,
    height: 80,
    marginVertical: 25,
    marginHorizontal: -200,
    right: 20,
  },

  headerSpacer: {
    width: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  questionImage: {
    width: '90%',
    height: 350,
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#9CA6F8',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3A6E',
    marginBottom: 3,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: 'monospace',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  progressText: {
    fontSize: 16,
    color: '#2D3A6E',
    marginBottom: 30,
    fontWeight: '600',
    fontFamily: 'monospace',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  optionsContainer: {
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 4,
    paddingVertical: 14,
    marginVertical: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5E6CEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: 'rgba(94, 108, 234, 0.7)',
    borderColor: '#2D3A6E',
    borderWidth: 3,
    shadowColor: '#5E6CEA',
    shadowOpacity: 0.4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3A6E',
    fontFamily: 'monospace',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'transparent',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#9CA6F8',
    borderRadius: 0,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#5E6CEA',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2D3A6E',
    textAlign: 'center',
    fontFamily: 'monospace',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  modalText: {
    fontSize: 18,
    color: '#2D3A6E',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'monospace',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D3A6E',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#FF5252',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
  },
  homeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#2D3A6E',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'monospace',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
});
