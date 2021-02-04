import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import './rte.css';
import Quill from 'quill/quill';

import {
  boldIcon,
  boldSelected,
  italicIcon,
  italicSelected,
  underlineIcon,
  underlineSelected,
  bulletList,
  bulletListSelected,
  linkIcon,
  linkSelected,
  inlineClose,
  checkmark,
  edit
} from '../../util/icons';
//import 'quill/dist/quill.core.css';
//import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';

//const Tooltip = Quill.import('ui/tooltip');
import Overlay from '../../atoms/Overlay/Overlay';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button/Button';
import { relative } from 'upath';
var Link = Quill.import('formats/link');

var builtInFunc = Link.sanitize;
Link.sanitize = function customSanitizeLinkInput(url) {
  var val = url;

  // do nothing, since this implies user's already using a custom protocol
  if (/^\w+:/.test(val));
  else if (!/^https?:/.test(val)) val = 'http:' + val;

  return builtInFunc.call(this, val); // retain the built-in logic
};

const RichTextEditor = ({ config }) => {
  const toolbarRef = useRef();
  const editorRef = useRef();

  const quillRef = useRef();

  const [showTootip, toggleTooltip] = useState(false);
  const [showVisitTootip, toggleVisitTooltip] = useState(false);
  const [activeStyles, toggleActiveStyles] = useState(false);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [linkText, setLinkText] = useState('');
  const [textVal2, setTextVal2] = useState();
  //const [visitUrl, setVisitUrl] = useState(null);

  //let quill = null;

  const toolbarAlign = fnstring => {
    switch (fnstring) {
      case 'bold':
        return bold();
      case 'italic':
        return italic();
      case 'underline':
        return underline();
      case 'link':
        return link();
      case 'bulletlist':
        return bulletlist();
    }
  };

  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      modules: {
        toolbar: toolbarOptions
      }
      //theme: 'snow'
    });
    var toolbarOptions = {
      handlers: {
        // handlers object will be merged with default handlers object
        link: function (value) {
          console.log('new edition to toolbaroption');
          if (value) {
            var href = prompt('Enter the URL');
            quillRef.current.format('link', href);
          } else {
            quillRef.current.format('link', false);
          }
        }
      }
    };

    quillRef.current.on('text-change', function (delta, oldDelta, source) {
      if (source == 'api') {
        console.log('An API call triggered this change.');
        const formats = quillRef.current.getFormat();

        if (formats['link']) {
          //console.log(delta.ops[0]);
          //console.log('api link ******************', formats['link']);
        }
      } else if (source == 'user') {
        console.log('A user action triggered this change.');
      } else {
        console.log('NONE', delta, oldDelta, source);
      }
    });

    quillRef.current.on('selection-change', function (range, oldRange, source) {
      if (range) {
        if (range.length == 0) {
          //console.log('range 0');
          console.log(
            'User cursor is on',
            range.index,
            quillRef.current.getFormat(),
            quillRef.current.getContents()
          );
          const formats = quillRef.current.getFormat();
          console.log(formats.link, '----------->current link');
          // console.log('imp-------->', oldRange);
          //console.log(formats['link'], "formats['link']");
          if (formats['link']) {
            // var text1 = quillRef.current.getText(range.index, oldRange.length);
            // var delta = quillRef.current.getContents();
            var abc = editorRef.current.querySelector(
              `a[href="${formats.link}"]`
            );
            console.log(abc, '----------->textContent');
           //  setLinkText(abc.textContent);
            const bound = quillRef.current.getBounds(range.index);
            //console.log(oldRange);
            setTop(bound.top + 30);
            setLeft(bound.left - 40);
            //toggleActiveStyles(quillRef.current.getFormat());
            //`a[href=${formats['link']}`
            //console.log('toggle visit tooltip true --->1', delta);

            // quillRef.current.format('link', false);
            // delta.ops.forEach(i => {
            //   if (formats['link'] === i.attributes['link']) {
            //     console.log(i);
            //   }
            // });
            //let abc = editorRef.current.childElemt;
            //console.log('range 0 link', event.target.textContent);
            //var container = document.querySelector('#editorRef-container');
            // let range1 = new Range();

            // range1.setStart(p, 0);
            // range1.setEnd(p, 2);
            // console.log(range);
            // var linkNode = document.querySelector('#container a');

            // console.log(linkNode);
            //toggleTooltip(false);
            toggleVisitTooltip(true);
            // event.target ? setLinkText(event.target.href) : null;
            // setLinkText(event.target.href);
            // text.format('link', false);
            //setVisitUrl(formats['link']);
            //const bound = quillRef.current.getBounds(range.index);
            //console.log(oldRange);
            //setTop(bound.top + 30);
            // setLeft(bound.left);
          }
          //  else {
          //   toggleTooltip(false);
          // }
          //console.log('updated value, format link om range === 0 --------->1');
        } else {
          var text = quillRef.current.getText(range.index, range.length);
          const formats = quillRef.current.getFormat();
          console.log('range greater than 0 text', text);
          toggleVisitTooltip(false);
          // console.log('range greater than 0 linkText', linkText);
          // if (formats['link']) {
          //   //toggleTooltip(false);
          //   console.log('else is in link called ------------> else');
          //   // setVisitUrl(formats['link']);
          //   //setTextVal(linkText);
          // }

          // var linkNode = document.querySelector('#container a');
          //var linkBlot = quillRef.current.getContents();
          //console.log('setVisitUrl', linkBlot.ops);
          //setTextVal2(formats['link']);
          setTextVal2(text);
          const bound = quillRef.current.getBounds(range.index);
          //console.log(oldRange);
          setTop(bound.top + 30);
          setLeft(bound.left - 40);

          // console.log(
          //   'else---->updated value, format link om range !== 0 --------->3'
          // );
          //}
        }
      } else {
        console.log('Cursor not in the editor');
      }
    });
  }, []);

  const removeLink = () => {
    console.log('Remove Link', quillRef.current);
    //quillRef.current.removeFormat(0, 3);
    //console.log(quillRef.current.format, 'before remove link');
    quillRef.current.format('link', false);
    console.log(quillRef.current);
    toggleTooltip(false);
    //console.log(quillRef.current.format, 'after remove link');
    toggleVisitTooltip(false);
    toggleActiveStyles(quillRef.current.getFormat());
  };

  const addLink = () => {
    // console.log('add Link', quillRef.current);
    //quillRef.current.removeFormat(0, 3);
    // quillRef.current.format('link', true);
    toggleTooltip(false);
    toggleVisitTooltip(false);
    toggleActiveStyles(quillRef.current.getFormat());
    // quillRef.current.insertText(
    //   0,
    //   textVal2,
    //   'link',
    //   linkText ? linkText : textVal2
    // );
    quillRef.current.format('link', linkText ? linkText : textVal2);
    // var linkNode = document.querySelector('#container a');
    // Quill.find(linkNode);
  };

  // const getValue = () => {
  //   const abc = quillRef.current.getContents();
  //   return abc.ops[0].insert;
  // };

  // const handleToggle = (status, type) => {
  //   if (type == 'outside') {
  //     toggleTooltip(false);
  //     //console.log(quillRef.current.format, 'after remove link');
  //     // toggleVisitTooltip(false);
  //   }
  // };

  // const handleToggle2 = (status, type) => {
  //   if (type == 'outside') {
  //     toggleVisitTooltip(false);
  //     //console.log(quillRef.current.format, 'after remove link');
  //   }
  // };

  const editLink = () => {
    //console.log('edit Link', quillRef.current);
    //quillRef.current.removeFormat(0, 3);
    //quillRef.current.format('link', true);
    toggleVisitTooltip(false);
    toggleTooltip(true);
    toggleActiveStyles(quillRef.current.getFormat());
  };

  const format = (type, value) => {
    if (type === 'link') {
      toggleTooltip(true);
    } else {
      quillRef.current.format(
        type,
        quillRef.current.getFormat()[type] ? false : true
      );
      toggleActiveStyles(quillRef.current.getFormat());
    }
  };

  const bold = () => {
    return (
      <Button kind="button" type="neutral" onClick={format.bind(this, 'bold')}>
        {activeStyles && activeStyles['bold'] ? boldSelected : boldIcon}
      </Button>
    );
  };

  const italic = () => {
    return (
      <Button
        kind="button"
        type="neutral"
        onClick={format.bind(this, 'italic')}
      >
        {activeStyles && activeStyles['italic'] ? italicSelected : italicIcon}
      </Button>
    );
  };

  const underline = () => {
    return (
      <Button
        kind="button"
        type="neutral"
        onClick={format.bind(this, 'underline')}
      >
        {activeStyles && activeStyles['underline']
          ? underlineSelected
          : underlineIcon}
      </Button>
    );
  };

  const bulletlist = () => {
    return (
      <Button
        kind="button"
        value="bullet"
        type="neutral"
        onClick={format.bind(this, 'list', 'bullet')}
      >
        {activeStyles && activeStyles['list'] ? bulletListSelected : bulletList}
      </Button>
    );
  };

  const link = () => {
    return (
      <Button
        kind="button"
        value="bullet"
        type="neutral"
        onClick={format.bind(this, 'link')}
        // onClick={() => {
        //format.bind(this, 'link');
        // quillRef.current.format('link', true);

        // quillRef.current.format(
        //   'link',
        //   quillRef.current.getFormat()['link'] ? false : true
        // );
        //}}
        // onClick={() => {
        //   //var href = prompt('Enter the URL');
        //   quillRef.current.format('link', );
        // }}
      >
        {activeStyles && activeStyles['link'] ? linkSelected : linkIcon}
      </Button>
    );
  };

  return (
    <div className="hcl-rte-wrapper">
      <div ref={toolbarRef}>
        {config
          ? config.map((release, index) => {
              return (
                <React.Fragment key={`rte-${index}`}>
                  {toolbarAlign(release.type)}
                </React.Fragment>
              );
            })
          : null}
      </div>
      <div style={{ position: 'relative' }}>
        <div ref={editorRef} className="rte-editor" />
        {showTootip ? (
          <Overlay
            showOverlay
            style={{ top: top + 'px', left: left + 'px' }}
            // onToggle={handleToggle}
          >
            <div
              className="hcl-rte-flex"
              style={{ padding: '8px 14px', whiteSpace: 'nowrap' }}
            >
              {/* URL : <a href={visitUrl}>{visitUrl}</a> */}
              URL :
              <TextInput
                type="text"
                placeholder="name"
                value={linkText ? linkText : textVal2}
                id="firstname"
                onChange={event => {
                  //console.log(event.currentTarget.value);
                  toggleVisitTooltip(false);
                  setLinkText(event.currentTarget.value);
                }}
              />
              <Button type="neutral" onClick={addLink}>
                {checkmark}
              </Button>
              <Button type="neutral" onClick={removeLink}>
                {inlineClose}
              </Button>
            </div>
          </Overlay>
        ) : null}
        {showVisitTootip ? (
          <Overlay
            showOverlay
            style={{ top: top + 'px', left: left + 'px' }}
            // onToggle={handleToggle2}
          >
            <div
              className="hcl-rte-flex"
              style={{ padding: '8px 14px', whiteSpace: 'nowrap' }}
            >
              Visit URL :{' '}
              <a className="hcl-rte-new">{linkText ? linkText : textVal2}</a>
              <Button type="neutral" onClick={editLink}>
                {edit}
              </Button>
              <Button type="neutral" onClick={removeLink}>
                {inlineClose}
              </Button>
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

RichTextEditor.propTypes = {
  /* Data for table  */
  config: PropTypes.array
};

RichTextEditor.defaultProps = {
  /** Data for table  */
  config: []
};

export default RichTextEditor;
