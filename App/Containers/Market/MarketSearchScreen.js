import * as React from 'react'
import { View } from 'react-native'
import Header from '../../Components/Header/Header'
import styles from './MarketSearchScreenStyle'
import SearchBar from '../../Components/SearchBar/SearchBar'
import KeywordAutoSuggestBox from '../../Components/KeywordAutoSuggestBox/KeywordAutoSuggestBox'
import { Container } from 'native-base'

export default class MarketSearchScreen extends React.Component {

  render () {
    return (
      <Container style={styles.container}>
        <View onLayout={event => this.setState({ headerHeight: event.nativeEvent.layout.height })}>
          <Header screen='market'/>
        </View>

        <View style={styles.searchContainer}>
          <SearchBar style={styles.searchBar}/>
        </View>
        <KeywordAutoSuggestBox extraMargin={83}/>

      </Container>
    )
  }
}
