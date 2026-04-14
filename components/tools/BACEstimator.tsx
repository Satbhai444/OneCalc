import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function BACEstimator() {
  const { colors: Colors } = useApp();
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [weight, setWeight] = useState('70'); // kg
  const [drinks, setDrinks] = useState('2'); // standard drinks
  const [hours, setHours] = useState('1'); // since first drink
  
  const [bac, setBac] = useState(0);

  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const d = parseFloat(drinks) || 0;
    const h = parseFloat(hours) || 0;
    
    if (w > 0) {
      // Widmark Formula: BAC = [Alcohol in grams / (Weight in grams * r)] * 100 - (h * 0.015)
      // Standard drink = 14g alcohol
      // r (distribution ratio): 0.68 for men, 0.55 for women
      const grams = d * 14;
      const weightInGrams = w * 1000;
      const r = gender === 'm' ? 0.68 : 0.55;
      
      let res = (grams / (weightInGrams * r)) * 100 - (h * 0.015);
      setBac(Math.max(0, res));
    }
  }, [gender, weight, drinks, hours]);

  const getStatus = (val: number) => {
    if (val === 0) return { label: 'Sober', color: '#10B981' };
    if (val < 0.05) return { label: 'Buzzing', color: '#F59E0B' };
    if (val < 0.08) return { label: 'Legal Limit', color: '#EF4444' };
    return { label: 'Intoxicated', color: '#B91C1C' };
  };

  const status = getStatus(bac);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: status.color }]}>
        <Text style={styles.resultLabel}>Estimated BAC</Text>
        <Text style={styles.resultValue}>{bac.toFixed(3)}%</Text>
        <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{status.label.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={[styles.disclaimer, { color: Colors.textMuted }]}>
        Warning: This is a mathematical estimation only. Alcohol tolerance varies. Never drive under influence.
      </Text>

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

      <View style={styles.form}>
        <View style={styles.row}>
            <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Weight (kg)</Text>
                <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={weight} onChangeText={setWeight} keyboardType="numeric" />
            </View>
            <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Drinks</Text>
                <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={drinks} onChangeText={setDrinks} keyboardType="numeric" />
            </View>
        </View>

        <Text style={[styles.label, { color: Colors.text, marginTop: 10 }]}>Time Passed (Hours)</Text>
        <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={hours} onChangeText={setHours} keyboardType="numeric" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 16 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 44 },
  statusBadge: { backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 15 },
  statusText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 12 },
  disclaimer: { fontSize: 11, textAlign: 'center', marginBottom: 24, lineHeight: 16, fontFamily: 'SpaceGrotesk_500Medium' },
  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  genderBtn: { flex: 1, height: 50, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  genderText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13 },
  form: { gap: 16 },
  row: { flexDirection: 'row', gap: 16 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
