import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function CurrencyTool() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MaterialCommunityIcons name="currency-usd" size={48} color="#888" />
      <Text style={{ fontSize: 24, marginTop: 16 }}>Currency Converter</Text>
      <Text style={{ color: '#888', marginTop: 8 }}>[Placeholder screen]</Text>
    </View>
  );
}