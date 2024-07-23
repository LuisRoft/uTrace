// stateCardStyles.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    borderRadius: 20,
    margin: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  left: {
    width: '38%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '62%',
    flex: 1,
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 10,
  },
  title: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotions: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activities: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 10,
    position: 'relative', 
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
  },
  modalBody: {
    alignItems: 'center',
    paddingBottom: 20, 
  },
  modalText: {
    fontSize: 18,
    marginVertical: 8,
  },
  modalFlagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 7,
  },
  modalColumn: {
    flex: 1,
    alignItems: 'center',
  },
});
