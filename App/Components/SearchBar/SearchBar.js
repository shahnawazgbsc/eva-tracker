import * as React from "react";
import {ActivityIndicator, Keyboard, Text, TextInput, View} from "react-native";
import styles from "./SearchBarStyle";
import {Colors} from "../../Themes";
import {Icon} from "native-base";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        keywordFetch:props.keyword
    }
  }


 componentDidMount() {
    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);
  }

 render() {
    return (
      <View style={[styles.container, this.props.style]}>

        <View style={styles.textContainer}>
          <Text>Find :</Text>
          <TextInput
            style={styles.input}
            placeholder={"Shop,Market"}
            underlineColorAndroid={Colors.transparent}
            onChangeText={this.onSearchInput}
            autoCorrect={false}
            autoCapitalize={"none"}
            autoFocus={true}
            onBlur={this.blurKeywords}
            placeholderTextColor={Colors.textSuggestion}
          />
          {this.state.keywordFetch && <ActivityIndicator size="small" color={Colors.searchBg}/>}

        </View>

      </View>
    );
  }

onSearchInput = (text) => {
    console.log(text);
  };

blurKeywords = () => {
  };

}