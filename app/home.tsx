import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TOOL_CATEGORIES } from '../constants/tool-categories';
import SettingsModal from '../components/SettingsModal';
import RatingModal from '../components/RatingModal';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors: Colors, favorites, toggleFavorite } = useApp();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header Animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [140, 90],
    extrapolate: 'clamp',
  });

  const headerTitleSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [32, 24],
    extrapolate: 'clamp',
  });

  // Flatten all tools for quick access/favorites
  const allTools = TOOL_CATEGORIES.flatMap(cat => 
    cat.tools.map(tool => ({ ...tool, categoryKey: cat.key, categoryIcon: cat.icon }))
  );
  const favoriteItems = allTools.filter(item => favorites.includes(item.key));

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Dynamic Header */}
      <Animated.View style={[styles.header, { height: headerHeight, paddingTop: insets.top, backgroundColor: Colors.background, borderBottomWidth: scrollY.interpolate({ inputRange: [0, 50], outputRange: [0, 1], extrapolate: 'clamp' }), borderBottomColor: Colors.border }]}>
        <View style={styles.headerRow}>
          <View>
            <Animated.Text style={[styles.headerTitle, { fontSize: headerTitleSize, color: Colors.text }]}>OneCalc</Animated.Text>
            <Animated.Text style={[styles.headerSubtitle, { opacity: scrollY.interpolate({ inputRange: [0, 50], outputRange: [1, 0], extrapolate: 'clamp' }), color: Colors.textMuted }]}>Precision & Privacy Portfolio</Animated.Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.cardBg }]} onPress={() => setSettingsVisible(true)}>
              <MaterialCommunityIcons name="cog-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 150, paddingBottom: 100, paddingHorizontal: 20 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Made in India Badge */}
        <View style={styles.badgeContainer}>
           <View style={[styles.badge, { borderColor: Colors.border }]}>
             <Text style={styles.badgeText}>🇮🇳 MADE IN INDIA</Text>
           </View>
        </View>

        {/* Favorites Section */}
        {favoriteItems.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors.text }]}>Pinned Tools</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
              {favoriteItems.map(item => (
                <TouchableOpacity 
                  key={item.key} 
                  style={[styles.favCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}
                  onPress={() => router.push(`/calculators/${item.key}`)}
                >
                  <Text style={styles.favIcon}>{item.categoryIcon}</Text>
                  <Text style={[styles.favName, { color: Colors.text }]} numberOfLines={1}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Tools Bento Grid */}
        <Text style={[styles.sectionTitle, { color: Colors.text, marginTop: 24 }]}>Categories</Text>
        <View style={styles.grid}>
          {TOOL_CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.catCard,
                { 
                  backgroundColor: Colors.cardBg, 
                  borderColor: Colors.border,
                  width: '48.2%', // Uniform 2-column grid
                }
              ]}
              onPress={() => router.push(`/category/${cat.key}`)}
            >
              <View style={[styles.catIconContainer, { backgroundColor: Colors.primary + '10' }]}>
                <Text style={styles.catIconText}>{cat.icon}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.catName, { color: Colors.text }]}>{cat.name}</Text>
                <Text style={[styles.catCount, { color: Colors.textMuted }]}>{cat.tools.length} Tools</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
           <Text style={[styles.footerText, { color: Colors.textMuted }]}>Handcrafted for Excellence</Text>
           <Text style={[styles.footerText, { color: Colors.primary, fontFamily: 'SpaceGrotesk_700Bold' }]}>Darshan Satbhai</Text>
        </View>
      </Animated.ScrollView>

      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
      <RatingModal visible={ratingVisible} onClose={() => setRatingVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 100, 
    justifyContent: 'center', 
    paddingHorizontal: 20,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontFamily: 'SpaceGrotesk_700Bold' },
  headerSubtitle: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13, marginTop: -2 },
  headerActions: { flexDirection: 'row', gap: 10 },
  actionBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  
  badgeContainer: { marginBottom: 20 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100, borderWidth: 1 },
  badgeText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 10, letterSpacing: 1 },

  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, marginBottom: 16 },
  
  favCard: { width: 120, padding: 16, borderRadius: 20, borderWidth: 1, alignItems: 'center', gap: 8 },
  favIcon: { fontSize: 24 },
  favName: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 12, textAlign: 'center' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 20 },
  catCard: { 
    width: '47%',
    padding: 16, 
    borderRadius: 28, 
    borderWidth: 1, 
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  catIconContainer: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  catIconText: { fontSize: 24 },
  catName: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, textAlign: 'center' },
  catCount: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 11 },

  footer: { marginTop: 40, alignItems: 'center', gap: 4 },
  footerText: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 12, letterSpacing: 0.5 },
});
