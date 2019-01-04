import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    backgroundColor: Colors.background
  },
  input: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 18,
    height: 36,
    fontSize: 10,
    textAlign: 'right',
    paddingLeft: 10,
    paddingRight: 10
  },
  discountInput: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 18,
    height: 10,
    fontSize: 10,
    textAlign: 'right',
    paddingLeft: 10,
    paddingRight: 10
  },
  row: {
    flex: 1,
    padding: 10,
    margin: 10
  },
  listHeader: {
    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'
  },
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  itemRow: {
    flex: 2
  },
  item1: {
    textAlign: 'center',
    marginRight: 10,
    width: 50
  },
  item2: {
    textAlign: 'left', flexWrap: 'wrap', width: 70
  },
  item3: {
    flex: 2, textAlign: 'right', marginRight: 5, flexWrap: 'wrap', fontSize: 10
  },
  item4: {
    flex: 1, textAlign: 'left', flexWrap: 'wrap', fontSize: 10
  },
  item5: {
    width: 30,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0
  }
})
