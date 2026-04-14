
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TOOL_CATEGORIES } from '../../constants/tool-categories';
import { useThemeColor } from '../../hooks/use-theme-color';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { Colors, LightTheme, DarkTheme } from '../../constants/Colors';


export default function CategoryToolsScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const card = useThemeColor({}, 'card');
  const { colors: themeColors, favorites, toggleFavorite, effectiveTheme } = useApp();

  // Get category and color mapping
  const cat = TOOL_CATEGORIES.find(c => c.key === category);
  if (!cat) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
        <Text style={{ color: text, fontSize: 18 }}>Category not found.</Text>
      </View>
    );
  }

  // Tool color mapping (fallback to card color)
  const toolColors = themeColors.tools || LightTheme.tools;

  // Icon mapping for tools (add more as needed)
  const toolIcons: Record<string, string> = {
    basic: 'calculator',
    scientific: 'function-variant',
    currency: 'currency-usd',
    emi: 'bank',
    gst: 'receipt',
    interest: 'chart-line',
    age: 'calendar-heart',
    split: 'account-group',
    unit: 'swap-horizontal',
    discount: 'sale',
    bases: 'code-tags',
    shapes: 'shape',
    fd: 'cash',
    tax: 'file-percent',
    investment: 'chart-bar',
    mortgage: 'home-currency-usd',
    'unit-price': 'tag',
    percentage: 'percent',
    'percentage-change': 'percent',
    'split-bill': 'account-multiple',
    tip: 'cash-fast',
    'loan-eligibility': 'account-cash',
    retirement: 'calendar-star',
    'emi-foreclosure': 'calendar-remove',
    'emi-date-reminder': 'calendar-clock',
    'loan-prepayment': 'cash-refund',
    'gst-reverse': 'receipt-text',
    'salary-tax-split': 'account-cash',
    'emi-interest-split': 'chart-pie',
    // Add more mappings as needed
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: text, marginBottom: 24 }}>{cat.icon} {cat.name}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {cat.tools.map(tool => {
          // Pick color for this tool
          const colorObj = toolColors[tool.key] || { btn: card };
          const cardColor = colorObj.btn || card;
          const iconName = toolIcons[tool.key] || undefined;
          const isFav = favorites.includes(tool.key);
          return (
            <View
              key={tool.key}
              style={{
                width: '47%',
                aspectRatio: 1.2,
                backgroundColor: cardColor,
                borderRadius: 18,
                marginBottom: 16,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                borderWidth: 1,
                borderColor: themeColors.border,
                position: 'relative',
              }}
            >
              <TouchableOpacity
                style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, padding: 4 }}
                onPress={() => toggleFavorite(tool.key)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name={isFav ? 'star' : 'star-outline'} size={22} color={isFav ? '#FFD60A' : themeColors.textMuted} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}
                activeOpacity={0.85}
                onPress={() => router.push(`/tool/${tool.key}`)}
              >
                {iconName ? (
                  <MaterialCommunityIcons name={iconName as any} size={38} color={themeColors.text} style={{ marginBottom: 8 }} />
                ) : (
                  <Text style={{ fontSize: 38, marginBottom: 8 }}>{cat.icon}</Text>
                )}
                <Text style={{ fontSize: 17, fontWeight: '600', color: themeColors.text, textAlign: 'center', marginBottom: 2 }}>{tool.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
