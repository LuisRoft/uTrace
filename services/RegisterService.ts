import { createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database";
import { Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';

// call the Firebase Auth and Database to improve the reading of the code
const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;


export const saveUser = async (user: any, name: string, surname: string, email: string) => {
    try {
      await set(ref(db, 'users/' + user.uid), {
        name,
        surname,
        email
      });
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error saving user in DataBase: ' + error.message);
      throw error;
    }
}

export const createUser = async (email: string, password: string, name: string, surname: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      await saveUser(response.user, name, surname, email);
      return response.user;
    } catch (error: any) {
      console.log(error);
      Alert.alert('Sign in failed: ' + error.message);
      throw error; // Re-throw the error so it can be caught and handled in the UI
    }
  }
