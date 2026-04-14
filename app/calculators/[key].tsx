import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { useApp } from '../../context/AppContext';
import ToolShell from '../../components/ToolShell';
import { TOOL_CATEGORIES } from '../../constants/tool-categories';
import { ToolRegistry } from '../../components/tools';

const ToolPlaceholder = ({ name }: { name: string }) => {
  const { colors: Colors } = useApp();
  return (
    <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <Text style={{ fontSize: 18, color: '#666', textAlign: 'center', fontFamily: 'SpaceGrotesk_500Medium', lineHeight: 26 }}>
        The premium engine for {name} is being optimized for 100% industrial precision.{"\n\n"}
        <Text style={{ fontSize: 14, color: Colors.primary }}>Coming very soon in the next update!</Text>
      </Text>
    </View>
  );
};

export default function DynamicCalculator() {
  const { key } = useLocalSearchParams();
  const { colors: Colors } = useApp();

  const toolInfo = TOOL_CATEGORIES.flatMap(cat => cat.tools).find(t => t.key === key);

  if (!toolInfo) {
    return (
      <ToolShell title="Not Found">
        <View style={{ padding: 40, alignItems: 'center' }}>
          <Text style={{ color: Colors.text }}>Calculator not found.</Text>
        </View>
      </ToolShell>
    );
  }

  const CalculatorComponent = ToolRegistry[key as string];

  return (
    <ToolShell title={toolInfo.name}>
       {CalculatorComponent ? <CalculatorComponent /> : <ToolPlaceholder name={toolInfo.name} />}
    </ToolShell>
  );
}
