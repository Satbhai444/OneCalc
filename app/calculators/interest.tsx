import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('10');
  const [time, setTime] = useState('2');
  const [isCompound, setIsCompound] = useState(false);
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const R = parseFloat(rate) || 0;
    const T = parseFloat(time) || 0;
    if (isCompound) {
      const A = P * Math.pow((1 + R / 100), T);
      return { interest: A - P, total: A };
    } else {
      const I = (P * R * T) / 100;
      return { interest: I, total: P + I };
    }
  };

  const { interest, total } = calculate();

  const triggerSave = () => {
    saveHistory('interest', `${isCompound ? 'CI' : 'SI'} P:₹${principal}, R:${rate}%, T:${time}Y`, `Total: ₹${total.toFixed(2)}`);
    scheduleToolNotification('interest');
  };

  return (
    <View style={styles.container}>
      <Header title="Interest Calculator" accentColor="#FFB300" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>{isCompound ? 'Total Amount (A)' : 'Total Amount (P + SI)'}</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>₹ {total.toFixed(0)}</Text>
          <View style={styles.divider} />
          <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Total Interest</Text><Text style={styles.statValue}>₹ {interest.toFixed(0)}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity style={[styles.toggleBtn, !isCompound && styles.toggleBtnActive]} onPress={() => { triggerHaptic(); setIsCompound(false); }}><Text style={[styles.toggleText, !isCompound && styles.toggleTextActive]}>Simple (SI)</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.toggleBtn, isCompound && styles.toggleBtnActive]} onPress={() => { triggerHaptic(); setIsCompound(true); }}><Text style={[styles.toggleText, isCompound && styles.toggleTextActive]}>Compound (CI)</Text></TouchableOpacity>
          </View>

          <Text style={styles.label}>Principal Amount (₹)</Text>
          <TextInput style={styles.input} value={principal} onChangeText={setPrincipal} keyboardType="numeric" selectionColor="#FFB300" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Rate (% p.a.)</Text>
          <TextInput style={styles.input} value={rate} onChangeText={setRate} keyboardType="numeric" selectionColor="#FFB300" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Duration (Years)</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} keyboardType="numeric" selectionColor="#FFB300" onSubmitEditing={triggerSave}/>
        </View>

      </ScrollView>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20 },
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  displayLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14, marginBottom: 8 },
  displayText: { fontFamily: 'DMSans_700Bold', color: '#FFB300', fontSize: 36 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  statLabel: { fontFamily: 'DMSans_400Regular', color: Colors.textMuted, fontSize: 12 },
  statValue: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 20, marginTop: 4 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  toggleRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  toggleBtnActive: { backgroundColor: '#FFB300', borderColor: '#FFB300' },
  toggleText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  toggleTextActive: { color: '#FFFFFF' }
});
