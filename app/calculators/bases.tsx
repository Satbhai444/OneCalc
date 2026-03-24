import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function NumberBases() {
  const [input, setInput] = useState('10');
  const [fromBase, setFromBase] = useState(10);
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const convert = (val: string, from: number) => {
    try {
      if (!val) return { dec: '', bin: '', hex: '', oct: '' };
      const num = parseInt(val, from);
      if (isNaN(num)) return { dec: 'Err', bin: 'Err', hex: 'Err', oct: 'Err' };
      return {
        dec: num.toString(10),
        bin: num.toString(2),
        hex: num.toString(16).toUpperCase(),
        oct: num.toString(8)
      };
    } catch { return { dec: 'Err', bin: 'Err', hex: 'Err', oct: 'Err' }; }
  };

  const results = convert(input, fromBase);
  const bases = [
    { label: 'Decimal (10)', value: 10, result: results.dec },
    { label: 'Binary (2)', value: 2, result: results.bin },
    { label: 'Hexadecimal (16)', value: 16, result: results.hex },
    { label: 'Octal (8)', value: 8, result: results.oct },
  ];

  const triggerSave = () => {
    saveHistory('bases', `Val: ${input} (B:${fromBase})`, `Dec:${results.dec}, Bin:${results.bin}, Hex:${results.hex}`);
    scheduleToolNotification('bases');
  };

  return (
    <View style={styles.container}>
      <Header title="Number System" accentColor="#6200EA" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.card}>
          <Text style={styles.label}>Input Base</Text>
          <View style={styles.toggleRow}>
            {[10, 2, 16, 8].map(b => (
              <TouchableOpacity key={b} style={[styles.toggleBtn, fromBase === b && styles.toggleBtnActive]} onPress={() => { triggerHaptic(); setFromBase(b); }}>
                <Text style={[styles.toggleText, fromBase === b && styles.toggleTextActive]}>{b === 16 ? 'HEX' : b === 10 ? 'DEC' : b === 2 ? 'BIN' : 'OCT'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Value</Text>
          <TextInput style={styles.input} value={input} onChangeText={setInput} autoCapitalize="characters" selectionColor="#6200EA" onSubmitEditing={triggerSave}/>
        </View>

        <View style={styles.resultsCard}>
          {bases.map(b => (
            <View key={b.value} style={styles.resultRow}>
              <Text style={styles.resLabel}>{b.label}</Text>
              <Text style={[styles.resValue, fromBase === b.value && { color: '#6200EA' }]} numberOfLines={1} adjustsFontSizeToFit>{b.result}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.border },
  toggleRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  toggleBtnActive: { backgroundColor: '#6200EA', borderColor: '#6200EA' },
  toggleText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 13 },
  toggleTextActive: { color: '#FFFFFF' },
  resultsCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  resultRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  resLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 12, marginBottom: 4 },
  resValue: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 20 }
});
