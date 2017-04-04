import React from 'react'
import Marked from 'marked'
// import Typist from 'react-typist'

class Markdown extends React.Component {
  constructor() {
    super()
    this.state = {
      defaultText: '# hello world'
    }
  }

  makeMarkup(value) {
    const convert = Marked(value)
    return { __html: convert }
  }

  onChange(e) {
    this.setState({ defaultText: e.target.value })
  }
  render() {
    return (
      <div className="textContainer">
        <div className="row">
          <div className="col-md-6">
            <h1 className="appHeading">Markdown notiation</h1>
            <textarea
              className="editor"
              rows="15"
              cols="25"
              value={this.state.defaultText}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="col-md-6" renderedMarkdown>
            <h1 className="appHeading">Rendered Markdown</h1>
            <div
              className="rendered"
              contentEditable="true"
              dangerouslySetInnerHTML={this.makeMarkup(this.state.defaultText)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Markdown
