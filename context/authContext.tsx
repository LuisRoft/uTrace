import { AuthContextType, AuthProviderProps, LoginCredentials, RegisterInfo, User } from "@/types/authType";
import { createContext, useState, useEffect, FC } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { ref, set } from 'firebase/database'


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user: ', user);
      if (user) {
        setIsAuthenticated(true);
        setUser({
          userId: user.uid,
          username: user.displayName || "",
          email: user.email || "",
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    
    });

    return unsub;

  }, []);

  const updateDataUser = async(user: any) => {
    setUser({
      userId: user.uid,
      username: user.displayName || "",
      email: user.email || "",
    });
  }

  const login = async ({ email, password }: LoginCredentials): Promise<any> => {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      return {success: true};
    } catch (error:any) {
      let msg = error.message;
      if(msg.includes('(auth/invalid-credential)')) msg = 'Credenciales incorrectas'
      return {success: false, msg}
    }
  };

  const logout = async (): Promise<any> => {
    try {
      await signOut(FIREBASE_AUTH);
      setUser(null)
      return {success: true}  
    } catch (error:any) {
      return {success: false, msg: error.message}
    }
  };

  const register = async ({ email, password, username}: RegisterInfo): Promise<any> => {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const currentUser = FIREBASE_AUTH.currentUser;

      if (currentUser) {
        await updateProfile(currentUser, { displayName: username });
        await currentUser.reload();
        await updateDataUser(currentUser);
      } else {
        throw new Error('No user is currently signed in.');
      } 

      console.log('response.user: ', response?.user);
  
      await set(ref(FIREBASE_DB, 'users/' + response?.user?.uid), {
        username,
        email,
        userId: response?.user?.uid
      });
      return {success: true, data: response?.user}
    } catch (e:any) {
      let msg = e.message;
      if(msg.includes('(auth/invalid-email)')) msg = 'Correo electrónico inválido';
      if(msg.includes('(auth/email-already-in-use')) msg = 'Correo electrónico ya esta en uso';
      return {success: false, msg}
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
