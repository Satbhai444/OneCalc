import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function SplitBillCalculator() {
  const { colors: Colors } = useApp();
  const [total, setTotal] = useState('1200');
  const [people, setPeople] = useState('4');
  const [tip, setTip] = useState('10');
  
  const [perPerson, setPerPerson] = useState('0');
  const [totalWithTip, setTotalWithTip] = useState('0');

  useEffect(() => {
    const t = parseFloat(total) || 0;
    const p = parseInt(people) || 1;
    const tipPct = parseFloat(tip) || 0;

    if (t > 0 && p > 0) {
      const tipAmt = (t * tipPct) / 100;
      const grandTotal = t + tipAmt;
      const split = grandTotal / p;

      setTotalWithTip(grandTotal.toFixed(2));
      setPerPerson(split.toFixed(2));
    }
  }, [total, people, tip]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#7726E0' }]}>
        <Text style={styles.resultLabel}>Each Person Pays</Text>
        <Text style={styles.resultValue}>₹ {perPerson}</Text>
        <Text style={styles.resultSub}>Total: ₹ {totalWithTip}</Text>
      </View>

      <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors.text }]}>Total Bill Amount (₹)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={total}
            onChangeText={setTotal}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Number of People</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={people}
            onChangeText={setPeople}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Tip Percentage (%)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={tip}
            onChangeText={setTip}
            keyboardType="numeric"
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 48 },
  resultSub: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 8 },

  inputGroup: { marginTop: 30, gap: 10 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 22, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 12 },
});
