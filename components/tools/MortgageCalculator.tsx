import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function MortgageCalculator() {
  const { colors: Colors } = useApp();
  const [homePrice, setHomePrice] = useState('5000000');
  const [downPayment, setDownPayment] = useState('1000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  
  const [monthlyPayment, setMonthlyPayment] = useState('0');

  useEffect(() => {
    const P = (parseFloat(homePrice) || 0) - (parseFloat(downPayment) || 0);
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(tenure) || 0) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(emi.toFixed(0));
    }
  }, [homePrice, downPayment, rate, tenure]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#334155' }]}>
        <Text style={styles.resultLabel}>Monthly Mortgage Payment</Text>
        <Text style={styles.resultValue}>₹ {Number(monthlyPayment).toLocaleString('en-IN')}</Text>
      </View>

      <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors.text }]}>Home Price (₹)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={homePrice}
            onChangeText={setHomePrice}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Down Payment (₹)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={downPayment}
            onChangeText={setDownPayment}
            keyboardType="numeric"
          />

          <View style={styles.row}>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Rate (%)</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
                  value={rate}
                  onChangeText={setRate}
                  keyboardType="numeric"
                />
             </View>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Years</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
                  value={tenure}
                  onChangeText={setTenure}
                  keyboardType="numeric"
                />
             </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', backgroundColor: '#334155' },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 40 },

  inputGroup: { marginTop: 30, gap: 8 },
  row: { flexDirection: 'row', gap: 16 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13, marginBottom: 4, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 12 },
});
