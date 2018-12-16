import * as React from 'react'
import {View} from "react-native";
import styles from "./KeywordAutoSuggestBoxStyle";
import {ListItem, Text} from "native-base";
import {Actions} from "react-native-router-flux";

export default class KeywordAutoSuggestBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword:props.data
        }
    }
    render() {
        return (
        <View style={[styles.container, {top: 30 + (extraMargin || 0)}]}>
          <Text style={styles.textTotal}>{total != null? `${total} results found for "${this.state.keyword}" show results for` : "No result found"}</Text>
          <ListItem noBorder iconRight button onPress={() => {
            if (provider == null) return;
          }}>
            <Text style={styles.text}>{provider != null ? `${provider} providers contain "${this.state.keyword}"` : "No result found"}</Text>
          </ListItem>
        </View>
      );
    }
}