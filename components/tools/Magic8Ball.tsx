import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useApp } from '../../context/AppContext';

const answers = [
  "It is certain", "Reply hazy, try again", "Don't count on it",
  "Most likely", "Ask again later", "My sources say no",
  "Outlook good", "Better not tell you now", "Very doubtful",
  "Yes definitely", "Concentrate and ask again", "Signs point to yes"
];

export default function Magic8Ball() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [answer, setAnswer] = useState('Ask a question & shake');
  const [shaking, setShaking] = useState(false);
  const shakeAnim = React.useRef(new Animated.Value(0)).current;

  const shake = () => {
    setShaking(true);
    triggerHaptic();
    
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start(() => {
        setAnswer(answers[Math.floor(Math.random() * answers.length)]);
        setShaking(false);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={shake}
          disabled={shaking}
          style={[styles.ball, { backgroundColor: '#111' }]}
        >
          <View style={styles.innerCircle}>
             <View style={styles.triangle} />
             <Text style={styles.answerText}>{shaking ? '...' : answer}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Text style={[styles.hint, { color: Colors.textMuted }]}>Tap the ball to shake</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 450 },
  ball: { width: 280, height: 280, borderRadius: 140, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 15 },
  innerCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#222', borderWidth: 2, borderColor: '#333', justifyContent: 'center', alignItems: 'center', padding: 20 },
  triangle: { position: 'absolute', width: 0, height: 0, borderLeftWidth: 60, borderRightWidth: 60, borderBottomWidth: 100, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#1e3a8a', opacity: 0.5 },
  answerText: { color: '#FFF', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', textAlign: 'center', zIndex: 1 },
  hint: { fontFamily: 'SpaceGrotesk_500Medium', marginTop: 40, fontSize: 14 },
});
