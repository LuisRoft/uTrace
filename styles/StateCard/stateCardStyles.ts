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
  }
});
