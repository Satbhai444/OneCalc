import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function EMITool() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MaterialCommunityIcons name="bank" size={48} color="#888" />
      <Text style={{ fontSize: 24, marginTop: 16 }}>EMI Calculator</Text>
      <Text style={{ color: '#888', marginTop: 8 }}>[Placeholder screen]</Text>
    </View>
  );
}