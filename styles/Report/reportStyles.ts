import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    tabButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#000',
        borderRadius: 10,
    },
    tabButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        width: width * 0.83,
        padding: 50,
    },
    legendContainer: {
        marginTop: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    colorBox: {
        borderRadius: 10,
        width: 20,
        height: 20,
        marginRight: 10,
    },
    text: {
        fontSize: 14,
        lineHeight: 24,
        color: '#000',
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
      button:{
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 10,
      }
    }
);
