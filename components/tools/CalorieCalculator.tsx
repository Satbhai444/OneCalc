import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

const activities = [
  { label: 'Sedentary', factor: 1.2 },
  { label: 'Lightly Active', factor: 1.375 },
  { label: 'Moderately Active', factor: 1.55 },
  { label: 'Very Active', factor: 1.725 },
  { label: 'Extra Active', factor: 1.9 },
];

export default function CalorieCalculator() {
  const { colors: Colors } = useApp();
  const [bmr, setBmr] = useState('1600');
  const [activeFactor, setActiveFactor] = useState(1.2);
  
  const [dailyCals, setDailyCals] = useState(0);

  useEffect(() => {
    const b = parseFloat(bmr) || 0;
    setDailyCals(b * activeFactor);
  }, [bmr, activeFactor]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: Colors.primary }]}>
        <Text style={styles.resultLabel}>Maintenance Calories</Text>
        <Text style={styles.resultValue}>{Math.round(dailyCals).toLocaleString()} kcal/day</Text>
      </View>

      <Text style={[styles.label, { color: Colors.text, marginTop: 20 }]}>Your BMR (from BMR Tool)</Text>
      <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={bmr} onChangeText={setBmr} keyboardType="numeric" />

      <Text style={[styles.label, { color: Colors.text, marginTop: 20 }]}>Activity Level</Text>
      <View style={styles.activityGrid}>
         {activities.map(act => (
           <TouchableOpacity 
             key={act.label} 
             style={[styles.actBtn, { backgroundColor: activeFactor === act.factor ? Colors.primary + '20' : Colors.cardBg, borderColor: activeFactor === act.factor ? Colors.primary : Colors.border }]}
             onPress={() => setActiveFactor(act.factor)}
           >
              <Text style={[styles.actLabel, { color: activeFactor === act.factor ? Colors.primary : Colors.text }]}>{act.label}</Text>
              <Text style={[styles.actSub, { color: Colors.textMuted }]}>x{act.factor}</Text>
           </TouchableOpacity>
         ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center' },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 32 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  activityGrid: { gap: 10 },
  actBtn: { padding: 16, borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actLabel: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 15 },
  actSub: { fontSize: 12, fontFamily: 'SpaceGrotesk_500Medium' }
});
