import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'

class App extends Component {
  state = { markdown: '# yo!' }

  render() {
    return (
      <React.Fragment>
        <demo>
          <textarea
            onInput={this.updateState}
            value={this.state.markdown}
          />

          <compiled>
            <Markdown>{this.state.markdown}</Markdown>
          </compiled>
        </demo>
      </React.Fragment>
    )
  }
}

export default App
