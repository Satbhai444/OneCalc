import { useRouter, useLocalSearchParams } from 'expo-router';
import { TOOL_CATEGORIES } from '../../constants/tool-categories';
import { useThemeColor } from '../../hooks/use-theme-color';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function CategoryToolsScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');

  const cat = TOOL_CATEGORIES.find(c => c.key === category);
  if (!cat) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
        <Text style={{ color: text, fontSize: 18 }}>Category not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: text, marginBottom: 24 }}>{cat.icon} {cat.name}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {cat.tools.map(tool => (
          <TouchableOpacity
            key={tool.key}
            style={{
              width: '47%',
              aspectRatio: 1.2,
              backgroundColor: useThemeColor({}, 'card'),
              borderRadius: 16,
              marginBottom: 16,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2
            }}
            onPress={() => router.push(`/tool/${tool.key}`)}
          >
            <Text style={{ fontSize: 22, marginBottom: 8 }}>{tool.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
