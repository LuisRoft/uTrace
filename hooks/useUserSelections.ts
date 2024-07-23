import { useState, useEffect, useCallback } from 'react';
import { ref, get, child } from 'firebase/database';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { useAuth } from '@/hooks/useAuth';

interface UserSelection {
  userId: string;
  date: string;
  selectedEmotion: number;
  [key: string]: any;
}

export const useUserSelections = (): [UserSelection[], boolean, () => void] => {
  const [userSelections, setUserSelections] = useState<UserSelection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUserSelections = useCallback(async () => {
    if (!user) return;

    setLoading(true); // Asegurarse de que se está cargando mientras se recuperan los datos

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

  useEffect(() => {
    fetchUserSelections();
  }, [user, fetchUserSelections]);

  return [userSelections, loading, fetchUserSelections];
};
