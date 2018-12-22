import {StyleSheet} from "react-native";
import {Colors, Metrics,ApplicationStyles} from "../../Themes";
import Fonts from "../../Themes/Fonts";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    ...ApplicationStyles.shadow,
    position: 'absolute', zIndex: 4, left: 0, right: 0, elevation: 4
  },
  textTotal: {
    color: Colors.textSuggestion,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.emphasis,
  },
  text: {
    color: Colors.textSuggestion,
    fontFamily: Fonts.type.openSansSemiBold,
    fontSize: Fonts.size.medium
  }
});
