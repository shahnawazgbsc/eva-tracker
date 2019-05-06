import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.success,
    marginVertical: Metrics.doubleSection,
    justifyContent: 'center'
  },
  card: {
    backgroundColor: Colors.white,
    marginLeft: 5
  },
  profileImgContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden'
  },
  profileImg: {
    height: 50,
    width: 50
  },
  boldLabel: {
    alignSelf: 'flex-start',
    color: Colors.black,
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'flex-start',
    color: Colors.charcoal
  },
  listContent: {
    margin: Metrics.baseMargin
  }
})
