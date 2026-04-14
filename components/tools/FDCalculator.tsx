import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function FDCalculator() {
  const { colors: Colors } = useApp();
  const [investment, setInvestment] = useState('100000');
  const [rate, setRate] = useState('7');
  const [tenure, setTenure] = useState('5');
  
  const [maturityValue, setMaturityValue] = useState('0');
  const [totalInterest, setTotalInterest] = useState('0');

  useEffect(() => {
    const P = parseFloat(investment) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(tenure) || 0;

    if (P > 0 && r > 0 && t > 0) {
      // Standard Compound Interest: A = P(1 + r/n)^nt (Assuming quarterly compounding n=4)
      const n = 4;
      const amount = P * Math.pow(1 + (r / 100) / n, n * t);
      const interest = amount - P;

      setMaturityValue(amount.toFixed(0));
      setTotalInterest(interest.toFixed(0));
    }
  }, [investment, rate, tenure]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: Colors.secondary }]}>
        <Text style={styles.resultLabel}>Maturity Amount</Text>
        <Text style={styles.resultValue}>₹ {Number(maturityValue).toLocaleString('en-IN')}</Text>
        <View style={styles.statsRow}>
           <Text style={styles.statText}>Total Interest: ₹ {Number(totalInterest).toLocaleString('en-IN')}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: Colors.text }]}>Investment Amount</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={investment}
          onChangeText={setInvestment}
          keyboardType="numeric"
        />

        <Text style={[styles.label, { color: Colors.text }]}>Rate of Interest (% p.a.)</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={rate}
          onChangeText={setRate}
          keyboardType="numeric"
        />

        <Text style={[styles.label, { color: Colors.text }]}>Duration (Years)</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={tenure}
          onChangeText={setTenure}
          keyboardType="numeric"
        />
      </View>

      <View style={[styles.infoCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.infoText, { color: Colors.textMuted }]}>
            * Calculation assumes quarterly compounding as per standard bank norms.
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 36 },
  statsRow: { marginTop: 16, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  statText: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 14 },

  inputGroup: { marginTop: 30, gap: 10 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 20, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 16 },

  infoCard: { padding: 20, borderRadius: 20, borderWidth: 1, marginTop: 20 },
  infoText: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 12, lineHeight: 18, textAlign: 'center' }
});
