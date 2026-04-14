import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function BMICalculator() {
  const { colors: Colors } = useApp();
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  
  const [bmi, setBmi] = useState('0');
  const [category, setCategory] = useState('Normal');
  const [color, setColor] = useState('#22C55E');

  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const h = (parseFloat(height) || 0) / 100;

    if (w > 0 && h > 0) {
      const res = w / (h * h);
      setBmi(res.toFixed(1));

      if (res < 18.5) {
        setCategory('Underweight');
        setColor('#3B82F6');
      } else if (res < 25) {
        setCategory('Healthy');
        setColor('#22C55E');
      } else if (res < 30) {
        setCategory('Overweight');
        setColor('#EAB308');
      } else {
        setCategory('Obese');
        setColor('#EF4444');
      }
    }
  }, [weight, height]);

  return (
    <View style={styles.container}>
      {/* Result Display */}
      <View style={[styles.resultCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
        <Text style={[styles.resultLabel, { color: Colors.textMuted }]}>Your Body Mass Index</Text>
        <Text style={[styles.resultValue, { color: color }]}>{bmi}</Text>
        <View style={[styles.badge, { backgroundColor: color + '15' }]}>
            <Text style={[styles.badgeText, { color: color }]}>{category.toUpperCase()}</Text>
        </View>
      </View>

      {/* Input Group */}
      <View style={styles.inputGroup}>
        <View style={styles.inputRow}>
           <View style={{flex: 1}}>
              <Text style={[styles.label, { color: Colors.text }]}>Weight (kg)</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: Colors.border + '30', color: Colors.text, borderColor: Colors.border }]}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
           </View>
           <View style={{flex: 1}}>
              <Text style={[styles.label, { color: Colors.text }]}>Height (cm)</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: Colors.border + '30', color: Colors.text, borderColor: Colors.border }]}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
           </View>
        </View>
      </View>

      {/* Info Scale */}
      <View style={styles.scaleContainer}>
         <View style={styles.scaleLine}>
            <View style={[styles.scaleBit, { backgroundColor: '#3B82F6', flex: 18.5 }]} />
            <View style={[styles.scaleBit, { backgroundColor: '#22C55E', flex: 6.5 }]} />
            <View style={[styles.scaleBit, { backgroundColor: '#EAB308', flex: 5 }]} />
            <View style={[styles.scaleBit, { backgroundColor: '#EF4444', flex: 10 }]} />
         </View>
         <View style={styles.scaleLabels}>
            <Text style={styles.scaleText}>18.5</Text>
            <Text style={styles.scaleText}>25</Text>
            <Text style={styles.scaleText}>30</Text>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', borderWidth: 1, marginBottom: 30 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 64 },
  badge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginTop: 10 },
  badgeText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13, letterSpacing: 1 },

  inputGroup: { gap: 20 },
  inputRow: { flexDirection: 'row', gap: 16 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 20, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },

  scaleContainer: { marginTop: 40 },
  scaleLine: { height: 10, borderRadius: 5, overflow: 'hidden', flexDirection: 'row' },
  scaleBit: { height: '100%' },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  scaleText: { fontSize: 10, color: '#999', fontFamily: 'SpaceGrotesk_500Medium' }
});
