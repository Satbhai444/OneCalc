import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useFonts, SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AppProvider } from '../context/AppContext';
import { UpdateManager } from '../hooks/use-update-manager';
import { scheduleHourlyNotifications, scheduleDailyNotifications, triggerUpdateNotificationV12 } from '../utils/notifications';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      scheduleHourlyNotifications();
      scheduleDailyNotifications();
      triggerUpdateNotificationV12();
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
