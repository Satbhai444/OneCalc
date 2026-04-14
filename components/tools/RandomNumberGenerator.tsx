import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function RandomNumberGenerator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [result, setResult] = useState<number | null>(null);

  const generate = () => {
    triggerHaptic();
    const vMin = parseInt(min) || 0;
    const vMax = parseInt(max) || 100;
    const res = Math.floor(Math.random() * (vMax - vMin + 1)) + vMin;
    setResult(res);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: Colors.primary }]}>
         <Text style={styles.resLabel}>LUCKY NUMBER</Text>
         <Text style={styles.resVal}>{result ?? '?'}</Text>
      </View>

      <View style={styles.row}>
          <View style={{flex: 1}}>
             <Text style={[styles.label, { color: Colors.text }]}>Min</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={min} onChangeText={setMin} keyboardType="numeric" />
          </View>
          <View style={{flex: 1}}>
             <Text style={[styles.label, { color: Colors.text }]}>Max</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={max} onChangeText={setMax} keyboardType="numeric" />
          </View>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: '#1E293B' }]} onPress={generate}>
         <Text style={styles.btnText}>GENERATE RANDOM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  resVal: { color: '#FFF', fontSize: 64, fontFamily: 'SpaceGrotesk_700Bold' },
  row: { flexDirection: 'row', gap: 16, marginBottom: 30 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 16, paddingHorizontal: 16, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5, textAlign: 'center' },
  btn: { padding: 20, borderRadius: 20, alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
