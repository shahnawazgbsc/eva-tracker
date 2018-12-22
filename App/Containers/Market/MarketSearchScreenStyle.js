import {StyleSheet} from "react-native";
import {Colors, Metrics,ApplicationStyles} from "../../Themes/";
import Fonts from "../../Themes/Fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.searchBg
  },
  breadcrumbContainer:{
    flexDirection: "row", padding: 10, alignItems: 'center'
  },
  searchBar: {
    flex: 1,
  },
  map: {
    ...ApplicationStyles.shadow,
    flex: 1,
    height: 200,
  },
  filterButton: {
    padding: Metrics.marginVertical,
    alignSelf: "center",
  },
  list: {
    paddingHorizontal: Metrics.baseMargin - 2,
  },
  noResult: {
    flex: 1,
    flexDirection: "row",
    padding: Metrics.section,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    flex: 1,
    fontSize: Fonts.size.medium - 1,
    color: Colors.textHeader,
  },
  iconBack: {
    padding: 5,
    color: Colors.textHeader,
  },
  filterIcon: {
    marginLeft: 0,
    marginRight: 0,
    color: Colors.textDark,
    fontSize: 38,
  },
  searchContainer: {
    ...ApplicationStyles.shadow,
    zIndex: 2,
    elevation: 4,
    flexDirection: 'row',
    backgroundColor: Colors.searchBg,
    alignContent: 'center',
  },
  filter: {
    position: 'absolute',
    ...ApplicationStyles.shadow,
    right: 0,
    elevation: 4,
    zIndex: 3,
  }
});
