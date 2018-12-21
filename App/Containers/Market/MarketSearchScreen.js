import * as React from 'react'
import { View } from 'react-native'
import Header from '../../Components/Header/Header'
import styles from './MarketSearchScreenStyle'
import SearchBar from '../../Components/SearchBar/SearchBar'
import KeywordAutoSuggestBox from '../../Components/KeywordAutoSuggestBox/KeywordAutoSuggestBox'
import { Container } from 'native-base'

export default class MarketSearchScreen extends React.Component {
    constructor(props) {
        super(props)
       }
    render() {
        return (
          <Container style={styles.container}>
            <View style={styles.searchContainer}>
              <SearchBar keywordFetch="test" style={styles.searchBar}/>
            </View>
            <KeywordAutoSuggestBox data="test" extraMargin={83}/>
            
          </Container>
        );
      }
    }
