import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function BillSplitter() {
  const [total, setTotal] = useState('1200');
  const [people, setPeople] = useState('4');
  const [tip, setTip] = useState('10');
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const calculateSplit = () => {
    const bill = parseFloat(total) || 0;
    const num = parseFloat(people) || 1;
    const tipPct = parseFloat(tip) || 0;
    const tipAmt = (bill * tipPct) / 100;
    const grandTotal = bill + tipAmt;
    return { perPerson: grandTotal / num, tipTotal: tipAmt, grandTotal };
  };

  const { perPerson, tipTotal, grandTotal } = calculateSplit();

  const triggerSave = () => {
    saveHistory('split', `Bill: ₹${total}, Ppl: ${people}, Tip: ${tip}%`, `Per Person: ₹${perPerson.toFixed(2)}`);
    scheduleToolNotification('split');
  };

  return (
    <View style={styles.container}>
      <Header title="Bill Splitter" accentColor="#522B47" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Per Person</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>₹ {perPerson.toFixed(2)}</Text>
          <View style={styles.divider} />
          <View style={styles.statsRow}>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Total Tip</Text><Text style={styles.statValue}>₹ {tipTotal.toFixed(2)}</Text></View>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Grand Total</Text><Text style={styles.statValue}>₹ {grandTotal.toFixed(2)}</Text></View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Total Bill Amount (₹)</Text>
          <TextInput style={styles.input} value={total} onChangeText={setTotal} keyboardType="numeric" selectionColor="#522B47" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Number of People</Text>
          <TextInput style={styles.input} value={people} onChangeText={setPeople} keyboardType="numeric" selectionColor="#522B47" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Tip (%)</Text>
          <TextInput style={styles.input} value={tip} onChangeText={setTip} keyboardType="numeric" selectionColor="#522B47" onSubmitEditing={triggerSave}/>
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
  displayText: { fontFamily: 'DMSans_700Bold', color: '#522B47', fontSize: 42 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  statLabel: { fontFamily: 'DMSans_400Regular', color: Colors.textMuted, fontSize: 12 },
  statValue: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 16, marginTop: 4 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border }
});
