import React from 'react';
import RichTextEditor from '../../molecules/RichTextEditor/RichTextEditor';

class RichTextEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text1:
        '<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>',
      text2: '',
      config: [
        { type: 'bold' },
        { type: 'underline' },
        { type: 'italic' },
        { type: 'bulletlist' },
        { type: 'numberlist' },
        { type: 'link' }
      ]
    };
  }

  render() {
    return (
      <div className="hcl-container">
        <div className="hcl-row">
          <div className="hcl-col-6">
            <RichTextEditor
              config={this.state.config}
              onChange={(e, delta) => {
                console.log(e.innerHTML, delta);
              }}
              value={this.state.text1}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RichTextEditorExample;
