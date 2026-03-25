import { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUpdateManager = () => {
  const { isUpdateAvailable } = Updates.useUpdates();

  useEffect(() => {
    const checkAndShowWelcome = async () => {
      try {
        const currentId = Updates.updateId;
        if (!currentId) return;

        const savedId = await AsyncStorage.getItem('LAST_RUN_UPDATE_ID');
        if (currentId !== savedId) {
          Alert.alert(
            "What's New! 🎉",
            "• Added upgraded 5-column Scientific Calculator\n• Layout grid matching reference updates\n• Asset resolving fixes for smooth flow",
            [{ text: "Awesome!" }]
          );
          await AsyncStorage.setItem('LAST_RUN_UPDATE_ID', currentId);
          await Notifications.cancelAllScheduledNotificationsAsync();
        }
      } catch (err) { console.error(err); }
    };

    checkAndShowWelcome();
  }, []);

  useEffect(() => {
    if (isUpdateAvailable) {
      const downloadAndNotify = async () => {
         try {
           await Updates.fetchUpdateAsync();
           
           await Notifications.scheduleNotificationAsync({
             content: {
               title: "Naya Update Available! 🚀",
               body: "Scientific Calculator download ho chuka hai. Apply karne ke liye app restart karein."
             },
             trigger: null
           });

           await Notifications.scheduleNotificationAsync({
             content: {
               title: "Update Pending ⏳",
               body: "Aapka scientific updates apply karne ke liye app restart pending hai."
             },
             trigger: { type: 'timeInterval', seconds: 21600, repeats: true } as any
           });
         } catch (e) { console.error("fetch failed", e); }
      };
      downloadAndNotify();
    }
  }, [isUpdateAvailable]);
};
