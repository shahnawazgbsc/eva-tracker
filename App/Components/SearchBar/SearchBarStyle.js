import {StyleSheet} from "react-native";
import {Colors, Metrics} from "../../Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.searchBg,
    padding: Metrics.baseMargin,
    zIndex: 1
  },
  textContainer: {
    backgroundColor: Colors.white,
    padding: Metrics.smallMargin,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchIcon: {
    fontSize: 20
  },
  label: {
    fontSize: 14,
    color: Colors.text
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    color: Colors.text,
    marginLeft: Metrics.smallMargin
  }
});
