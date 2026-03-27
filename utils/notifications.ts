import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Alert } from 'react-native';

// Notification configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'Default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7A',
  });
}

const NOTIFICATION_POOL = [
  "Bhai, hisaab kar le! 🧮", "Calculator khola? Kuch toh calculate kar! 😄", "Seedha hisaab, seedha jawab! ✅", 
  "Aaj ka hisaab aaj hi nipto! 💪", "Number game on hai kya? 🎯", "Formula bhool gaye? OneCalc hai na! 🧠", 
  "Dollar kitna hai aaj? Check karo! 💸", "GST nikalna hai? Ek second mein! 🧾", "Bill split karo, jhagda khatam! 🍽️",
  "EMI kitni banegi? Abhi check kar! 🏦", "Next birthday kab hai? 🎂", "Kitne saal ke ho gaye? Exact dekho! 📅",
  "Binary to Hex? Easy with OneCalc! 💻", "Area nikalna hai ghar ka? 🏠", "Unit convert karo instantly! ⚖️",
  "Discount kitna mil raha hai? 🛍️", "Savings ka plan hai? Interest dekho! 📈", "Maths is fun with OneCalc! ✏️",
  "Cool tools for cool users! 😎", "OneCalc: Your smart companion! 🤖", "Tax ka tension? GST tool use kar! 💰",
  "Shopping sale? Discount calculate kar! 🏷️", "Miles to KM? Ek tap mein! 🚗", "Kg to Lbs? OneCalc is fast! ⚡",
  "Shapes and sizes? Volume nikaalo! 📐", "Complex maths? Scientific mode on! 🧪", "Dark mode vs Light mode? Dono sexy hain! 🌗",
  "Privacy first! Hum data store nahi karte! 🔒", "Offline power! No internet needed! ☁️", "Made in India, for the World! 🇮🇳",
  "Ad-free experience! Shift to Premium! ✨", "Calculator upgrade ho gaya! Check kar! 🚀", "Dosto ko suggest karo OneCalc! ❤️",
  "5-star rating dena mat bhoolna! ⭐", "Daily calculation, Daily motivation! 💪", "Hisaab barabar, rishta barabar! 🤝",
  "Time is money, save it with OneCalc! 🕒", "Simple tools, Big impact! 💎", "Calculation mein no mistake! ✅",
  "Precision mode activated! 🎯", "Math magic in your pocket! 🪄", "OneCalc: Sabse fast, sabse best! 🥇",
  "Arey ruk! Discount check kiya? 🛍️", "Loan lene se pehle EMI check kar! 🏦", "Bhai, 18% GST ya 28%? 🧾",
  "Duniya badal rahi hai, rates bhi! Check kar! 💱", "Trigonometry se darna kaisa? 📐", "Logarithms fast and easy! 🔬",
  "Programming bases converted! 🖥️", "Ghar ka paint? Area calculate kar! 🎨", "Health track? Age stats dekho! 🎂",
  "OneCalc — App nahi, zarurat hai! 🌟",
  "Maths ka topper banna hai? Practice kar bitwa! ✍️", "Salary aayi? Budgeting shuru karo! 💸", "Crypto rates? Next update mein shayad! 😉",
  "Physics numericals? Scientific mode use kar! ⚛️", "Gadi ki speed convert ki kya? 🏎️", "Square feet to Square meter? Easy! 📐",
  "Pressure kitna hai? Unit converter check kar! 🌬️", "Data bytes to GB? OneCalc is smart! 💾", "Fuel cost calculate kiya? ⛽",
  "Gold rates changes? Investment check kar! 🏆", "Kitchen measurement? Grams to Oz! 🥘", "Travel plan? Currency switch kar! ✈️",
  "OneCalc: Zero ads, Full Power! ⚡", "India ka apna smart calculator! 🇮🇳", "Hisaab mein gadbad? Kabhi nahi! ❌",
  "Smart calculation, Smart Life! 🌈", "Bilkul accurate, Bilkul fast! ⏱️", "Numbers are beautiful, just like you! 😊",
  "Hisaab ka king! OneCalc is here! 👑", "Maths se dosti kar lo! 🤝", "Every calculation counts! 🔢"
];

const INACTIVITY_MESSAGES = [
  "Bhai kahan ho? OneCalc miss kar raha hai tujhe! 😄🧮",
  "3 din ho gaye! Koi calculation pending hai kya? ⚡",
  "Ek baar open toh karo — 12 tools wait kar rahe hain! 🎯",
  "Arey bhai! Hisaab kitaab bhool gaye kya? 😅",
  "OneCalc is waiting... Koi EMI calculate karni hai? 🏦"
];

const checkNotificationsEnabled = async () => {
  const isEnabled = await AsyncStorage.getItem('@settings_notifications');
  return isEnabled !== 'false';
};

export const scheduleHourlyNotifications = async () => {
  if (!(await checkNotificationsEnabled())) return;

  // 1. Get showed indices
  const showedStr = await AsyncStorage.getItem('@showed_notification_indices');
  let showedIndices: number[] = showedStr ? JSON.parse(showedStr) : [];

  // 2. Filter available indices
  let availableIndices = NOTIFICATION_POOL.map((_, i) => i).filter(i => !showedIndices.includes(i));

  // 3. Reset if all shown
  if (availableIndices.length === 0) {
    showedIndices = [];
    availableIndices = NOTIFICATION_POOL.map((_, i) => i);
  }

  // 4. Cancel existing to prevent stacking
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    if (n.identifier.startsWith('hourly_')) await Notifications.cancelScheduledNotificationAsync(n.identifier);
  }

  // 5. Schedule next 12 hours
  for (let h = 1; h <= 12; h++) {
    if (availableIndices.length === 0) {
      showedIndices = [];
      availableIndices = NOTIFICATION_POOL.map((_, i) => i);
    }
    
    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const msg = NOTIFICATION_POOL[randomIdx];
    
    showedIndices.push(randomIdx);
    availableIndices = availableIndices.filter(i => i !== randomIdx);

    await Notifications.scheduleNotificationAsync({
      identifier: `hourly_${h}`,
      content: {
        title: "OneCalc 🧮",
        body: msg,
      },
      trigger: {
        type: 'timeInterval',
        seconds: h * 3600,
        repeats: false
      } as any
    });
  }

  await AsyncStorage.setItem('@showed_notification_indices', JSON.stringify(showedIndices));
};

export const triggerUpdateNotificationV12 = async () => {
  if (!(await checkNotificationsEnabled())) return;
  
  await Notifications.scheduleNotificationAsync({
    identifier: 'v12_update_alert',
    content: {
      title: "🚀 OneCalc v1.2.0 is Here!",
      body: "Real-time Currency Rates & 150+ Countries added! Update now for the most accurate calculations. ✨",
      data: { url: '/about' } // Action to deep-link to About screen
    },
    trigger: {
      type: 'timeInterval',
      seconds: 5, // Show 5 seconds after launch
      channelId: 'default'
    } as any
  });
};

export const scheduleToolNotification = async (toolId?: string) => {
  if (!(await checkNotificationsEnabled())) return;
  await scheduleHourlyNotifications();
  await scheduleInactivityNotification();
};

export const scheduleDailyNotifications = async () => {
  if (!(await checkNotificationsEnabled())) return;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  scheduled.forEach(async (n) => {
    if (n.identifier.startsWith('daily_')) {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  });

  const dailies = [
    { id: 'daily_9am', h: 9, m: 0, text: "Subah ho gayi! Aaj ka hisaab OneCalc se shuru karo! 🌅" },
    { id: 'daily_1pm', h: 13, m: 0, text: "Lunch time! Bill split karna ho toh OneCalc ready hai! 🍽️" },
    { id: 'daily_6pm', h: 18, m: 0, text: "Sham ho gayi! Aaj ki shopping ka discount check karo! 🛍️" },
  ];

  for (const d of dailies) {
    await Notifications.scheduleNotificationAsync({
      identifier: d.id,
      content: {
        title: "OneCalc 🧮",
        body: d.text,
      },
      trigger: {
        type: 'daily',
        hour: d.h,
        minute: d.m,
      } as any
    });
  }
};

export const scheduleInactivityNotification = async () => {
  if (!(await checkNotificationsEnabled())) return;

  await Notifications.cancelScheduledNotificationAsync('inactivity_reminder');

  const randomIdx = Math.floor(Math.random() * INACTIVITY_MESSAGES.length);
  const msg = INACTIVITY_MESSAGES[randomIdx];

  await Notifications.scheduleNotificationAsync({
    identifier: 'inactivity_reminder',
    content: {
      title: "OneCalc 🧮",
      body: msg,
    },
    trigger: {
      type: 'timeInterval',
      seconds: 3 * 24 * 60 * 60 // 3 days
    } as any
  });
};

export const triggerTestNotification = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      Alert.alert("Permission Denied 🚫", "Settings me jaake notifications allow karein.");
      return;
    }
  }

  const randomMsg = NOTIFICATION_POOL[Math.floor(Math.random() * NOTIFICATION_POOL.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "OneCalc 🧮 (Test)",
      body: randomMsg,
    },
    trigger: { 
      type: 'timeInterval',
      seconds: 1,
      channelId: 'default'
    } as any
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
