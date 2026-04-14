import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function IdealWeight() {
  const { colors: Colors } = useApp();
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [height, setHeight] = useState('175'); // cm
  
  const [idealWeight, setIdealWeight] = useState('0');

  useEffect(() => {
    const h = parseFloat(height) || 0;
    if (h > 152.4) {
      // Devine Formula
      const inchesOver5Ft = (h - 152.4) / 2.54;
      let weight = gender === 'm' ? 50 + (2.3 * inchesOver5Ft) : 45.5 + (2.3 * inchesOver5Ft);
      setIdealWeight(weight.toFixed(1));
    }
  }, [gender, height]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#10B981' }]}>
        <Text style={styles.resultLabel}>Ideal Body Weight</Text>
        <Text style={styles.resultValue}>{idealWeight} kg</Text>
        <Text style={styles.hint}>Based on Devine Formula</Text>
      </View>

      <View style={styles.genderRow}>
         <TouchableOpacity 
            style={[styles.genderBtn, { backgroundColor: gender === 'm' ? '#3B82F6' : Colors.cardBg, borderColor: gender === 'm' ? '#3B82F6' : Colors.border }]}
            onPress={() => setGender('m')}
         >
            <Text style={[styles.genderText, { color: gender === 'm' ? '#FFF' : Colors.text }]}>MALE</Text>
         </TouchableOpacity>
         <TouchableOpacity 
            style={[styles.genderBtn, { backgroundColor: gender === 'f' ? '#EC4899' : Colors.cardBg, borderColor: gender === 'f' ? '#EC4899' : Colors.border }]}
            onPress={() => setGender('f')}
         >
            <Text style={[styles.genderText, { color: gender === 'f' ? '#FFF' : Colors.text }]}>FEMALE</Text>
         </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: Colors.text }]}>Height (cm)</Text>
      <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={height} onChangeText={setHeight} keyboardType="numeric" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 44 },
  hint: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 8, fontFamily: 'SpaceGrotesk_500Medium' },
  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  genderBtn: { flex: 1, height: 50, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  genderText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
