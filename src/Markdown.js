import React from 'react'
import Marked from 'marked'

const defaultText = getDefaultText()

class Markdown extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange(e){
    this.setState({ source: e.target.value })
  }
  getMarkdownText=(evaluate) => {
    var rawMarkup = Marked(evaluate,{sanitize: true})
    return{
      __html: rawMarkup
    }
  }
  render() {
    let evaluate = this.state ? this.state.source : defaultText
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="appHeading">Markdown notiation</h2>
            <textarea 
              className="editor"
              defaultValue={defaultText}
              onChange={this.onChange}
            >
            </textarea>
          </div>
          <divcol-md-6 renderedMarkdown>
            <h2 className="appHeading">Rendered Markdown</h2>
            <div 
              contentEditable="true"
              dangerouslySetInnerHTML={this.getMarkdownText(evaluate)}
            /> 
          </divcol-md-6>
        </div>
      </div>
    )
  }
}

function getDefaultText(){
  return [
    '# H1',
    '---',
  ].join('\n')
}

export default Markdown
