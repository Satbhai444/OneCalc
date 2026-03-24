import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LightTheme, DarkTheme } from '../constants/Colors';
import { cancelAllNotifications, scheduleDailyNotifications, scheduleInactivityNotification } from '../utils/notifications';
import { loadSound, playSound, unloadSound } from '../utils/SoundManager';

type ThemeMode = 'light' | 'dark' | 'system';

interface AppContextType {
  themeMode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  colors: typeof LightTheme;
  isHapticEnabled: boolean;
  isSoundEnabled: boolean;
  isNotificationsEnabled: boolean;
  favorites: string[];
  setThemeMode: (mode: ThemeMode) => void;
  toggleHaptic: () => void;
  toggleSound: () => void;
  toggleNotifications: () => void;
  toggleFavorite: (id: string) => void;
  triggerHaptic: () => void;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isHapticEnabled, setIsHapticEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('@settings_theme') as ThemeMode;
      const storedHaptic = await AsyncStorage.getItem('@settings_haptic');
      const storedSound = await AsyncStorage.getItem('@settings_sound');
      const storedNotif = await AsyncStorage.getItem('@settings_notifications');
      const storedFavs = await AsyncStorage.getItem('@settings_favorites');

      if (storedTheme) setThemeModeState(storedTheme);
      if (storedHaptic !== null) setIsHapticEnabled(storedHaptic === 'true');
      if (storedSound !== null) setIsSoundEnabled(storedSound === 'true');
      if (storedNotif !== null) setIsNotificationsEnabled(storedNotif === 'true');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      // Schedule initialization
      if (storedNotif !== 'false') {
         scheduleDailyNotifications();
         scheduleInactivityNotification();
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      loadSound(); // Load sound asset
      setIsLoaded(true);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem('@settings_theme', mode);
  };

  const toggleHaptic = async () => {
    const newVal = !isHapticEnabled;
    setIsHapticEnabled(newVal);
    await AsyncStorage.setItem('@settings_haptic', newVal.toString());
  };

  const toggleSound = async () => {
    const newVal = !isSoundEnabled;
    setIsSoundEnabled(newVal);
    await AsyncStorage.setItem('@settings_sound', newVal.toString());
  };

  const toggleNotifications = async () => {
    const newVal = !isNotificationsEnabled;
    setIsNotificationsEnabled(newVal);
    await AsyncStorage.setItem('@settings_notifications', newVal.toString());
    if (newVal) {
      scheduleDailyNotifications();
      scheduleInactivityNotification();
    } else {
      cancelAllNotifications();
    }
  };

  const toggleFavorite = async (id: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      AsyncStorage.setItem('@settings_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const triggerHaptic = () => {
    if (isHapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (isSoundEnabled) {
      playSound();
    }
  };

  const effectiveTheme = themeMode === 'system' ? (systemColorScheme || 'light') : themeMode;
  const colors = effectiveTheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <AppContext.Provider value={{
      themeMode,
      effectiveTheme,
      colors,
      isHapticEnabled,
      isSoundEnabled,
      isNotificationsEnabled,
      favorites,
      setThemeMode,
      toggleHaptic,
      toggleSound,
      toggleNotifications,
      toggleFavorite,
      triggerHaptic,
      isLoaded
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
