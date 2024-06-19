import { FIREBASE_DB } from './FirebaseConfig'; // Asegúrate de que esta ruta sea correcta
import { ref, set, get, child } from "firebase/database";

interface EmotionLog {
  date: string;
  time: string;
  emotion: string;
  feelings: string[];
  activities: string[];
}

export const saveEmotionLog = async (userId: string, log: EmotionLog) => {
  const logId = Date.now().toString(); // Puedes usar cualquier identificador único
  const logRef = ref(FIREBASE_DB, `users/${userId}/emotionLogs/${logId}`);
  await set(logRef, log);
};

export const getEmotionLogs = async (userId: string) => {
  const logsRef = ref(FIREBASE_DB, `users/${userId}/emotionLogs`);
  const snapshot = await get(logsRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};