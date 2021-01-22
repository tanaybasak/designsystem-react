import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import './rte.css';
import Quill from 'quill/quill';
//import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';
var Link = Quill.import('formats/link');

const Tooltip = Quill.import('ui/tooltip');
import Overlay from '../../atoms/Overlay/Overlay';

import Button from '../../atoms/Button/Button';
import { relative } from 'upath';

var builtInFunc = Link.sanitize;
Link.sanitize = function customSanitizeLinkInput(linkValueInput) {
  var val = linkValueInput;

  console.log('LINK VALUE', val);

  // do nothing, since this implies user's already using a custom protocol
  if (/^\w+:/.test(val));
  else if (!/^https?:/.test(val)) val = 'http:' + val;

  return builtInFunc.call(this, val); // retain the built-in logic
};

const RichTextEditor = () => {
  const toolbarRef = useRef();
  const editorRef = useRef();

  const quillRef = useRef();

  const [showTootip, toggleTooltip] = useState(false);
  const [activeStyles, toggleActiveStyles] = useState(false);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [visitUrl, setVisitUrl] = useState(null);

  let quill = null;
  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      modules: {
        toolbar: false
      },
      theme: 'snow'
    });

    quillRef.current.on('text-change', function (delta, oldDelta, source) {
      if (source == 'api') {
        console.log('An API call triggered this change.');
      } else if (source == 'user') {
        console.log('A user action triggered this change.');
      } else {
        console.log('NONE', delta, oldDelta, source);
      }
    });

    quillRef.current.on('selection-change', function (range, oldRange, source) {
      if (range) {
        toggleActiveStyles(quillRef.current.getFormat());

        if (range.length == 0) {
          console.log(
            'User cursor is on',
            range.index,
            quillRef.current.getFormat(),
            quillRef.current.getContents()
          );

          //   const formats = quillRef.current.getFormat();
          //   if (formats['link']) {
          //     toggleTooltip(true);
          //     setVisitUrl(formats['link']);
          //     const bound = quillRef.current.getBounds(range.index);
          //     setTop(bound.top + 30);
          //     setLeft(bound.left);
          //   } else {
          //     toggleTooltip(false);
          //   }

          //toggleTooltip(true);
          //   let myTooltip = new Tooltip(quill);

          //   myTooltip.show();
        } else {
          var text = quillRef.current.getText(range.index, range.length);
          console.log(
            'User has highlighted',
            text,
            quillRef.current.getFormat()
          );
        }
      } else {
        console.log('Cursor not in the editor');
      }
    });
  }, []);

  const removeLink = () => {
    console.log('Remove LInk', quillRef.current);
    //quillRef.current.removeFormat(0, 3);
    quillRef.current.format('link', false);
  };

  const format = (type, value) => {
    if (type === 'list') {
      quillRef.current.format(type, value);
    } else {
      quillRef.current.format(
        type,
        quillRef.current.getFormat()[type] ? false : true
      );
    }

    toggleActiveStyles(quillRef.current.getFormat());
  };

  return (
    <div className="hcl-rte-wrapper">
      <div ref={toolbarRef}>
        <Button
          style={{
            color: activeStyles && activeStyles['bold'] ? 'red' : 'blue'
          }}
          kind="button"
          type="neutral"
          onClick={format.bind(this, 'bold')}
        >
          B
        </Button>

        <Button
          kind="button"
          type="neutral"
          onClick={format.bind(this, 'underline')}
        >
          U
        </Button>

        <Button
          kind="button"
          type="neutral"
          onClick={format.bind(this, 'italic')}
        >
          I
        </Button>

        <Button
          kind="button"
          value="ordered"
          onClick={format.bind(this, 'list', 'ordered')}
          type="neutral"
        >
          OL
        </Button>

        <Button
          kind="button"
          value="bullet"
          type="neutral"
          onClick={format.bind(this, 'list', 'bullet')}
        >
          UL
        </Button>
        {/* <Button kind="button" className="ql-link" type="neutral">
          LINK MIAN
        </Button> */}
        <Button
          kind="button"
          value="bullet"
          type="neutral"
          onClick={() => {
            var href = prompt('Enter the URL');

            quillRef.current.format('link', href);
          }}
        >
          LINK
        </Button>
      </div>
      <div style={{ position: 'relative' }}>
        <div ref={editorRef} className="rte-editor" />

        {showTootip ? (
          <Overlay showOverlay style={{ top: top + 'px', left: left + 'px' }}>
            <div style={{ padding: '10px' }}>
              Visit url : <a href={visitUrl}>{visitUrl}</a>{' '}
              <button onClick={removeLink}>Remove</button>
            </div>
          </Overlay>
        ) : null}
      </div>
    </div>
  );
};

// const RichTextEditor = () => {
//   const editorRef = useRef();
//   const toolbarRef = useRef();
//   const quillRef = useRef();

//   useEffect(() => {
//     quillRef.current = new Quill(editorRef.current, {
//       modules: {
//         toolbar: toolbarRef.current
//       },
//       placeholder: 'Waiting for your precious content',
//       readOnly: false,
//       theme: 'snow',
//       formats: ['link', 'bold']
//     });
//     // quillRef.current = new Quill(editorRef.current, {
//     //   placeholder: 'Waiting for your precious content',

//     //   modules: {
//     //     toolbar: toolbarRef.current
//     //   },
//     //   theme: 'snow'
//     // });
//   }, []);

//   return (
//     <div className="hcl-rte-wrapper">
//       <div ref={toolbarRef} className="p-editor-toolbar">
//         <span className="ql-formats">
//           <button type="button" className="ql-link" />
//         </span>
//       </div>
//       <div style={{ position: 'relative' }}>
//         <div ref={editorRef} className="rte-editor" />
//       </div>
//     </div>
//   );
// };

RichTextEditor.propTypes = {};

RichTextEditor.defaultProps = {};

export default RichTextEditor;
