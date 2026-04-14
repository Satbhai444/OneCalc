import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export default function WaterIntake() {
  const { colors: Colors } = useApp();
  const [weight, setWeight] = useState('70');
  const [exercise, setExercise] = useState('30'); // minutes
  
  const [liters, setLiters] = useState(0);

  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const ex = parseFloat(exercise) || 0;
    
    if (w > 0) {
      // Basic rule: 35ml per kg + 500ml per 30 min exercise
      let totalMl = (w * 35) + (ex / 30 * 500);
      setLiters(totalMl / 1000);
    }
  }, [weight, exercise]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#0EA5E9' }]}>
        <MaterialCommunityIcons name="water" size={40} color="#FFF" style={{marginBottom: 10}} />
        <Text style={styles.resultLabel}>Daily Water Goal</Text>
        <Text style={styles.resultValue}>{liters.toFixed(2)} Liters</Text>
        <Text style={styles.hint}>Approx. {Math.round(liters * 1000 / 250)} glasses (250ml)</Text>
      </View>

      <View style={styles.inputGroup}>
         <Text style={[styles.label, { color: Colors.text }]}>Body Weight (kg)</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={weight} onChangeText={setWeight} keyboardType="numeric" />

         <Text style={[styles.label, { color: Colors.text, marginTop: 16 }]}>Average Exercise (mins/day)</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={exercise} onChangeText={setExercise} keyboardType="numeric" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 36 },
  hint: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 8, fontFamily: 'SpaceGrotesk_500Medium' },
  inputGroup: { gap: 8 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
