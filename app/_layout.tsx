import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AppProvider } from '../context/AppContext';
import { UpdateManager } from '../hooks/use-update-manager';
import * as Notifications from 'expo-notifications';
import { scheduleHourlyNotifications, scheduleDailyNotifications } from '../utils/notifications';

SplashScreen.preventAutoHideAsync();

// Notification handler moved to utils/notifications.ts

export default function Layout() {
  const [loaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      // Initialize Hourly & Daily notifications on app launch
      scheduleHourlyNotifications();
      scheduleDailyNotifications();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AppProvider>
      <UpdateManager />
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      />
    </AppProvider>
  );
}
