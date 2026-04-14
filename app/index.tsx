import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate progress bar from 0% to 100% over 2200ms
    Animated.timing(progressWidth, {
      toValue: 200, // Fixed width for display
      duration: 2200,
      useNativeDriver: false, // width animation needs false
    }).start();

    const checkFirstLaunch = async () => {
      try {
        const accepted = await AsyncStorage.getItem('agreement_accepted');
        setTimeout(() => {
          if (accepted === 'true') {
            router.replace('/home');
          } else {
            router.replace('/agreement');
          }
        }, 2500);
      } catch (e) {
        setTimeout(() => router.replace('/home'), 2500);
      }
    };

    checkFirstLaunch();
  }, [router, progressWidth]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="dark" />
      
      <View style={styles.centerContent}>
        {/* App Icon Square */}
        <View style={styles.iconSquare}>
          <Text style={styles.iconText}>1C</Text>
        </View>

        {/* App Name */}
        <View style={styles.appNameContainer}>
          <Text style={styles.oneText}>One</Text>
          <Text style={styles.calcText}>Calc</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>ONE APP. FOR EVERY CALCULATION.</Text>

        {/* Gradient Progress Bar */}
        <View style={styles.progressBarBg}>
          <Animated.View style={{ width: progressWidth }}>
            <LinearGradient
              colors={['#4A90D9', '#0A1F44']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressBarFill}
            />
          </Animated.View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ in India</Text>
        <Text style={styles.footerText}>Made by Darshan Satbhai</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Off White
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSquare: {
    width: 64,
    height: 64,
    backgroundColor: '#0A1F44', // Deep Navy
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  iconText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  appNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  oneText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    color: '#FF6B35', // Premium Orange
  },
  calcText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    color: '#AB3500', // Brand Orange
  },
  tagline: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 12,
    color: '#AB3500',
    letterSpacing: 1.5,
    marginBottom: 24,
  },
  progressBarBg: {
    width: 200,
    height: 6,
    backgroundColor: '#E1E3E4',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    color: '#596062',
    marginTop: 4,
  },
});
