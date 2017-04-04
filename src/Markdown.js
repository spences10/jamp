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
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="appHeading">Markdown notiation</h2>
            <textarea
              className="editor"
              rows="25"
              cols="50"
              value={this.state.defaultText}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <divcol-md-6 renderedMarkdown>
            <h2 className="appHeading">Rendered Markdown</h2>
            <div
              contentEditable="true"
              dangerouslySetInnerHTML={this.makeMarkup(this.state.defaultText)}
            />
          </divcol-md-6>
        </div>
      </div>
    )
  }
}

export default Markdown
