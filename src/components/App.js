import React, { Component } from 'react'
import Markdown from './Markdown'
import { ThemeProvider } from 'styled-components'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={{ fontFamily: 'Helvetica Neue' }}>
        <Markdown />
      </ThemeProvider>
    )
  }
}

export default App
