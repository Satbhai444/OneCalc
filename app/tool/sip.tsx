import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useThemeColor } from '../../hooks/use-theme-color';

export default function SIPCalculator() {
  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const card = useThemeColor({}, 'card');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function calculateSIP() {
    const P = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months);
    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      setResult('Please enter valid values.');
      return;
    }
    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setResult(`Maturity Value: ₹${FV.toFixed(2)}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 20 }}>
      <Text style={{ color: text, fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>SIP Calculator</Text>
      <View style={{ backgroundColor: card, borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <Text style={{ color: text, marginBottom: 8 }}>Monthly Investment (₹)</Text>
        <TextInput
          style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12 }}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="e.g. 5000"
        />
        <Text style={{ color: text, marginBottom: 8 }}>Annual Interest Rate (%)</Text>
        <TextInput
          style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12 }}
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
          placeholder="e.g. 12"
        />
        <Text style={{ color: text, marginBottom: 8 }}>Number of Months</Text>
        <TextInput
          style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12 }}
          keyboardType="numeric"
          value={months}
          onChangeText={setMonths}
          placeholder="e.g. 24"
        />
        <Button title="Calculate" onPress={calculateSIP} />
      </View>
      {result && (
        <View style={{ backgroundColor: card, borderRadius: 16, padding: 16 }}>
          <Text style={{ color: text, fontSize: 18 }}>{result}</Text>
        </View>
      )}
    </View>
  );
}
