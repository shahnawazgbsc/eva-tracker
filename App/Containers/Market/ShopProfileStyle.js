import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerExtra: {
    height: 120,
    justifyContent: 'flex-start'
  },
  listStyle: {
    marginTop: -60,
    flex: 1,
    marginHorizontal: 10
  },
  darkText: {
    color: Colors.black,
    textAlign: 'left',
    display:'flex',
    flex:1
  },
  iconPhone: {
    marginLeft: 0,
    marginRight: 8,
    marginTop: 10
  },
  lightDarkText: {
    color: Colors.charcoal,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'left'
  },
  HistoryButton:{
    color: 'white',
    paddingHorizontal: 0,
    paddingLeft: 7,
    paddingRight: 0,

  },
  cardHeaderContainer: { backgroundColor: Colors.fab, alignSelf: 'stretch', flex: 1 },
  cardItem: { marginHorizontal: 3, backgroundColor: Colors.white, flexDirection: 'row' },
  cardChildContainer: { backgroundColor: Colors.success, alignSelf: 'stretch', flex: 1 },
  cardChildContainerDisabled: { backgroundColor: Colors.charcoal, alignSelf: 'stretch', flex: 1 },
  cardChildItem: {
    marginHorizontal: 3,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    height: 80,
    width: 80,
    margin: 15,
    borderRadius: 40
  },
  childIcon: {
    fontSize: 58,
    width: null,
    color: Colors.success
  },
  childIconDisabled: {
    fontSize: 58,
    width: null,
    color: Colors.charcoal
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: 'hidden'
  },
  dialogHeader:{
    justifyContent: 'center',
    backgroundColor: 'rgb(0,164,81)',
},
cardSectionStyle    :{
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding:50,
},
textStyle:{
    flex:1,
    fontSize:18,
    textAlign: 'center',
    color:"#ffffff"
},
containerStyle:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0.75)'
},
dialogContainer:{
    margin:10
},
spinnerStyle: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
  }
})
