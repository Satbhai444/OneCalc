import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function LoanEligibility() {
  const { colors: Colors } = useApp();
  const [income, setIncome] = useState('75000');
  const [existingEmi, setExistingEmi] = useState('0');
  const [rate, setRate] = useState('9.5');
  const [tenure, setTenure] = useState('20');
  
  const [maxLoan, setMaxLoan] = useState('0');
  const [maxEmi, setMaxEmi] = useState('0');

  useEffect(() => {
    const inc = parseFloat(income) || 0;
    const existing = parseFloat(existingEmi) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(tenure) || 0) * 12;

    // FOIR (Fixed Obligation to Income Ratio) approx 50%
    const foir = 0.50;
    const availableEmi = (inc * foir) - existing;

    if (availableEmi > 0 && r > 0 && n > 0) {
      const loan = (availableEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
      setMaxLoan(loan.toFixed(0));
      setMaxEmi(availableEmi.toFixed(0));
    } else {
      setMaxLoan('0');
      setMaxEmi('0');
    }
  }, [income, existingEmi, rate, tenure]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#059669' }]}>
        <Text style={styles.resultLabel}>Maximum Loan Eligible</Text>
        <Text style={styles.resultValue}>₹ {Number(maxLoan).toLocaleString('en-IN')}</Text>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>Eligible EMI: ₹ {Number(maxEmi).toLocaleString('en-IN')}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
          <Text style={[styles.label, { color: Colors.text }]}>Net Monthly Income (₹)</Text>
          <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={income} onChangeText={setIncome} keyboardType="numeric" />

          <Text style={[styles.label, { color: Colors.text }]}>Existing EMIs (₹)</Text>
          <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={existingEmi} onChangeText={setExistingEmi} keyboardType="numeric" />

          <View style={styles.row}>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Rate (%)</Text>
                <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={rate} onChangeText={setRate} keyboardType="numeric" />
             </View>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Years</Text>
                <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={tenure} onChangeText={setTenure} keyboardType="numeric" />
             </View>
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 32 },
  badge: { marginTop: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100 },
  badgeText: { color: '#FFF', fontSize: 13, fontFamily: 'SpaceGrotesk_600SemiBold' },
  form: { gap: 12 },
  row: { flexDirection: 'row', gap: 16 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
