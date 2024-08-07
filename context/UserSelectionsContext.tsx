import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ref, get, child, push, remove } from 'firebase/database';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { useAuth } from '@/hooks/useAuth';

interface UserSelection {
  userId: string;
  date: string;
  id: number; // Añadir el id aquí
  selectedEmotion: number;
  [key: string]: any;
}

interface UserSelectionsContextType {
  userSelections: UserSelection[];
  loading: boolean;
  fetchUserSelections: () => void;
  addUserSelection: (selection: UserSelection) => void;
  deleteUserSelection: (id: number) => void; // Añadir esta función
}

const UserSelectionsContext = createContext<UserSelectionsContextType | undefined>(undefined);

export const UserSelectionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userSelections, setUserSelections] = useState<UserSelection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUserSelections = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const snapshot = await get(child(ref(FIREBASE_DB), 'userSelections'));
      if (snapshot.exists()) {
        const selectionsArray = Object.values(snapshot.val()) as UserSelection[];
        const userSpecificSelections = selectionsArray.filter((selection) => selection.userId === user.userId);
        setUserSelections(userSpecificSelections);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addUserSelection = async (selection: UserSelection) => {
    try {
      await push(ref(FIREBASE_DB, 'userSelections'), selection);
      await fetchUserSelections();  
    } catch (error) {
      console.error('Error guardando datos: ', error);
    }
  };

  const deleteUserSelection = useCallback(async (id: number) => {
    try {
      await remove(ref(FIREBASE_DB, `userSelections/${id}`));
      setUserSelections(prevSelections => prevSelections.filter(selection => selection.id !== id));
    } catch (error) {
      console.error('Error eliminando datos: ', error);
    }
  }, []);

  useEffect(() => {
    fetchUserSelections();
  }, [user, fetchUserSelections]);

  return (
    <UserSelectionsContext.Provider value={{ userSelections, loading, fetchUserSelections, addUserSelection, deleteUserSelection }}>
      {children}
    </UserSelectionsContext.Provider>
  );
};

export const useUserSelections = (): UserSelectionsContextType => {
  const context = React.useContext(UserSelectionsContext);
  if (!context) {
    throw new Error('useUserSelections debe ser usado dentro de un UserSelectionsProvider');
  }
  return context;
};
