import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function TipCalculator() {
  const { colors: Colors } = useApp();
  const [bill, setBill] = useState('1000');
  const [tipPct, setTipPct] = useState('10');
  
  const [tipAmount, setTipAmount] = useState('0');
  const [total, setTotal] = useState('0');

  useEffect(() => {
    const b = parseFloat(bill) || 0;
    const t = parseFloat(tipPct) || 0;
    const amt = (b * t) / 100;
    setTipAmount(amt.toFixed(2));
    setTotal((b + amt).toFixed(2));
  }, [bill, tipPct]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <View style={styles.row}>
            <View style={{alignItems: 'center'}}>
               <Text style={[styles.resLabel, { color: Colors.textMuted }]}>Tip Amount</Text>
               <Text style={[styles.resValue, { color: Colors.primary }]}>₹ {tipAmount}</Text>
            </View>
            <View style={styles.divider} />
            <View style={{alignItems: 'center'}}>
               <Text style={[styles.resLabel, { color: Colors.textMuted }]}>Total Bill</Text>
               <Text style={[styles.resValue, { color: Colors.text }]}>₹ {total}</Text>
            </View>
         </View>
      </View>

      <View style={styles.inputGroup}>
         <Text style={[styles.label, { color: Colors.text }]}>Bill Amount (₹)</Text>
         <TextInput 
           style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
           value={bill}
           onChangeText={setBill}
           keyboardType="numeric"
         />

         <Text style={[styles.label, { color: Colors.text }]}>Tip Percentage (%)</Text>
         <View style={styles.tipRow}>
            {[5, 10, 15, 20].map(p => (
              <TouchableOpacity key={p} style={[styles.chip, { backgroundColor: Colors.primary + (tipPct === String(p) ? 'FF' : '10') }]} onPress={() => setTipPct(String(p))}>
                 <Text style={[styles.chipText, { color: tipPct === String(p) ? '#FFF' : Colors.primary }]}>{p}%</Text>
              </TouchableOpacity>
            ))}
         </View>
         <TextInput 
           style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border, marginTop: 10 }]}
           value={tipPct}
           onChangeText={setTipPct}
           keyboardType="numeric"
           placeholder="Custom %"
         />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, borderWidth: 1, marginBottom: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  divider: { width: 1, height: 40, backgroundColor: 'rgba(0,0,0,0.1)' },
  resLabel: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13, marginBottom: 4 },
  resValue: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24 },

  inputGroup: { gap: 10 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 22, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  tipRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  chip: { flex: 1, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  chipText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 },
});
