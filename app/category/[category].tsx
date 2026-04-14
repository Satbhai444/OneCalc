import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TOOL_CATEGORIES } from '../../constants/tool-categories';
import { useApp } from '../../context/AppContext';
import { getToolIcon } from '../../utils/icons';

export default function CategoryScreen() {
  const { category: categoryId } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors: Colors, favorites, toggleFavorite } = useApp();

  const category = TOOL_CATEGORIES.find(c => c.key === categoryId);

  if (!category) return null;

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.catEmoji}>{category.icon}</Text>
          <Text style={[styles.headerTitle, { color: Colors.text }]}>{category.name}</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: Colors.textMuted }]}>
          Showing all {category.tools.length} professional tools in this category.
        </Text>

        <View style={styles.toolList}>
          {category.tools.map((tool) => {
            const isFav = favorites.includes(tool.key);
            return (
              <TouchableOpacity
                key={tool.key}
                style={[styles.toolCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}
                onPress={() => router.push(`/calculators/${tool.key}`)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBox, { backgroundColor: Colors.primary + '10' }]}>
                  <MaterialCommunityIcons name={getToolIcon(tool.key) as any} size={28} color={Colors.primary} />
                </View>
                
                <View style={styles.toolInfo}>
                  <Text style={[styles.toolName, { color: Colors.text }]}>{tool.name}</Text>
                  <Text style={[styles.toolDesc, { color: Colors.textMuted }]}>Precision engine enabled</Text>
                </View>

                <TouchableOpacity 
                  style={styles.favBtn}
                  onPress={() => toggleFavorite(tool.key)}
                >
                  <MaterialCommunityIcons 
                    name={isFav ? "bookmark" : "bookmark-outline"} 
                    size={22} 
                    color={isFav ? Colors.primary : Colors.textMuted} 
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    paddingHorizontal: 24, 
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  backBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.02)' 
  },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  catEmoji: { fontSize: 24 },
  headerTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24 },
  
  content: { paddingHorizontal: 24 },
  subtitle: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13, marginBottom: 30 },
  
  toolList: { gap: 12 },
  toolCard: { 
    padding: 16, 
    borderRadius: 20, 
    borderWidth: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBox: { 
    width: 52, 
    height: 52, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  toolInfo: { flex: 1, gap: 2 },
  toolName: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 16 },
  toolDesc: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 12 },
  favBtn: { padding: 4 },
});
