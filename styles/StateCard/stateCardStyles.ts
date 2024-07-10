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
  leftCont: {
    width: "25%",
    padding: 12,
  },
  centerCont: {
    paddingHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'column',
    width: "40%",
    height: "100%",
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  grid: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rightCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-between",
    backgroundColor: '#fff',
    borderRadius: 5,
    width: "25%",
    height: "50%",
    margin: 12,
  },
  activities: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
  },
  costs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  }
});
