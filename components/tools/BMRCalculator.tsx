import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function BMRCalculator() {
  const { colors: Colors } = useApp();
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [age, setAge] = useState('25');
  
  const [bmr, setBmr] = useState(0);

  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;

    if (w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let result = (10 * w) + (6.25 * h) - (5 * a);
      result = gender === 'm' ? result + 5 : result - 161;
      setBmr(result);
    }
  }, [gender, weight, height, age]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#F43F5E' }]}>
        <Text style={styles.resultLabel}>Basal Metabolic Rate (BMR)</Text>
        <Text style={styles.resultValue}>{Math.round(bmr).toLocaleString()} kcal</Text>
        <Text style={styles.hint}>Energy burnt at complete rest</Text>
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

      <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputGroup}>
             <Text style={[styles.label, { color: Colors.text }]}>Weight (kg)</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={weight} onChangeText={setWeight} keyboardType="numeric" />
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.label, { color: Colors.text }]}>Height (cm)</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={height} onChangeText={setHeight} keyboardType="numeric" />
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.label, { color: Colors.text }]}>Age (Years)</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={age} onChangeText={setAge} keyboardType="numeric" />
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 36 },
  hint: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 8, fontFamily: 'SpaceGrotesk_500Medium' },
  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  genderBtn: { flex: 1, height: 50, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  genderText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13 },
  form: { gap: 16 },
  inputGroup: { gap: 6 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
