import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function EMICalculator() {
  const [loan, setLoan] = useState('100000');
  const [rate, setRate] = useState('10.5');
  const [tenure, setTenure] = useState('12');
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const calculateEMI = () => {
    const P = parseFloat(loan) || 0;
    const R = (parseFloat(rate) || 0) / 12 / 100;
    const N = parseFloat(tenure) || 0;
    if (R === 0) return (P / N).toFixed(0);
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return isFinite(emi) ? emi.toFixed(0) : '0';
  };

  const emi = calculateEMI();
  const totalPayment = (parseFloat(emi) * (parseFloat(tenure) || 0)) || 0;
  const totalInterest = totalPayment - (parseFloat(loan) || 0);

  const triggerSave = () => {
    saveHistory('emi', `L: ₹${loan}, R: ${rate}%, T: ${tenure}m`, `EMI: ₹${emi}`);
    scheduleToolNotification('emi');
  };

  return (
    <View style={styles.container}>
      <Header title="EMI Calculator" accentColor="#FF8F00" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Monthly EMI</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>₹ {emi}</Text>
          <View style={styles.divider} />
          <View style={styles.statsRow}>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Total Interest</Text><Text style={styles.statValue}>₹ {totalInterest.toFixed(0)}</Text></View>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Total Payment</Text><Text style={styles.statValue}>₹ {totalPayment.toFixed(0)}</Text></View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Loan Amount (₹)</Text>
          <TextInput style={styles.input} value={loan} onChangeText={setLoan} keyboardType="numeric" selectionColor="#FF8F00" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Interest Rate (% p.a.)</Text>
          <TextInput style={styles.input} value={rate} onChangeText={setRate} keyboardType="numeric" selectionColor="#FF8F00" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Tenure (Months)</Text>
          <TextInput style={styles.input} value={tenure} onChangeText={setTenure} keyboardType="numeric" selectionColor="#FF8F00" onSubmitEditing={triggerSave}/>
        </View>

      </ScrollView>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20 },
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border, elevation: 2 },
  displayLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14, marginBottom: 8 },
  displayText: { fontFamily: 'DMSans_700Bold', color: '#FF8F00', fontSize: 42 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  statLabel: { fontFamily: 'DMSans_400Regular', color: Colors.textMuted, fontSize: 12 },
  statValue: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 16, marginTop: 4 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border }
});
