import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Icon, Fab, Toast, View } from 'native-base'
import { connect } from 'react-redux'

import { Colors } from '../../../constants'
import { toggleFavorite } from '../../../store/actions'

class Save extends Component {
  isFavorite = symbol => this.props.favorites.symbols.filter(favorite => favorite === symbol).length

  onPress = quote => {
    this.props.toggleFavorite(quote.symbol)
    this.toast(quote.symbol)
  }

  toast = symbol => {
    const text = this.isFavorite(symbol) ? 'removed from' : 'added to'

    Toast.show({
      text: `${symbol} ${text} favorites.`,
      textStyle: styles.text,
      position: 'top',
      style: styles.toast
    })
  }

  render() {
    const { quote } = this.props.stock.data

    if (!quote) return null

    return (
      <View>
        {!this.props.autoSuggest && (
          <Fab
            style={this.isFavorite(quote.symbol) ? styles.favorite : styles.notFavorite}
            position="bottomRight"
            onPress={() => this.onPress(quote)}
          >
            <Icon name="md-heart" style={styles.icon} />
          </Fab>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  favorite: {
    backgroundColor: Colors.BLUE4
  },
  notFavorite: {
    backgroundColor: Colors.BLUE3
  },
  icon: {
    color: '#fff'
  },
  toast: {
    backgroundColor: Colors.BLUE0,
    borderRadius: 6,
    fontSize: 13,
    marginLeft: 16,
    marginRight: 16,
    marginTop: Platform.OS === 'ios' ? -25 : 6,
    minHeight: 0,
    paddingHorizontal: 6
  },
  text: {
    color: Colors.TEXT_NORMAL,
    fontSize: 13,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  autoSuggest: state.autoSuggest,
  favorites: state.favorites,
  stock: state.stock,
  symbol: state.symbol
})

const mapDispatchToProps = {
  toggleFavorite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
