import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function SIPCalculator() {
  const { colors: Colors } = useApp();
  const [investment, setInvestment] = useState('5000');
  const [rate, setRate] = useState('12');
  const [tenure, setTenure] = useState('10');

  const [totalValue, setTotalValue] = useState('0');
  const [investedAmount, setInvestedAmount] = useState('0');
  const [returns, setReturns] = useState('0');

  useEffect(() => {
    const P = parseFloat(investment) || 0;
    const i = (parseFloat(rate) || 0) / 12 / 100;
    const n = (parseFloat(tenure) || 0) * 12;

    if (P > 0 && n > 0) {
      // SIP Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
      let finalValue = 0;
      if (i > 0) {
        finalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      } else {
        finalValue = P * n;
      }
      
      const totalInv = P * n;
      const gain = finalValue - totalInv;

      setTotalValue(finalValue.toFixed(0));
      setInvestedAmount(totalInv.toFixed(0));
      setReturns(gain.toFixed(0));
    }
  }, [investment, rate, tenure]);

  return (
    <View style={styles.container}>
      {/* Result Card */}
      <View style={[styles.resultCard, { backgroundColor: Colors.secondary }]}>
        <Text style={styles.resultLabel}>Expected Maturity Amount</Text>
        <Text style={styles.resultValue}>₹ {Number(totalValue).toLocaleString('en-IN')}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Wealth Gained</Text>
            <Text style={styles.statValue}>₹ {Number(returns).toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Investment</Text>
            <Text style={styles.statValue}>₹ {Number(investedAmount).toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </View>

      {/* Visual Indicator */}
      <View style={styles.progressContainer}>
         <View style={[styles.progressBar, { backgroundColor: Colors.secondary + '30' }]}>
            <View style={[styles.progressFill, { width: `${(Number(returns) / Number(totalValue)) * 100 || 0}%`, backgroundColor: '#34D399' }]} />
         </View>
         <View style={styles.progressLabels}>
            <Text style={[styles.progressText, { color: Colors.textMuted }]}>Invested</Text>
            <Text style={[styles.progressText, { color: Colors.textMuted }]}>Gains ({((Number(returns) / Number(totalValue)) * 100 || 0).toFixed(1)}%)</Text>
         </View>
      </View>

      {/* Inputs */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: Colors.text }]}>Monthly Investment</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={investment}
          onChangeText={setInvestment}
          keyboardType="numeric"
          placeholder="e.g. 5000"
          placeholderTextColor={Colors.textMuted}
        />

        <Text style={[styles.label, { color: Colors.text }]}>Expected Return Rate (% p.a.)</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={rate}
          onChangeText={setRate}
          keyboardType="numeric"
          placeholder="e.g. 12"
          placeholderTextColor={Colors.textMuted}
        />

        <Text style={[styles.label, { color: Colors.text }]}>Time Period (Years)</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={tenure}
          onChangeText={setTenure}
          keyboardType="numeric"
          placeholder="e.g. 10"
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
});
