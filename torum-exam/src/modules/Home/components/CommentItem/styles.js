import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  imgStyle: { 
    width: 35,
    height: 35,
    borderRadius: 50
  },
  userNameText: {
    lineHeight: 15,
    marginLeft: 10,
    fontSize: 14,
    color: '#1A1714',
    fontWeight: '700'
  },
  infoText: {
    marginLeft: 10,
    lineHeight: 15,
    fontSize: 10,
    color: '#1A1714',
    fontStyle: 'italic',
    fontWeight: '400'
  },
  msgText: {
    fontSize: 15,
    color: '#1A1714',
    fontWeight: '400'
  },
  titleText: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600' 
  }
})

export default styles;