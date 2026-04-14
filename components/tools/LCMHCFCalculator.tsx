import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function LCMHCFCalculator() {
  const { colors: Colors } = useApp();
  const [n1, setN1] = useState('12');
  const [n2, setN2] = useState('18');
  const [lcm, setLcm] = useState(0);
  const [hcf, setHcf] = useState(0);

  const getHCF = (a: number, b: number): number => {
    while (b) { a %= b; [a, b] = [b, a]; }
    return a;
  };

  useEffect(() => {
    const a = Math.abs(parseInt(n1)) || 0;
    const b = Math.abs(parseInt(n2)) || 0;
    
    if (a > 0 && b > 0) {
      const h = getHCF(a, b);
      setHcf(h);
      setLcm((a * b) / h);
    }
  }, [n1, n2]);

  return (
    <View style={styles.container}>
      <View style={styles.resRow}>
         <View style={[styles.resBox, { backgroundColor: '#F87171' }]}>
            <Text style={styles.resLabel}>HCF</Text>
            <Text style={styles.resVal}>{hcf}</Text>
         </View>
         <View style={[styles.resBox, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.resLabel}>LCM</Text>
            <Text style={styles.resVal}>{lcm}</Text>
         </View>
      </View>

      <View style={styles.inputs}>
         <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors.text }]}>Number 1</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={n1} onChangeText={setN1} keyboardType="numeric" />
         </View>
         <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors.text }]}>Number 2</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={n2} onChangeText={setN2} keyboardType="numeric" />
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resRow: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  resBox: { flex: 1, padding: 24, borderRadius: 24, alignItems: 'center' },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold' },
  resVal: { color: '#FFF', fontSize: 40, fontFamily: 'SpaceGrotesk_700Bold' },
  inputs: { gap: 16 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 }
});
