import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function QuadraticSolver() {
  const { colors: Colors } = useApp();
  const [a, setA] = useState('1');
  const [b, setB] = useState('5');
  const [c, setC] = useState('6');
  
  const [result, setResult] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  useEffect(() => {
    const va = parseFloat(a);
    const vb = parseFloat(b);
    const vc = parseFloat(c);

    if (isNaN(va) || isNaN(vb) || isNaN(vc)) return;
    if (va === 0) {
      setResult('Not a quadratic (a=0)');
      return;
    }

    const d = vb * vb - 4 * va * vc;
    if (d > 0) {
      const x1 = (-vb + Math.sqrt(d)) / (2 * va);
      const x2 = (-vb - Math.sqrt(d)) / (2 * va);
      setResult(`x₁ = ${x1.toFixed(4)}\nx₂ = ${x2.toFixed(4)}`);
      setDesc(`Discriminant (D) = ${d}. Two distinct real roots.`);
    } else if (d === 0) {
      const x = -vb / (2 * va);
      setResult(`x = ${x.toFixed(4)}`);
      setDesc(`Discriminant (D) = 0. One real root (repeated).`);
    } else {
      const real = -vb / (2 * va);
      const imag = Math.sqrt(-d) / (2 * va);
      setResult(`x₁ = ${real.toFixed(4)} + ${imag.toFixed(4)}i\nx₂ = ${real.toFixed(4)} - ${imag.toFixed(4)}i`);
      setDesc(`Discriminant (D) = ${d}. Two complex roots.`);
    }
  }, [a, b, c]);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.formulaCard, { backgroundColor: Colors.primary }]}>
         <Text style={styles.formulaText}>ax² + bx + c = 0</Text>
      </View>

      <View style={styles.inputGrid}>
          <View style={styles.inputWrapper}>
             <Text style={[styles.label, { color: Colors.textMuted }]}>a</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={a} onChangeText={setA} keyboardType="numeric" />
          </View>
          <View style={styles.inputWrapper}>
             <Text style={[styles.label, { color: Colors.textMuted }]}>b</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={b} onChangeText={setB} keyboardType="numeric" />
          </View>
          <View style={styles.inputWrapper}>
             <Text style={[styles.label, { color: Colors.textMuted }]}>c</Text>
             <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={c} onChangeText={setC} keyboardType="numeric" />
          </View>
      </View>

      <View style={[styles.resultBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.resTitle, { color: Colors.primary }]}>SOLUTIONS</Text>
         <Text style={[styles.resText, { color: Colors.text }]}>{result}</Text>
         <View style={[styles.divider, { backgroundColor: Colors.border }]} />
         <Text style={[styles.descText, { color: Colors.textMuted }]}>{desc}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  formulaCard: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 30 },
  formulaText: { color: '#FFF', fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold' },
  inputGrid: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  inputWrapper: { flex: 1, gap: 8 },
  label: { fontSize: 12, fontFamily: 'SpaceGrotesk_700Bold', textAlign: 'center' },
  input: { height: 60, borderRadius: 16, borderHorizontal: 1, textAlign: 'center', fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
  resultBox: { padding: 24, borderRadius: 24, borderWidth: 1, gap: 10 },
  resTitle: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  resText: { fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', lineHeight: 34 },
  divider: { height: 1, width: '100%', marginVertical: 10 },
  descText: { fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium', fontStyle: 'italic' }
});
