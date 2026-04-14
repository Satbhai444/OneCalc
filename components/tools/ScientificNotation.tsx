import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function ScientificNotation() {
  const { colors: Colors } = useApp();
  const [val, setVal] = useState('123456');
  const [notation, setNotation] = useState('');

  useEffect(() => {
    const n = parseFloat(val);
    if (isNaN(n)) {
      setNotation('Invalid Number');
      return;
    }
    setNotation(n.toExponential(4));
  }, [val]);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: '#1E293B' }]}>
         <Text style={styles.label}>SCIENTIFIC NOTATION</Text>
         <Text style={styles.value}>{notation}</Text>
      </View>

      <Text style={[styles.inputLabel, { color: Colors.text }]}>Enter Number</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={val} 
        onChangeText={setVal} 
        keyboardType="numeric" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  label: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  value: { color: '#FFF', fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 10 },
  inputLabel: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
});
