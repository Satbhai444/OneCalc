import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function LoanPrepayment() {
  const { colors: Colors } = useApp();
  const [loanAmount, setLoanAmount] = useState('5000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [prepayment, setPrepayment] = useState('500000');
  
  const [interestSaved, setInterestSaved] = useState('0');
  const [monthsSaved, setMonthsSaved] = useState('0');

  useEffect(() => {
    const P = parseFloat(loanAmount) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(tenure) || 0) * 12;
    const prepay = parseFloat(prepayment) || 0;

    if (P > 0 && r > 0 && n > 0) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalOriginal = emi * n;
      
      const newP = P - prepay;
      if (newP > 0) {
        // Calculate new tenure for same EMI
        const newN = Math.log(emi / (emi - newP * r)) / Math.log(1 + r);
        const totalNew = emi * newN + prepay;
        setInterestSaved((totalOriginal - totalNew).toFixed(0));
        setMonthsSaved((n - newN).toFixed(0));
      }
    }
  }, [loanAmount, rate, tenure, prepayment]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#0EA5E9' }]}>
        <Text style={styles.resultLabel}>Total Interest Saved</Text>
        <Text style={styles.resultValue}>₹ {Number(interestSaved).toLocaleString('en-IN')}</Text>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>Tenure Reduced: {monthsSaved} Months</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
          <Text style={[styles.label, { color: Colors.text }]}>Outstanding Loan Amount (₹)</Text>
          <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={loanAmount} onChangeText={setLoanAmount} keyboardType="numeric" />

          <Text style={[styles.label, { color: Colors.text }]}>Prepayment Amount (One-time) (₹)</Text>
          <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.primary + '05' }]} value={prepayment} onChangeText={setPrepayment} keyboardType="numeric" />

          <View style={styles.row}>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Rate (%)</Text>
                <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={rate} onChangeText={setRate} keyboardType="numeric" />
             </View>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Remaining Years</Text>
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
