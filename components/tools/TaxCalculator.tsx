import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function TaxCalculator() {
  const { colors: Colors } = useApp();
  const [income, setIncome] = useState('1200000');
  const [tax, setTax] = useState('0');
  const [takeHome, setTakeHome] = useState('0');

  useEffect(() => {
    const inc = parseFloat(income) || 0;
    let t = 0;

    // Simplified Indian New Tax Regime 2024-25 Logic
    if (inc <= 300000) t = 0;
    else if (inc <= 600000) t = (inc - 300000) * 0.05;
    else if (inc <= 900000) t = 300000 * 0.05 + (inc - 600000) * 0.10;
    else if (inc <= 1200000) t = 300000 * 0.05 + 300000 * 0.10 + (inc - 900000) * 0.15;
    else if (inc <= 1500000) t = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + (inc - 1200000) * 0.20;
    else t = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + 300000 * 0.20 + (inc - 1500000) * 0.30;

    setTax(t.toFixed(0));
    setTakeHome((inc - t).toFixed(0));
  }, [income]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: Colors.primary }]}>
        <Text style={styles.resultLabel}>Yearly Income Tax</Text>
        <Text style={styles.resultValue}>₹ {Number(tax).toLocaleString('en-IN')}</Text>
        <View style={styles.breakdown}>
           <Text style={styles.takeHome}>Monthly Take-home: ₹ {Number(parseFloat(takeHome)/12).toLocaleString('en-IN', {maximumFractionDigits: 0})}</Text>
        </View>
      </View>

      <Text style={[styles.label, { color: Colors.text, marginTop: 30 }]}>Annual Gross Salary (₹)</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
        value={income}
        onChangeText={setIncome}
        keyboardType="numeric"
      />

      <View style={[styles.info, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.infoText, { color: Colors.textMuted }]}>
            Calculated based on 2024-25 New Tax Regime (India). Standard deductions not included.
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 44 },
  breakdown: { marginTop: 16, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100 },
  takeHome: { color: '#FFF', fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 13 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { height: 64, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  info: { marginTop: 30, padding: 20, borderRadius: 24, borderWidth: 1 },
  infoText: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 12, textAlign: 'center', lineHeight: 20 }
});
