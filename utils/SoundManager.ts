import { Audio } from 'expo-av';

let soundObject: Audio.Sound | null = null;
let isLoaded = false;

export const loadSound = async () => {
  try {
    if (!soundObject) {
      soundObject = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sounds/tick.mp3'));
      isLoaded = true;
    }
  } catch (e) {
    console.log('Failed to load sound', e);
  }
};

export const playSound = async () => {
  try {
    if (soundObject && isLoaded) {
      await soundObject.replayAsync();
    }
  } catch (e) {
    // console.log('Failed to play sound', e);
  }
};

export const unloadSound = async () => {
  if (soundObject) {
    await soundObject.unloadAsync();
    soundObject = null;
    isLoaded = false;
  }
};
