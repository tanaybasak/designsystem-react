import React from 'react';
import RichTextEditor from '../../molecules/RichTextEditor/RichTextEditor';

class RichTextEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text1:
        '<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>',
      text2: ''
    };
  }

  render() {
    return (
      <div className="hcl-container">
        <div className="hcl-row">
          <div className="hcl-col-6">
            <div className="rte-wrapper">
              <RichTextEditor />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RichTextEditorExample;
