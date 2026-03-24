import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

const SHAPES = {
  Square: { labels: ['Side (a)'], calc: (s: number[]) => ({ area: s[0] * s[0], volume: 'N/A' }) },
  Circle: { labels: ['Radius (r)'], calc: (s: number[]) => ({ area: Math.PI * s[0] * s[0], volume: 'N/A' }) },
  Cube: { labels: ['Side (a)'], calc: (s: number[]) => ({ area: 6 * s[0] * s[0], volume: s[0] * s[0] * s[0] }) },
  Cylinder: { labels: ['Radius (r)', 'Height (h)'], calc: (s: number[]) => ({ area: 2 * Math.PI * s[0] * (s[0] + s[1]), volume: Math.PI * s[0] * s[0] * s[1] }) },
};

export default function AreaVolume() {
  const [shape, setShape] = useState<keyof typeof SHAPES>('Square');
  const [inputs, setInputs] = useState(['10', '0']);
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const calculate = () => {
    const vals = inputs.map(v => parseFloat(v) || 0);
    return SHAPES[shape].calc(vals);
  };

  const { area, volume } = calculate();

  const triggerSave = () => {
    saveHistory('shapes', `${shape} (${inputs.filter((_,i)=>i<SHAPES[shape].labels.length).join(', ')})`, `A: ${typeof area === 'number' ? area.toFixed(2) : area}, V: ${typeof volume === 'number' ? volume.toFixed(2) : volume}`);
    scheduleToolNotification('shapes');
  };

  return (
    <View style={styles.container}>
      <Header title="Area & Volume" accentColor="#00897B" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Surface Area</Text><Text style={styles.statValue}>{typeof area === 'number' ? area.toFixed(2) : area}</Text></View>
          <View style={styles.divider} />
          <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Volume</Text><Text style={styles.statValue}>{typeof volume === 'number' ? volume.toFixed(2) : volume}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Shape</Text>
          <View style={styles.ratesRow}>
            {Object.keys(SHAPES).map(sh => (
              <TouchableOpacity key={sh} style={[styles.rateBtn, shape === sh && styles.rateBtnActive]} onPress={() => { triggerHaptic(); setShape(sh as any); setInputs(['0', '0']); }}>
                <Text style={[styles.rateBtnText, shape === sh && styles.rateBtnTextActive]}>{sh}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {SHAPES[shape].labels.map((l, idx) => (
            <View key={idx}>
              <Text style={styles.label}>{l}</Text>
              <TextInput style={styles.input} value={inputs[idx]} onChangeText={(v) => { const n = [...inputs]; n[idx] = v; setInputs(n); }} keyboardType="numeric" selectionColor="#00897B" onSubmitEditing={triggerSave}/>
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
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  statLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 13, marginBottom: 4 },
  statValue: { fontFamily: 'DMSans_700Bold', color: '#00897B', fontSize: 32 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  ratesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  rateBtn: { paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  rateBtnActive: { backgroundColor: '#00897B', borderColor: '#00897B' },
  rateBtnText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  rateBtnTextActive: { color: '#FFFFFF' }
});
