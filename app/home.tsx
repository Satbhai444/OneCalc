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

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const { colors: Colors, favorites, toggleFavorite, isUpdateAvailable } = useApp();
  const styles = getStyles(Colors);

  useEffect(() => {
    const checkAppOpenCount = async () => {
      if (DEV_MODE) {
        setRatingVisible(true);
        return;
      }

      try {
        const ratingDone = await AsyncStorage.getItem('rating_done');
        if (ratingDone === 'true') return;

        const countStr = await AsyncStorage.getItem('app_open_count') || '0';
        let count = parseInt(countStr, 10);
        count += 1;
        await AsyncStorage.setItem('app_open_count', count.toString());

        if (count === 3) {
          const ratingLater = await AsyncStorage.getItem('rating_later');
          if (ratingLater !== 'true') {
            setRatingVisible(true);
          }
        }
      } catch (e) {
        console.error('Error checking open count:', e);
      }
    };

    checkAppOpenCount();
  }, []);

  const FEATURES = [
    { id: '1', route: '/calculators/basic', title: 'Basic Calc', desc: 'Standard operations', icon: 'calculator', color: Colors.tools.basic.btn },
    { id: '2', route: '/calculators/scientific', title: 'Scientific Calc', desc: 'Advanced math', icon: 'function-variant', color: Colors.tools.scientific.btn },
    { id: '3', route: '/calculators/currency', title: 'Currency', desc: 'Live exchange rates', icon: 'currency-usd', color: Colors.tools.currency.btn },
    { id: '4', route: '/calculators/emi', title: 'EMI Calculator', desc: 'Loan payments', icon: 'bank', color: Colors.tools.emi.btn },
    { id: '5', route: '/calculators/gst', title: 'GST Calc', desc: 'Indian tax slabs', icon: 'receipt', color: Colors.tools.gst.btn },
    { id: '6', route: '/calculators/interest', title: 'Interest Calc', desc: 'Simple & Compound', icon: 'chart-line', color: Colors.tools.interest.btn },
    { id: '7', route: '/calculators/age', title: 'Age / Date', desc: 'Duration & differences', icon: 'calendar-heart', color: Colors.tools.age.btn },
    { id: '8', route: '/calculators/split', title: 'Bill Splitter', desc: 'Split with friends', icon: 'account-group', color: Colors.tools.split.btn },
    { id: '9', route: '/calculators/unit', title: 'Unit Converter', desc: 'Length, weight, temp', icon: 'swap-horizontal', color: Colors.tools.unit.btn },
    { id: '10', route: '/calculators/discount', title: 'Discount', desc: 'Final price & savings', icon: 'sale', color: Colors.tools.discount.btn },
    { id: '11', route: '/calculators/bases', title: 'Number Bases', desc: 'Bin, Dec, Oct, Hex', icon: 'code-tags', color: Colors.tools.bases.btn },
    { id: '12', route: '/calculators/shapes', title: 'Area & Volume', desc: '2D/3D dimensions', icon: 'shape', color: Colors.tools.shapes.btn },
  ];

  const favoriteItems = FEATURES.filter(item => favorites.includes(item.id));

  const renderItem = ({ item }: { item: typeof FEATURES[0] }) => {
    const isFav = favorites.includes(item.id);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => router.push(item.route as any)}
      >
        <TouchableOpacity style={styles.starBtn} onPress={() => toggleFavorite(item.id)}>
          <MaterialCommunityIcons name={isFav ? "star" : "star-outline"} size={22} color={isFav ? "#FFD60A" : "#B0C4DF"} />
        </TouchableOpacity>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
          <MaterialCommunityIcons name={item.icon as any} size={30} color={item.color} />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={1}>{item.desc}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Image source={require('../assets/images/icon.png')} style={{ width: 36, height: 36, borderRadius: 8 }} />
            <View>
              <Text style={styles.headerTitle}>OneCalc</Text>
              <Text style={styles.headerSubtitle}>Choose a tool</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => setSettingsVisible(true)} activeOpacity={0.7}>
            <View>
              <MaterialCommunityIcons name="cog" size={28} color={Colors.text} />
              {isUpdateAvailable && <View style={styles.notifBadge} />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={FEATURES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          favoriteItems.length > 0 ? (
            <View style={styles.favSection}>
              <Text style={styles.sectionHeader}>FAVORITES</Text>
              <FlatList
                data={favoriteItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => `fav-${item.id}`}
                contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.favItem} activeOpacity={0.8} onPress={() => router.push(item.route as any)}>
                    <TouchableOpacity style={styles.starBtnFav} onPress={() => toggleFavorite(item.id)}>
                      <MaterialCommunityIcons name="star" size={18} color="#FFD60A" />
                    </TouchableOpacity>
                    <View style={[styles.iconContainerFav, { backgroundColor: item.color + '15' }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
                    </View>
                    <Text style={styles.favTitle} numberOfLines={1}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.divider} />
              <Text style={[styles.sectionHeader, { marginTop: 10 }]}>ALL TOOLS</Text>
            </View>
          ) : null
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Made with ❤️ in India</Text>
            <Text style={styles.footerText}>Made by Darshan Satbhai</Text>
          </View>
        )}
      />

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
