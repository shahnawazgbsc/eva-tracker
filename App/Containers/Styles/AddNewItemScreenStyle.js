import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  fab: {
    backgroundColor: Colors.fab,
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerContent: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.silver,
    borderTopColor: Colors.fab,
    borderBottomColor: Colors.fab,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: Metrics.smallMargin,
    borderBottomWidth: Metrics.smallMargin
  },
  headerIcon: {
    fontSize: 54,
    color: Colors.white
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  listHeader: {
    flexDirection: 'row'
  },
  itemRow: {
    flexDirection:'row'
  },
  item1: {
    flex: 1
  },
  item2: {
    flex: 2, textAlign: 'left'
  },
  item3: {
    flex: 1, textAlign: 'right', marginRight: 5
  },
  item4: {
    flex: 1, textAlign: 'left'
  },
  item5: {
    flex: 1
  },
  amountText: {
    color: Colors.white,
    margin: 10
  },
  headerText: {
    color: Colors.white,
    fontSize: 24,
    textAlign: 'center'
  }

})
