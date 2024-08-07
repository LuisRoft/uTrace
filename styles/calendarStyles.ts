import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingTop: 30,
        backgroundColor: '#ffff',
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 10,
      },
    calendar: {
        display: 'flex',
        width: 350,
        height: 400, 
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    navbar: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
        marginVertical: 30,
        marginBottom: 20,
      },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    navText: {
        textAlign: 'center',
        fontSize: 17,
    },
    borderLeft: {
       borderLeftWidth: 0.8,
    },
    active: {
        backgroundColor: '#000',
    },
    activeText: {
        color: '#ffffff',
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        width: width * 0.75,
        padding: 50,
    },
});

export const customTheme = {
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'black',
    monthTextColor: 'black',
    indicatorColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16,
};