import { useState, useEffect, useCallback } from 'react';
import { ref, get, child, remove } from 'firebase/database';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { useAuth } from '@/hooks/useAuth';

interface UserSelection {
  userId: string;
  date: string;
  id: string; // Cambiar a string
  selectedEmotion: number;
  [key: string]: any;
}

export const useUserSelections = (): [UserSelection[], boolean, () => void, (id: string) => void] => {
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
        const userSpecificSelections = selectionsArray.filter((selection) => 
          selection.userId === user.userId
        );
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

  const deleteUserSelection = useCallback(async (id: string) => {
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

  return [userSelections, loading, fetchUserSelections, deleteUserSelection];
};
