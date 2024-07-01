import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    flagsContainer: {
        display: 'flex',
        marginHorizontal: 10,
        height: 27,
        borderColor: '#000',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        backgroundColor: '#fff', 
    },
    flags: {
        flexShrink: 1, 
        flexGrow: 1, 
        width: '100%', 
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 10, 
        color: '#000', 
    }
});
