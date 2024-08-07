import { useState, useEffect } from 'react';
import { ref, get, child, set } from 'firebase/database';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { useAuth } from '@/hooks/useAuth';
import { emotions } from '@/components/Emotions';

export interface EmotionData {
    value: number;
    color: string;
    text: string;
    emotionName: string;
}

const getEmotionName = (index: number): string => {
    const emotionNames = ['Feliz', 'Triste', 'Enojado', 'Miedo', 'Asco', 'No sé'];
    return emotionNames[index] || 'Desconocido';
};

const saveEmotionDataToFirebase = async (userId: string, data: EmotionData[], date: string) => {
    try {
        await set(ref(FIREBASE_DB, `emotionReports/${userId}/${date}`), data);
    } catch (error) {
        console.error('Error saving emotion data:', error);
    }
};

const calculateEmotionData = (selections: any[]): EmotionData[] => {
    const emotionCounts: { [key: number]: number } = {};
    selections.forEach((selection: any) => {
        emotionCounts[selection.selectedEmotion] = (emotionCounts[selection.selectedEmotion] || 0) + 1;
    });

    const totalSelections = selections.length;
    return Object.entries(emotionCounts).map(([emotionIndex, count]) => ({
        value: (count / totalSelections) * 100,
        color: emotions[Number(emotionIndex)].backgroundColor,
        text: `${((count / totalSelections) * 100).toFixed(1)}%`,
        emotionName: getEmotionName(Number(emotionIndex))
    }));
};

export const getEmotionDataForDate = async (userId: string, date: string): Promise<EmotionData[]> => {
    try {
        const snapshot = await get(child(ref(FIREBASE_DB), `emotionReports/${userId}/${date}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available for this date');
            return [];
        }
    } catch (error) {
        console.error('Error fetching emotion data for date:', error);
        return [];
    }
};

export const useFetchEmotions = (): [EmotionData[], EmotionData[], EmotionData[], boolean, (userId: string, date: string) => Promise<EmotionData[]>] => {
    const [dailyEmotionData, setDailyEmotionData] = useState<EmotionData[]>([]);
    const [monthlyEmotionData, setMonthlyEmotionData] = useState<EmotionData[]>([]);
    const [yearlyEmotionData, setYearlyEmotionData] = useState<EmotionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
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
                    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
                    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

                    const dailySelections = userSpecificSelections.filter((selection: any) => {
                        const selectionDate = new Date(selection.date);
                        return selectionDate >= startOfDay;
                    });

                    const monthlySelections = userSpecificSelections.filter((selection: any) => {
                        const selectionDate = new Date(selection.date);
                        return selectionDate >= firstDayOfMonth;
                    });

                    const yearlySelections = userSpecificSelections.filter((selection: any) => {
                        const selectionDate = new Date(selection.date);
                        return selectionDate >= firstDayOfYear;
                    });

                    const dailyData = calculateEmotionData(dailySelections);
                    const monthlyData = calculateEmotionData(monthlySelections);
                    const yearlyData = calculateEmotionData(yearlySelections);

                    setDailyEmotionData(dailyData);
                    setMonthlyEmotionData(monthlyData);
                    setYearlyEmotionData(yearlyData);

                    const dateString = currentDate.toISOString().split('T')[0];
                    saveEmotionDataToFirebase(user.userId, dailyData, dateString);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return [dailyEmotionData, monthlyEmotionData, yearlyEmotionData, loading, getEmotionDataForDate];
};