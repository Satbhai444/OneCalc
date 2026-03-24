import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function GSTCalculator() {
  const [amount, setAmount] = useState('1000');
  const [gstRate, setGstRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const calculateGST = () => {
    const amt = parseFloat(amount) || 0;
    if (isInclusive) {
      const original = amt / (1 + gstRate / 100);
      const gst = amt - original;
      return { cgst: gst / 2, sgst: gst / 2, total: amt, original };
    } else {
      const gst = (amt * gstRate) / 100;
      return { cgst: gst / 2, sgst: gst / 2, total: amt + gst, original: amt };
    }
  };

  const { cgst, sgst, total, original } = calculateGST();
  const rates = [5, 12, 18, 28];

  const triggerSave = () => {
    saveHistory('gst', `Amt: ₹${amount}, rate: ${gstRate}%, ${isInclusive ? 'Inc' : 'Exc'}`, `Total: ₹${total.toFixed(2)}`);
    scheduleToolNotification('gst');
  };

  return (
    <View style={styles.container}>
      <Header title="GST Calculator" accentColor="#FF6B00" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Total Amount</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>₹ {total.toFixed(2)}</Text>
          <View style={styles.divider} />
          <View style={styles.statsRow}>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>CGST</Text><Text style={styles.statValue}>₹ {cgst.toFixed(2)}</Text></View>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>SGST</Text><Text style={styles.statValue}>₹ {sgst.toFixed(2)}</Text></View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Initial Amount (₹)</Text>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" selectionColor="#FF6B00" onSubmitEditing={triggerSave}/>

          <Text style={styles.label}>GST Rate (%)</Text>
          <View style={styles.ratesRow}>
            {rates.map(r => (
              <TouchableOpacity key={r} style={[styles.rateBtn, gstRate === r && styles.rateBtnActive]} onPress={() => { triggerHaptic(); setGstRate(r); }}>
                <Text style={[styles.rateBtnText, gstRate === r && styles.rateBtnTextActive]}>{r}%</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Type</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity style={[styles.toggleBtn, !isInclusive && styles.toggleBtnActive]} onPress={() => { triggerHaptic(); setIsInclusive(false); }}><Text style={[styles.toggleText, !isInclusive && styles.toggleTextActive]}>Exclusive</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.toggleBtn, isInclusive && styles.toggleBtnActive]} onPress={() => { triggerHaptic(); setIsInclusive(true); }}><Text style={[styles.toggleText, isInclusive && styles.toggleTextActive]}>Inclusive</Text></TouchableOpacity>
          </View>
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
  displayText: { fontFamily: 'DMSans_700Bold', color: '#FF6B00', fontSize: 36 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  statLabel: { fontFamily: 'DMSans_400Regular', color: Colors.textMuted, fontSize: 12 },
  statValue: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 16, marginTop: 4 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  ratesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, gap: 8 },
  rateBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  rateBtnActive: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  rateBtnText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  rateBtnTextActive: { color: '#FFFFFF' },
  toggleRow: { flexDirection: 'row', gap: 12 },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  toggleBtnActive: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  toggleText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  toggleTextActive: { color: '#FFFFFF' }
});
