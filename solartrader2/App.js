import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet } from 'react-native'
import { Container, Root, StyleProvider, View } from 'native-base'
import * as Font from 'expo-font';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import getTheme from './native-base-theme/components'
import platform from './native-base-theme/variables/platform'

import { Colors } from './constants'
import store from './store'

import Tabs from './components/Tabs'

export default class App extends Component {
  state = { loading: true }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return <Container style={styles.container} />
    }
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <StyleProvider style={getTheme(platform)}>
            <View style={styles.container}>
              <Root>
                <StatusBar barStyle="light-content" />
                <Tabs />
              </Root>
            </View>
          </StyleProvider>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLUE1,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight
  }
})
