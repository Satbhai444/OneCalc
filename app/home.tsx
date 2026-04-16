import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOOL_CATEGORIES } from '../constants/tool-categories';
import SettingsModal from '../components/SettingsModal';
import RatingModal from '../components/RatingModal';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate, 
  useAnimatedRef, 
} from 'react-native-reanimated';

// Helper for horizontal effect
type PinnedToolCardProps = {
  item: any;
  index: number;
  scrollX: any;
  cardWidth: number;
  gap: number;
  onPress: () => void;
  Colors: any;
};
const PinnedToolCard = ({ item, index, scrollX, cardWidth, gap, onPress, Colors }: PinnedToolCardProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const position = index * (cardWidth + gap);
    const center = scrollX.value + (cardWidth + gap) * 2; // Center the barrel
    const relativeX = position - center;
    // Barrel effect: strong 3D rotation and translation
    const rotateY = interpolate(
      relativeX,
      [-(cardWidth + gap) * 2, 0, (cardWidth + gap) * 2],
      [75, 0, -75],
      Extrapolate.CLAMP
    );
    // Move cards along the X axis to wrap around the barrel
    const translateX = interpolate(
      relativeX,
      [-(cardWidth + gap) * 2, 0, (cardWidth + gap) * 2],
      [-40, 0, 40],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      Math.abs(relativeX),
      [0, (cardWidth + gap) * 2],
      [1, 0.7],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      Math.abs(relativeX),
      [0, (cardWidth + gap) * 2],
      [1, 0.4],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { perspective: 1200 },
        { translateX },
        { rotateY: `${rotateY}deg` },
        { scale },
      ],
      opacity,
    };
  });
  return (
    <Animated.View style={[styles.favCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border, marginRight: gap }, animatedStyle]}>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
        <Text style={styles.favIcon}>{item.categoryIcon}</Text>
        <Text style={[styles.favName, { color: Colors.text }]} numberOfLines={1}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

type AnimatedHorizontalPinnedToolsProps = {
  items: any[];
  Colors: any;
  onItemPress: (item: any) => void;
};
const AnimatedHorizontalPinnedTools = ({ items, Colors, onItemPress }: AnimatedHorizontalPinnedToolsProps) => {
  const cardWidth = 120;
  const gap = 12;
  const scrollX = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event: any) => {
      scrollX.value = event?.contentOffset?.x || 0;
    },
  });
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap }}
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      {items.map((item, index) => (
        <PinnedToolCard
          key={item.key}
          item={item}
          index={index}
          scrollX={scrollX}
          cardWidth={cardWidth}
          gap={gap}
          Colors={Colors}
          onPress={() => onItemPress(item)}
        />
      ))}
    </Animated.ScrollView>
  );
};

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');


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

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  catCardContainer: { width: '48.2%', marginBottom: 12 },
  catCard: { 
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
    height: 160,
  },
  catIconContainer: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  catIconText: { fontSize: 24 },
  catName: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, textAlign: 'center' },
  catCount: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 11 },

  footer: { marginTop: 40, alignItems: 'center', gap: 4 },
  footerText: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 12, letterSpacing: 0.5 },
});

const AnimatedCard = ({ cat, scrollY, index }: any) => {
  const { colors: Colors } = useApp();
  const router = useRouter();
  
  const animatedStyle = useAnimatedStyle(() => {
    // Estimating card position (rough approximation for performance)
    const cardY = (Math.floor(index / 2) * 160) + 250; 
    const relativeY = cardY - scrollY.value;
    
    // Cylinder Effect Logic
    const rotateX = interpolate(
      relativeY,
      [0, SCREEN_HEIGHT / 2, SCREEN_HEIGHT],
      [20, 0, -20],
      Extrapolate.CLAMP
    );
    
    const scale = interpolate(
      relativeY,
      [0, SCREEN_HEIGHT / 2, SCREEN_HEIGHT],
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      relativeY,
      [-100, 0, SCREEN_HEIGHT / 2, SCREEN_HEIGHT, SCREEN_HEIGHT + 100],
      [0, 1, 1, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX}deg` },
        { scale }
      ],
      opacity
    };
  });

  return (
    <Animated.View style={[styles.catCardContainer, animatedStyle]}>
      <TouchableOpacity
        style={[styles.catCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}
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
    </Animated.View>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { colors: Colors, favorites } = useApp();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const allTools = TOOL_CATEGORIES.flatMap(cat => 
    cat.tools.map(tool => ({ ...tool, categoryKey: cat.key, categoryIcon: cat.icon }))
  );
  const favoriteItems = allTools.filter(item => favorites.includes(item.key));
  const router = useRouter();

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, 100], [140, 90], Extrapolate.CLAMP);
    const borderBottomWidth = interpolate(scrollY.value, [0, 50], [0, 1], Extrapolate.CLAMP);
    return {
      height,
      borderBottomWidth,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(scrollY.value, [0, 100], [32, 24], Extrapolate.CLAMP);
    return { fontSize };
  });

  const subtitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 50], [1, 0], Extrapolate.CLAMP);
    return { opacity };
  });

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <Animated.View style={[styles.header, { paddingTop: insets.top, backgroundColor: Colors.background, borderBottomColor: Colors.border }, headerStyle]}>
        <View style={styles.headerRow}>
          <View>
            <Animated.Text style={[styles.headerTitle, { color: Colors.text }, titleStyle]}>OneCalc</Animated.Text>
            <Animated.Text style={[styles.headerSubtitle, { color: Colors.textMuted }, subtitleStyle]}>Precision & Privacy Portfolio</Animated.Text>
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
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.badgeContainer}>
           <View style={[styles.badge, { borderColor: Colors.border }]}>
             <Text style={styles.badgeText}>🇮🇳 MADE IN INDIA</Text>
           </View>
        </View>

        {favoriteItems.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors.text }]}>Pinned Tools</Text>
            {/* Horizontal animated pinned tools */}
            <AnimatedHorizontalPinnedTools
              items={favoriteItems}
              Colors={Colors}
              onItemPress={item => router.push(`/calculators/${item.key}`)}
            />
          </View>
        )}

        <Text style={[styles.sectionTitle, { color: Colors.text, marginTop: 24 }]}>Categories</Text>
        <View style={styles.grid}>
          {TOOL_CATEGORIES.map((cat, index) => (
            <AnimatedCard key={cat.key} cat={cat} scrollY={scrollY} index={index} />
          ))}
        </View>

        <View style={styles.footer}>
           <Text style={[styles.footerText, { color: Colors.textMuted }]}>Handcrafted for Excellence</Text>
           <Text style={[styles.footerText, { color: Colors.primary, fontFamily: 'SpaceGrotesk_700Bold' }]}>Darshan Satbhai</Text>
        </View>
      </Animated.ScrollView>

      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
    </View>
  );
}



