import { StyleSheet } from 'react-native'
import { moderateScale } from '../../Components/moderatescale'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex'
  },
  ImageBackground: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  email: {
    width: moderateScale(20),
    height: moderateScale(20),
    margin: 20,
    padding: 1
  },
  mainstyle: {
    padding: 20
  },
  ButtonStyle: {
    justifyContent: 'space-around',
    marginTop: 20,
    marginRight: 8,
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(0,164,81)',
    fontSize: 50,
    paddingHorizontal: 40
  },
  forgetText: {
    margin: 15, textAlign: 'right', color: 'rgb(91, 87, 55)', marginTop: 30
  }
})
