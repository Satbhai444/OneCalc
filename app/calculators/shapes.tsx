import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

const SHAPES_2D = {
  Square: { 
    labels: ['Side (a)'], 
    formula: 'A = a²', 
    calc: (s: number[]) => ({ primary: s[0] * s[0], secondary: 4 * s[0] }) 
  },
  Rectangle: { 
    labels: ['Length (l)', 'Width (w)'], 
    formula: 'A = l × w', 
    calc: (s: number[]) => ({ primary: s[0] * s[1], secondary: 2 * (s[0] + s[1]) }) 
  },
  Triangle: { 
    labels: ['Base (b)', 'Height (h)', 'Side 2', 'Side 3'], 
    formula: 'A = ½ × b × h', 
    calc: (s: number[]) => ({ primary: 0.5 * s[0] * s[1], secondary: s[0] + s[2] + s[3] }) 
  },
  Circle: { 
    labels: ['Radius (r)'], 
    formula: 'A = π × r²', 
    calc: (s: number[]) => ({ primary: Math.PI * s[0] * s[0], secondary: 2 * Math.PI * s[0] }) 
  },
};

const SHAPES_3D = {
  Cube: { 
    labels: ['Side (a)'], 
    formula: 'V = a³', 
    calc: (s: number[]) => ({ primary: 6 * s[0] * s[0], secondary: s[0] * s[0] * s[0] }) 
  },
  Cylinder: { 
    labels: ['Radius (r)', 'Height (h)'], 
    formula: 'V = π × r² × h', 
    calc: (s: number[]) => ({ primary: 2 * Math.PI * s[0] * (s[0] + s[1]), secondary: Math.PI * s[0] * s[0] * s[1] }) 
  },
  Sphere: { 
    labels: ['Radius (r)'], 
    formula: 'V = ⁴⁄₃ × π × r³', 
    calc: (s: number[]) => ({ primary: 4 * Math.PI * s[0] * s[0], secondary: (4/3) * Math.PI * Math.pow(s[0], 3) }) 
  },
  Cone: { 
    labels: ['Radius (r)', 'Height (h)', 'Slant (s)'], 
    formula: 'V = ⅓ × π × r² × h', 
    calc: (s: number[]) => ({ primary: Math.PI * s[0] * (s[0] + (s[2]||Math.sqrt(s[0]*s[0]+s[1]*s[1]))), secondary: (1/3) * Math.PI * s[0] * s[0] * s[1] }) 
  },
};

export default function AreaVolume() {
  const [activeTab, setActiveTab] = useState<'2D' | '3D'>('3D');
  const [shape2D, setShape2D] = useState<keyof typeof SHAPES_2D>('Square');
  const [shape3D, setShape3D] = useState<keyof typeof SHAPES_3D>('Cube');
  
  const [inputs, setInputs] = useState(['10', '0', '0', '0']);
  
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const activeShapes = activeTab === '2D' ? SHAPES_2D : SHAPES_3D;
  const currentShape = activeTab === '2D' ? shape2D : shape3D;
  const currentDef = (activeShapes as any)[currentShape as string];

  const calculate = () => currentDef.calc(inputs.map(v => parseFloat(v) || 0));

  const { primary, secondary } = calculate();

  const labelOne = activeTab === '2D' ? 'Area' : 'Surface Area';
  const labelTwo = activeTab === '2D' ? 'Perimeter' : 'Volume';

  const triggerSave = () => {
    saveHistory('shapes', `${currentShape} (${inputs.filter((_,i)=>i<currentDef.labels.length).join(', ')})`, `${labelOne}: ${typeof primary === 'number' ? primary.toFixed(2) : primary}, ${labelTwo}: ${typeof secondary === 'number' ? secondary.toFixed(2) : secondary}`);
    scheduleToolNotification('shapes');
  };

  return (
    <View style={styles.container}>
      <Header title="Area & Volume" accentColor="#00897B" showBack={true} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === '2D' && styles.activeTab]} onPress={() => { setActiveTab('2D'); triggerHaptic(); setInputs(['10', '0', '0', '0']); }}>
          <Text style={[styles.tabText, activeTab === '2D' && styles.activeTabText]}>2D Shapes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === '3D' && styles.activeTab]} onPress={() => { setActiveTab('3D'); triggerHaptic(); setInputs(['10', '0', '0', '0']); }}>
          <Text style={[styles.tabText, activeTab === '3D' && styles.activeTabText]}>3D Shapes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <View style={{alignItems:'center'}}>
             <Text style={styles.statLabel}>{labelOne}</Text>
             <Text style={styles.statValue}>{typeof primary === 'number' ? primary.toFixed(2) : primary}</Text>
          </View>
          <View style={styles.divider} />
          <View style={{alignItems:'center'}}>
             <Text style={styles.statLabel}>{labelTwo}</Text>
             <Text style={styles.statValue}>{typeof secondary === 'number' ? secondary.toFixed(2) : secondary}</Text>
          </View>
          
          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>Formula: {currentDef.formula}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Select Shape</Text>
          <View style={styles.ratesRow}>
            {Object.keys(activeShapes).map(sh => (
              <TouchableOpacity key={sh} style={[styles.rateBtn, currentShape === sh && styles.rateBtnActive]} onPress={() => { 
                triggerHaptic(); 
                if (activeTab === '2D') setShape2D(sh as any); else setShape3D(sh as any);
                setInputs(['0', '0', '0', '0']); 
              }}>
                <Text style={[styles.rateBtnText, currentShape === sh && styles.rateBtnTextActive]}>{sh}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {currentDef.labels.map((l: string, idx: number) => (
            <View key={idx}>
              <Text style={styles.label}>{l}</Text>
              <TextInput 
                style={styles.input} 
                value={inputs[idx]} 
                onChangeText={(v) => { const n = [...inputs]; n[idx] = v; setInputs(n); }} 
                keyboardType="numeric" 
                selectionColor="#00897B" 
                onSubmitEditing={triggerSave}
              />
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  tabContainer: { flexDirection: 'row', backgroundColor: Colors.cardBg, borderBottomWidth: 1, borderBottomColor: Colors.border, paddingTop: 12 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#00897B' },
  tabText: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14 },
  activeTabText: { fontFamily: 'DMSans_700Bold', color: '#00897B' },
  contentContainer: { padding: 20 },
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 },
  statLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 13, marginBottom: 4 },
  statValue: { fontFamily: 'DMSans_700Bold', color: '#00897B', fontSize: 32 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  formulaBox: { marginTop: 16, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: Colors.background, borderRadius: 12, borderWidth: 1, borderColor: Colors.border },
  formulaText: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 13 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  ratesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  rateBtn: { paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  rateBtnActive: { backgroundColor: '#00897B', borderColor: '#00897B' },
  rateBtnText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  rateBtnTextActive: { color: '#FFFFFF' }
});
