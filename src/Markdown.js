import React from 'react'

class Markdown extends React.Component {
  constructor() {
    super()
    this.state = {
      value: `hello worls`
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="appHeading">Markdown notiation</h2>
            <textarea >
              {this.props.value}
            </textarea>
          </div>
          <divcol-md-6 renderedMarkdown>
            <h2 className="appHeading">Rendered Markdown</h2>
            <div contentEditable="true"></div>
          </divcol-md-6>
        </div>
      </div>
    )
  }
}

export default Markdown
