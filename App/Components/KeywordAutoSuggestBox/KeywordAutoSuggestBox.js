import * as React from 'react'
import {View} from "react-native";
import styles from "./KeywordAutoSuggestBoxStyle";
import {ListItem, Text} from "native-base";

var total = 0;
var provider = 0;

export default class KeywordAutoSuggestBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword:props.data,
            extraMargin:props.extraMargin
        }
    }
    render() {
        return (
        <View style={[styles.container, {top: 30 + (this.state.extraMargin || 0)}]}>
          <Text style={styles.textTotal}>{total != null? `${total} results found for "${this.state.keyword}" show results for` : "No result found"}</Text>
          <ListItem noBorder iconRight button onPress={() => {
          }}>
            <Text style={styles.text}>{provider != null ? `${provider} providers contain "${this.state.keyword}"` : "No result found"}</Text>
          </ListItem>
        </View>
      );
    }
}