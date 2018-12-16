import {StyleSheet} from "react-native";
import {Colors} from "@root/App/Themes";

export default StyleSheet.create({
  container: {

  },
  circle: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: Colors.magento,
    borderWidth: 1,
    borderRadius: 15,
  },
  text: {
    color: Colors.magento,
  }
});
