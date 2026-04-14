import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function EMICalculator() {
  const { colors: Colors } = useApp();
  const [loan, setLoan] = useState('1000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [isYearly, setIsYearly] = useState(true);

  const [emi, setEmi] = useState('0');
  const [totalInterest, setTotalInterest] = useState('0');
  const [totalPayment, setTotalPayment] = useState('0');

  useEffect(() => {
    const P = parseFloat(loan) || 0;
    const R = (parseFloat(rate) || 0) / 12 / 100;
    const N = (parseFloat(tenure) || 0) * (isYearly ? 12 : 1);

    if (P > 0 && R > 0 && N > 0) {
      const emiVal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalPay = emiVal * N;
      const totalInt = totalPay - P;

      setEmi(emiVal.toFixed(0));
      setTotalPayment(totalPay.toFixed(0));
      setTotalInterest(totalInt.toFixed(0));
    } else if (P > 0 && N > 0 && R === 0) {
      const emiVal = P / N;
      setEmi(emiVal.toFixed(0));
      setTotalPayment(P.toFixed(0));
      setTotalInterest('0');
    }
  }, [loan, rate, tenure, isYearly]);

  return (
    <View style={styles.container}>
      {/* Result Card */}
      <View style={[styles.resultCard, { backgroundColor: Colors.primary }]}>
        <Text style={styles.resultLabel}>Monthly Installment (EMI)</Text>
        <Text style={styles.resultValue}>₹ {Number(emi).toLocaleString('en-IN')}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Interest</Text>
            <Text style={styles.statValue}>₹ {Number(totalInterest).toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Principal</Text>
            <Text style={styles.statValue}>₹ {Number(loan).toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </View>

      {/* Visual Indicator (Progress Bar Style) */}
      <View style={styles.progressContainer}>
         <View style={[styles.progressBar, { backgroundColor: Colors.primary + '30' }]}>
            <View style={[styles.progressFill, { width: `${(Number(totalInterest) / Number(totalPayment)) * 100 || 0}%`, backgroundColor: '#FFD60A' }]} />
         </View>
         <View style={styles.progressLabels}>
            <Text style={[styles.progressText, { color: Colors.textMuted }]}>Principal</Text>
            <Text style={[styles.progressText, { color: Colors.textMuted }]}>Interest ({((Number(totalInterest) / Number(totalPayment)) * 100 || 0).toFixed(1)}%)</Text>
         </View>
      </View>

      {/* Inputs */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: Colors.text }]}>Loan Amount</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={loan}
          onChangeText={setLoan}
          keyboardType="numeric"
          placeholder="e.g. 1000000"
          placeholderTextColor={Colors.textMuted}
        />

        <Text style={[styles.label, { color: Colors.text }]}>Interest Rate (% p.a.)</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={rate}
          onChangeText={setRate}
          keyboardType="numeric"
          placeholder="e.g. 8.5"
          placeholderTextColor={Colors.textMuted}
        />

        <View style={styles.rowLabel}>
          <Text style={[styles.label, { color: Colors.text }]}>Tenure</Text>
          <View style={[styles.toggle, { backgroundColor: Colors.border }]}>
            <TouchableOpacity 
              onPress={() => setIsYearly(true)}
              style={[styles.toggleBtn, isYearly && { backgroundColor: Colors.primary }]}
            >
              <Text style={[styles.toggleText, isYearly && { color: '#FFF' }]}>Years</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsYearly(false)}
              style={[styles.toggleBtn, !isYearly && { backgroundColor: Colors.primary }]}
            >
              <Text style={[styles.toggleText, !isYearly && { color: '#FFF' }]}>Months</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={tenure}
          onChangeText={setTenure}
          keyboardType="numeric"
          placeholder={isYearly ? "e.g. 20" : "e.g. 240"}
          placeholderTextColor={Colors.textMuted}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: {
    padding: 24,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 36, letterSpacing: -1 },
  statsRow: { flexDirection: 'row', marginTop: 24, width: '100%', gap: 10 },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.6)', fontSize: 11, marginBottom: 4 },
  statValue: { fontFamily: 'SpaceGrotesk_600SemiBold', color: '#FFF', fontSize: 14 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', height: '100%' },
  
  progressContainer: { marginTop: 24, marginBottom: 12 },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden', flexDirection: 'row-reverse' },
  progressFill: { height: '100%' },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  progressText: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 11 },

  inputGroup: { marginTop: 24, gap: 4 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { 
    height: 56, 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    fontSize: 18, 
    fontFamily: 'SpaceGrotesk_600SemiBold', 
    borderWidth: 1.5,
    marginBottom: 20
  },
  rowLabel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  toggle: { flexDirection: 'row', borderRadius: 10, padding: 3, gap: 2 },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  toggleText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 10, color: '#666' },
});
