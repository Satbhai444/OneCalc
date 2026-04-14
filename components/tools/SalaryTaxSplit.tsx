import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function SalaryTaxSplit() {
  const { colors: Colors } = useApp();
  const [salary, setSalary] = useState('1000000');
  
  const [tax, setTax] = useState(0);
  const [takeHome, setTakeHome] = useState(0);
  const [monthlyTakeHome, setMonthlyTakeHome] = useState(0);

  useEffect(() => {
    const s = parseFloat(salary) || 0;
    // Basic India New Regime logic for split
    let t = 0;
    if (s > 1500000) t = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + 300000 * 0.20 + (s - 1500000) * 0.30;
    else if (s > 1200000) t = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + (s - 1200000) * 0.20;
    else if (s > 900000) t = 300000 * 0.05 + 300000 * 0.10 + (s - 900000) * 0.15;
    else if (s > 600000) t = 300000 * 0.05 + (s - 600000) * 0.10;
    else if (s > 300000) t = (s - 300000) * 0.05;

    setTax(t);
    setTakeHome(s - t);
    setMonthlyTakeHome((s - t) / 12);
  }, [salary]);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors.text }]}>Gross Annual Salary (₹)</Text>
      <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={salary} onChangeText={setSalary} keyboardType="numeric" />

      <View style={styles.chart}>
         <View style={[styles.stat, { backgroundColor: Colors.primary + '15' }]}>
            <Text style={[styles.statLabel, { color: Colors.textMuted }]}>Take Home (Annual)</Text>
            <Text style={[styles.statValue, { color: Colors.primary }]}>₹ {takeHome.toLocaleString()}</Text>
         </View>
         <View style={[styles.stat, { backgroundColor: '#EF444415' }]}>
            <Text style={[styles.statLabel, { color: Colors.textMuted }]}>Tax Paid</Text>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>₹ {tax.toLocaleString()}</Text>
         </View>
         <View style={[styles.stat, { backgroundColor: '#10B98115' }]}>
            <Text style={[styles.statLabel, { color: Colors.textMuted }]}>Monthly Take Home</Text>
            <Text style={[styles.statValue, { color: '#10B981' }]}>₹ {Math.round(monthlyTakeHome).toLocaleString()}</Text>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 30 },
  chart: { gap: 16 },
  stat: { padding: 24, borderRadius: 24, gap: 4 },
  statLabel: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 32 },
});
