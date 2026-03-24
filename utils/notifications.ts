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

const TOOL_MESSAGES: { [key: string]: string[] } = {
  basic: [
    "Arre bhai, hisaab kar le! 🧮",
    "Calculator khola? Kuch toh calculate kar! 😄",
    "Seedha hisaab, seedha jawab! ✅",
    "Aaj ka hisaab aaj hi nipto! 💪",
    "Number game on hai kya? 🎯"
  ],
  scientific: [
    "Formulas yaad nahi? OneCalc pe chhor! 🧠",
    "Trigonometry ya Log? Ek sec mein solution! 🔬",
    "Math functions ready hain tere liye! 📊",
    "Advanced maths made easy! 📐",
    "Scientific Calc loaded! 🧪" // User didn't specify scientific texts, reusing similar standard format
  ],
  currency: [
    "Dollar aaj upar hai ya neeche? Check kar! 💸",
    "Videsh jaane ka plan? Pehle rate dekh! ✈️",
    "INR vs USD — kaun jeet raha hai aaj? 🏆",
    "Live rates hain bhai, Google mat kar! 😎",
    "Paisa convert karna hai? Ek tap mein! 💱"
  ],
  emi: [
    "Loan lene ka soch raha hai? EMI check kar pehle! 🏦",
    "EMI kitni hogi? 2 second mein pata karo! ⚡",
    "Bade sapne, chhoti EMI — calculate kar! 🏠",
    "Loan se pehle OneCalc se pehle! 😄",
    "Monthly EMI ready hai tera! 📊"
  ],
  gst: [
    "GST lagega kitna? Seedha pata karo! 🧾",
    "18% ya 28%? Confuse mat ho! ✅",
    "Bill aaya? GST nikaalo jaldi! 💰",
    "Tax ka hisaab — ek second mein! ⚡",
    "GST wala calculator — India ke liye! 🇮🇳"
  ],
  interest: [
    "Paisa invest kiya? Return dekh! 📈",
    "FD kitna degi? Abhi calculate kar! 🏦",
    "Simple ya compound — dono ready hain! 💡",
    "Paisa kaam kare tera — interest check kar! 💸",
    "Savings ka hisaab lagao aaj! 🎯"
  ],
  age: [
    "Kitne saal ke ho gaye bhai? 🎂",
    "Birthday aane wali hai kya? Check kar! 🎉",
    "Age sirf number hai — but janlo toh sahi! 😄",
    "Exact age — years, months, days mein! 📅",
    "Next birthday kitne din mein? 🎊"
  ],
  split: [
    "Dosto ke saath khaya? Bill split karo! 🍽️",
    "Kaun kitna dega? Jhagda khatam! ✌️",
    "Fair split — ek second mein! 💪",
    "Bill aaya, calculator ready hai! 🧾",
    "Tip bhi calculate kar lo saath mein! 😎"
  ],
  unit: [
    "kg to lbs? Ek tap mein! ⚖️",
    "Miles ya kilometers? Confuse mat ho! 🚗",
    "Temperature convert karna? Easy hai! 🌡️",
    "Units ka chakkar — OneCalc pe chhor! 😄",
    "Convert karo — sab units ready hain! 📏"
  ],
  discount: [
    "Sale chal rahi hai? Discount nikaalo! 🏷️",
    "50% off matlab kitna bachega? Check kar! 💰",
    "Shopping se pehle discount calculate kar! 🛍️",
    "Asli price kitni थी? Reverse calculate kar! 🔄",
    "Deal acha hai ya nahi? Abhi pata karo! 🎯"
  ],
  bases: [
    "Binary to Decimal? Ek second mein! 💻",
    "Coding kar raha hai? Number converter ready! 🖥️",
    "Hex, Octal, Binary — sab ek jagah! 🔣",
    "CS student ho? Ye tool tumhara hai! 🎓",
    "Number systems — easy ho gaye! ✅"
  ],
  shapes: [
    "Room ka area nikalna hai? Jaldi karo! 📐",
    "Ghar banana? Volume calculate kar! 🏠",
    "Circle ka area? Formula yaad nahi? Koi baat nahi! 😄",
    "Math easy hai OneCalc ke saath! ✏️",
    "Shape select karo, answer ready! 🎯"
  ]
};

const INACTIVITY_MESSAGES = [
  "Bhai kahan ho? OneCalc miss kar raha hai tujhe! 😄🧮",
  "3 din ho gaye! Koi calculation pending hai kya? ⚡",
  "Ek baar open toh karo — 12 tools wait kar rahe hain! 🎯",
  "Arey bhai! Hisaab kitaab bhool gaye kya? 😅",
  "OneCalc is waiting... Koi EMI calculate karni hai? 🏦"
];

const checkNotificationsEnabled = async () => {
  const isEnabled = await AsyncStorage.getItem('@settings_notifications');
  return isEnabled !== 'false'; // Default enabled if null
};

export const scheduleToolNotification = async (toolId: string) => {
  if (!(await checkNotificationsEnabled())) return;

  const messages = TOOL_MESSAGES[toolId] || TOOL_MESSAGES['basic'];
  const body = messages[Math.floor(Math.random() * messages.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "OneCalc 🧮",
      body: body,
    },
    trigger: { 
      type: 'timeInterval',
      seconds: 7200 
    } as any // 2 hours
  });

  // Push inactivity clock forward
  await scheduleInactivityNotification();
};

export const scheduleDailyNotifications = async () => {
  if (!(await checkNotificationsEnabled())) return;

  // Cancel old daily notifications if exist to prevent duplicate intervals
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

  // Reschedule inactivity trigger for 3 days from now
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
      Alert.alert(
        "Permission Denied 🚫",
        "Settings me jaake OneCalc ke liye notifications allow karein tabhi ye test kaam karega."
      );
      return;
    }
  }

  // Pick a random message from TOOL_MESSAGES for preview
  const tools = Object.keys(TOOL_MESSAGES);
  const randomTool = tools[Math.floor(Math.random() * tools.length)];
  const messages = TOOL_MESSAGES[randomTool];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "OneCalc 🧮",
      body: randomMsg,
    },
    trigger: { 
      type: 'timeInterval',
      seconds: 2,
      channelId: 'default'
    } as any
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
