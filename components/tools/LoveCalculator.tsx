import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export default function LoveCalculator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculateLove = () => {
    if (!name1 || !name2) return;
    setCalculating(true);
    triggerHaptic();
    
    setTimeout(() => {
      // Fun logic based on char codes
      const combined = (name1 + name2).toLowerCase();
      let sum = 0;
      for (let i = 0; i < combined.length; i++) sum += combined.charCodeAt(i);
      setScore(sum % 101);
      setCalculating(false);
    }, 1500);
  };

  const getMessage = () => {
    if (score! > 90) return "Soulmates Forever! ❤️";
    if (score! > 70) return "Great Match! 🔥";
    if (score! > 50) return "Good Potential! ✨";
    return "Just Friends? 😊";
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputGroup, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
          <TextInput 
            style={[styles.input, { color: Colors.text }]}
            placeholder="Partner 1 Name"
            placeholderTextColor={Colors.textMuted}
            value={name1}
            onChangeText={setName1}
          />
          <MaterialCommunityIcons name="heart" size={32} color={Colors.primary} />
          <TextInput 
            style={[styles.input, { color: Colors.text }]}
            placeholder="Partner 2 Name"
            placeholderTextColor={Colors.textMuted}
            value={name2}
            onChangeText={setName2}
          />
      </View>

      <TouchableOpacity 
        style={[styles.calcBtn, { backgroundColor: Colors.primary }]} 
        onPress={calculateLove}
        disabled={calculating}
      >
        <Text style={styles.calcBtnText}>{calculating ? 'Finding Love...' : 'CALCULATE'}</Text>
      </TouchableOpacity>

      {score !== null && !calculating && (
        <View style={styles.resultContainer}>
           <Text style={[styles.score, { color: Colors.text }]}>{score}%</Text>
           <Text style={[styles.message, { color: Colors.primary }]}>{getMessage()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  inputGroup: { width: '100%', padding: 24, borderRadius: 32, borderWidth: 1, gap: 16, alignItems: 'center' },
  input: { width: '100%', height: 50, textAlign: 'center', fontSize: 20, fontFamily: 'SpaceGrotesk_600SemiBold' },
  calcBtn: { marginTop: 30, width: '100%', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  calcBtnText: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 18, letterSpacing: 1 },
  resultContainer: { marginTop: 40, alignItems: 'center' },
  score: { fontSize: 80, fontFamily: 'SpaceGrotesk_700Bold' },
  message: { fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', marginTop: 10 }
});
