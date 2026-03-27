import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function NumberBases() {
  const [values, setValues] = useState({ dec: '10', bin: '1010', hex: 'A', oct: '12' });
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const updateAll = (val: string, fromBase: number) => {
    triggerHaptic();
    if (!val) {
      setValues({ dec: '', bin: '', hex: '', oct: '' });
      return;
    }

    try {
      const num = parseInt(val, fromBase);
      if (isNaN(num)) return; // Don't update if invalid for this base

      setValues({
        dec: num.toString(10),
        bin: num.toString(2),
        hex: num.toString(16).toUpperCase(),
        oct: num.toString(8)
      });
    } catch (e) {
      console.log("Conversion Error", e);
    }
  };

  const triggerSave = () => {
    saveHistory('bases', `Decimal: ${values.dec}`, `Bin: ${values.bin}, Hex: ${values.hex}`);
    scheduleToolNotification('bases');
  };

  const InputField = ({ label, value, base, placeholder }: { label: string, value: string, base: number, placeholder: string }) => (
    <View style={styles.inputCard}>
      <View style={styles.labelRow}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Text style={styles.baseTag}>Base {base}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => updateAll(text, base)}
        autoCapitalize="characters"
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        selectionColor="#6200EA"
        onSubmitEditing={triggerSave}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Number System" accentColor="#6200EA" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.infoCard}>
           <Text style={styles.infoText}>Type in any field to convert instantly across all number systems.</Text>
        </View>

        <InputField label="Decimal" value={values.dec} base={10} placeholder="0-9" />
        <InputField label="Binary" value={values.bin} base={2} placeholder="0-1" />
        <InputField label="Hexadecimal" value={values.hex} base={16} placeholder="0-9, A-F" />
        <InputField label="Octal" value={values.oct} base={8} placeholder="0-7" />

      </ScrollView>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20 },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.border },
  infoCard: { backgroundColor: '#EDE7F6', padding: 16, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: '#D1C4E9' },
  infoText: { fontFamily: 'DMSans_500Medium', color: '#512DA8', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  inputCard: { backgroundColor: Colors.cardBg, borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  inputLabel: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  baseTag: { fontFamily: 'DMSans_700Bold', color: Colors.textMuted, fontSize: 10, backgroundColor: Colors.background, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: Colors.border }
});
