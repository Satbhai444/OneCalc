import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function EMIInterestSplit() {
  const { colors: Colors } = useApp();
  const [loan, setLoan] = useState('1000000');
  const [rate, setRate] = useState('9');
  const [tenure, setTenure] = useState('10');
  
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const P = parseFloat(loan) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(tenure) || 0) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const e = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = e * n;
      setEmi(e);
      setTotalPrincipal(P);
      setTotalInterest(total - P);
    }
  }, [loan, rate, tenure]);

  const interestRatio = (totalInterest / (totalInterest + totalPrincipal)) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.emiLabel, { color: Colors.textMuted }]}>Monthly EMI</Text>
         <Text style={[styles.emiValue, { color: Colors.text }]}>₹ {Math.round(emi).toLocaleString()}</Text>
         
         <View style={styles.chartContainer}>
            <View style={[styles.bar, { width: `${100 - interestRatio}%`, backgroundColor: Colors.primary }]} />
            <View style={[styles.bar, { width: `${interestRatio}%`, backgroundColor: '#EF4444' }]} />
         </View>

         <View style={styles.legend}>
            <View style={styles.legendItem}>
               <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
               <Text style={[styles.legendText, { color: Colors.text }]}>Principal: {Math.round(100 - interestRatio)}%</Text>
            </View>
            <View style={styles.legendItem}>
               <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
               <Text style={[styles.legendText, { color: Colors.text }]}>Interest: {Math.round(interestRatio)}%</Text>
            </View>
         </View>
      </View>

      <View style={styles.form}>
         <Text style={[styles.label, { color: Colors.text }]}>Loan Amount</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text }]} value={loan} onChangeText={setLoan} keyboardType="numeric" />
         
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 30, borderRadius: 32, borderWidth: 1, alignItems: 'center' },
  emiLabel: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13, marginBottom: 4 },
  emiValue: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 32, marginBottom: 24 },
  chartContainer: { width: '100%', height: 12, borderRadius: 6, backgroundColor: '#EEE', flexDirection: 'row', overflow: 'hidden', marginBottom: 20 },
  bar: { height: '100%' },
  legend: { flexDirection: 'row', gap: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 12 },
  form: { marginTop: 30, gap: 12 },
  row: { flexDirection: 'row', gap: 16 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
