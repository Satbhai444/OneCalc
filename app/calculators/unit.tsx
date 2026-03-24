import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { Picker } from '@react-native-picker/picker';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

const CONVERSIONS = {
  Length: { M: 1, KM: 0.001, CM: 100, MM: 1000, IN: 39.37, FT: 3.28 },
  Weight: { KG: 1, G: 1000, MG: 1000000, LB: 2.2046, OZ: 35.27 },
  Temp: { C: 'C', F: 'F', K: 'K' }, // Needs custom logic
};

export default function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof CONVERSIONS>('Length');
  const [fromUnit, setFromUnit] = useState('M');
  const [toUnit, setToUnit] = useState('KM');
  const [amount, setAmount] = useState('1000');
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    if (category === 'Temp') {
      if (fromUnit === toUnit) return amt;
      if (fromUnit === 'C' && toUnit === 'F') return (amt * 9/5) + 32;
      if (fromUnit === 'F' && toUnit === 'C') return (amt - 32) * 5/9;
      if (fromUnit === 'C' && toUnit === 'K') return amt + 273.15;
      if (fromUnit === 'K' && toUnit === 'C') return amt - 273.15;
      return amt;
    } else {
      const units = CONVERSIONS[category] as any;
      const base = amt / units[fromUnit];
      return base * units[toUnit];
    }
  };

  const result = calculate();

  const triggerSave = () => {
    saveHistory('unit', `${amount} ${fromUnit}`, `${result.toFixed(4).replace(/\.?0+$/, '')} ${toUnit}`);
    scheduleToolNotification('unit');
  };

  return (
    <View style={styles.container}>
      <Header title="Unit Converter" accentColor="#00BCD4" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Converted Value</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {result.toFixed(4).replace(/\.?0+$/, '')} <Text style={styles.displaySub}>{toUnit}</Text>
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.ratesRow}>
            {Object.keys(CONVERSIONS).map(cat => (
              <TouchableOpacity key={cat} style={[styles.rateBtn, category === cat && styles.rateBtnActive]} onPress={() => { triggerHaptic(); setCategory(cat as any); const u = Object.keys(CONVERSIONS[cat as keyof typeof CONVERSIONS]); setFromUnit(u[0]); setToUnit(u[1] || u[0]); }}>
                <Text style={[styles.rateBtnText, category === cat && styles.rateBtnTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Amount</Text>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" selectionColor="#BAD7F2" onSubmitEditing={triggerSave}/>

          <View style={styles.row}>
            <View style={{flex:1}}>
              <Text style={styles.label}>From</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={fromUnit} onValueChange={(v) => { triggerHaptic(); setFromUnit(v); }}>
                  {Object.keys(CONVERSIONS[category]).map(u => <Picker.Item key={u} label={u} value={u} />)}
                </Picker>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.label}>To</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={toUnit} onValueChange={(v) => { triggerHaptic(); setToUnit(v); }}>
                  {Object.keys(CONVERSIONS[category]).map(u => <Picker.Item key={u} label={u} value={u} />)}
                </Picker>
              </View>
            </View>
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
  displayText: { fontFamily: 'DMSans_700Bold', color: '#4A90D9', fontSize: 36 },
  displaySub: { fontSize: 20, color: Colors.textMuted },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  ratesRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  rateBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  rateBtnActive: { backgroundColor: '#4A90D9', borderColor: '#4A90D9' },
  rateBtnText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  rateBtnTextActive: { color: '#FFFFFF' },
  row: { flexDirection: 'row', gap: 12 },
  pickerWrapper: { backgroundColor: Colors.background, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' }
});
