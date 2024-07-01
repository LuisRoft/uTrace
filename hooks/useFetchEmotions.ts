import { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { useAuth } from '@/hooks/useAuth';
import { emotions } from '@/components/Emotions';

interface EmotionData {
    value: number;
    color: string;
    text: string;
    emotionName: string;
}

const getEmotionName = (index: number): string => {
    const emotionNames = ['Feliz', 'Triste', 'Enojado', 'Miedo', 'Asco', 'No sé'];
    return emotionNames[index] || 'Desconocido';
};

export const useFetchEmotions = (): [EmotionData[], boolean] => {
    const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMonthlyEmotions = async () => {
            if (!user) return;

            try {
                const snapshot = await get(child(ref(FIREBASE_DB), 'userSelections'));
                if (snapshot.exists()) {
                    const selectionsArray = Object.values(snapshot.val());
                    const userSpecificSelections = selectionsArray.filter((selection: any) => {
                        return typeof selection === 'object' &&
                            selection !== null &&
                            'userId' in selection &&
                            selection.userId === user.userId;
                    });

                    const currentDate = new Date();
                    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

                    const monthlySelections = userSpecificSelections.filter((selection: any) => {
                        const selectionDate = new Date(selection.date);
                        return selectionDate >= firstDayOfMonth && selectionDate <= currentDate;
                    });

                    const emotionCounts: { [key: number]: number } = {};
                    monthlySelections.forEach((selection: any) => {
                        emotionCounts[selection.selectedEmotion] = (emotionCounts[selection.selectedEmotion] || 0) + 1;
                    });

                    const totalSelections = monthlySelections.length;
                    const chartData = Object.entries(emotionCounts).map(([emotionIndex, count]) => ({
                        value: (count / totalSelections) * 100,
                        color: emotions[Number(emotionIndex)].backgroundColor,
                        text: `${((count / totalSelections) * 100).toFixed(1)}%`,
                        emotionName: getEmotionName(Number(emotionIndex))
                    }));

                    setEmotionData(chartData);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyEmotions();
    }, [user]);

    return [emotionData, loading];
};
