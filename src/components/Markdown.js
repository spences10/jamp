import React from 'react'
import Marked from 'marked'
import styled from 'styled-components'

import { GlobalStyle } from '../theme/globalStyle'

const AppHeading = styled.h1`
  font-family: poppins;
`

const Wrapper = styled.div`
  margin: 1rem auto;
  padding: 1rem;
`

class Markdown extends React.Component {
  constructor() {
    super()
    this.state = {
      markdownText: '# hello world'
    }
  }

  makeMarkup(value) {
    const convert = Marked(value)
    return { __html: convert }
  }

  onChange(e) {
    this.setState({ markdownText: e.target.value })
  }

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <div className="row">
          <div className="col-md-6">
            <AppHeading>Markdown notiation</AppHeading>
            <textarea
              className="editor"
              rows="15"
              cols="25"
              value={this.state.markdownText}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="col-md-6" renderedMarkdown>
            <AppHeading>Rendered Markdown</AppHeading>
            <div
              className="rendered"
              contentEditable="true"
              dangerouslySetInnerHTML={this.makeMarkup(
                this.state.markdownText
              )}
            />
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Markdown
