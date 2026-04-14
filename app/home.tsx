import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsModal from '../components/SettingsModal';
import RatingModal from '../components/RatingModal';
import { useApp } from '../context/AppContext';

const DEV_MODE = false; // Testing ke liye true rakho // Production mein false kar dena

import { TOOL_CATEGORIES } from '../constants/tool-categories';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const { colors: Colors, favorites, toggleFavorite, isUpdateAvailable } = useApp();
  const styles = getStyles(Colors);

  // Flatten all tools for favorites
  const allTools = TOOL_CATEGORIES.flatMap(cat => cat.tools.map(tool => ({
    ...tool,
    category: cat.key,
    categoryName: cat.name,
    icon: cat.icon,
    color: Colors.cardBg
  })));
  const favoriteItems = allTools.filter(item => favorites.includes(item.key));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}> 
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>OneCalc</Text>
            <Text style={styles.headerSubtitle}>All-in-one Calculator Suite</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => setSettingsVisible(true)}>
            <MaterialCommunityIcons name="cog" size={28} color={Colors.text} />
            {isUpdateAvailable && <View style={styles.notifBadge} />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: Colors.background }} contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 24 }}>Categories</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {TOOL_CATEGORIES.map(cat => {
            // Assign a unique color for each category card
            const categoryColors = [
              '#F9D923', '#00A19D', '#FF6F3C', '#6A2C70', '#3AB795', '#FFB319', '#FF6363', '#3A86FF', '#8338EC', '#FF006E', '#FB5607', '#FFBE0B'
            ];
            const color = categoryColors[cat.key.length % categoryColors.length] || Colors.cardBg;
            // Optionally, map category to icon name
            const categoryIcons: Record<string, string> = {
              finance: 'cash-multiple',
              health: 'heart-pulse',
              conversion: 'swap-horizontal',
              math: 'function-variant',
              'date-time': 'calendar',
              fun: 'emoticon-happy',
              utility: 'tools',
            };
            const iconName = categoryIcons[cat.key] || undefined;
            return (
              <TouchableOpacity
                key={cat.key}
                style={{
                  width: '47%',
                  aspectRatio: 1.2,
                  backgroundColor: color,
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
                  borderColor: Colors.border,
                  position: 'relative',
                }}
                onPress={() => router.push(`/category/${cat.key}`)}
                activeOpacity={0.85}
              >
                {iconName ? (
                  <MaterialCommunityIcons name={iconName as any} size={40} color={Colors.text} style={{ marginBottom: 8 }} />
                ) : (
                  <Text style={{ fontSize: 40, marginBottom: 8 }}>{cat.icon}</Text>
                )}
                <Text style={{ fontSize: 18, fontWeight: '600', color: Colors.text }}>{cat.name}</Text>
                <Text style={{ fontSize: 12, color: Colors.text, opacity: 0.6, marginTop: 4 }}>{cat.tools.length} tools</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {favoriteItems.length > 0 && (
          <View style={styles.favSection}>
            <Text style={styles.sectionHeader}>FAVORITES</Text>
            <View>
              <FlatList
                data={favoriteItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => `fav-${item.key}`}
                contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
                renderItem={({ item }) => (
                  <View style={styles.favItem}>
                    <TouchableOpacity style={styles.starBtnFav} onPress={() => toggleFavorite(item.key)}>
                      <MaterialCommunityIcons name="star" size={18} color="#FFD60A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} activeOpacity={0.8} onPress={() => router.push(`/tool/${item.key}`)}>
                      <View style={[styles.iconContainerFav, { backgroundColor: Colors.cardBg + '15' }]}> 
                        <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                      </View>
                      <Text style={styles.favTitle} numberOfLines={1}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View style={styles.divider} />
            <Text style={[styles.sectionHeader, { marginTop: 10 }]}>ALL TOOLS</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ in India</Text>
          <Text style={styles.footerText}>Made by Darshan Satbhai</Text>
        </View>
      </ScrollView>

      <SettingsModal 
        visible={settingsVisible} 
        onClose={() => setSettingsVisible(false)} 
        onOpenRating={() => {
          setSettingsVisible(false);
          setTimeout(() => setRatingVisible(true), 300);
        }}
      />
      <RatingModal visible={ratingVisible} onClose={() => setRatingVisible(false)} />
    </View>
  );
// Removed duplicate/leftover code after return
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingVertical: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingsBtn: { padding: 8 },
  notifBadge: { position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF3B30', borderWidth: 2, borderColor: '#FFFFFF' },
  headerTitle: { fontFamily: 'DMSans_700Bold', fontSize: 32, color: Colors.text, letterSpacing: 0.5 },
  headerSubtitle: { fontFamily: 'DMSans_500Medium', fontSize: 16, color: Colors.textMuted, marginTop: 4 },
  listContainer: { paddingHorizontal: 12, paddingBottom: 20 },
  card: {
    flex: 1, backgroundColor: Colors.cardBg, margin: 8, borderRadius: 18, padding: 16,
    alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: Colors.border,
    position: 'relative'
  },
  iconContainer: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontFamily: 'DMSans_700Bold', fontSize: 15, color: Colors.text, textAlign: 'center', marginBottom: 4 },
  cardDesc: { fontFamily: 'DMSans_400Regular', fontSize: 12, color: Colors.textMuted, textAlign: 'center' },
  starBtn: { position: 'absolute', top: 12, right: 12, zIndex: 10, padding: 4 },
  
  // Favorites
  favSection: { paddingHorizontal: 8, marginBottom: 16 },
  sectionHeader: { fontFamily: 'DMSans_700Bold', fontSize: 13, color: Colors.textMuted, letterSpacing: 0.5, marginBottom: 6 },
  favItem: { width: 110, backgroundColor: Colors.cardBg, borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, position: 'relative' },
  iconContainerFav: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  favTitle: { fontFamily: 'DMSans_700Bold', fontSize: 12, color: Colors.text, textAlign: 'center' },
  starBtnFav: { position: 'absolute', top: 6, right: 6, zIndex: 10, padding: 2 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginTop: 12, marginBottom: 8 },

  footer: { marginTop: 20, paddingVertical: 20, alignItems: 'center' },
  footerText: { fontFamily: 'DMSans_500Medium', fontSize: 14, color: Colors.textMuted, marginTop: 4 }
});
