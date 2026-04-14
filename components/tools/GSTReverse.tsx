import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function GSTReverse() {
  const { colors: Colors } = useApp();
  const [amount, setAmount] = useState('1180');
  const [rate, setRate] = useState('18');
  
  const [base, setBase] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);

  useEffect(() => {
    const total = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;
    
    if (total > 0) {
      const baseValue = total / (1 + (r / 100));
      setBase(baseValue);
      setGstAmount(total - baseValue);
    }
  }, [amount, rate]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: Colors.secondary }]}>
        <Text style={styles.resultLabel}>Calculated Base Price</Text>
        <Text style={styles.resultValue}>₹ {base.toFixed(2).toLocaleString()}</Text>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>Tax Included: ₹ {gstAmount.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={[styles.label, { color: Colors.text, marginTop: 30 }]}>Total Amount (Inclusive of GST)</Text>
      <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <Text style={[styles.label, { color: Colors.text }]}>GST Rate (%)</Text>
      <View style={styles.row}>
         {[5, 12, 18, 28].map(r => (
           <TouchableOpacity key={r} style={[styles.chip, { backgroundColor: rate === String(r) ? Colors.primary : Colors.cardBg, borderColor: Colors.primary }]} onPress={() => setRate(String(r))}>
              <Text style={[styles.chipText, { color: rate === String(r) ? '#FFF' : Colors.primary }]}>{r}%</Text>
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
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 36 },
  badge: { marginTop: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100 },
  badgeText: { color: '#FFF', fontSize: 13, fontFamily: 'SpaceGrotesk_600SemiBold' },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 20 },
  row: { flexDirection: 'row', gap: 10 },
  chip: { flex: 1, height: 44, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  chipText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 },
});
