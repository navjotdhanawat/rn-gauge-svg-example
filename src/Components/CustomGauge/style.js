import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  /* Gauge card style */
  card: {
    flexDirection: 'row',
    height: 'auto',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  /* Gauge value style */
  value: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 90,
    fontFamily: 'Seven Segment',
  },
  /* Gauge unit style */
  unit: {
    color: 'red',
    fontSize: 30,
    fontFamily: 'Seven Segment',
  },
})
