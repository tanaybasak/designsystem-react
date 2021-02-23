import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
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
  numberList,
  numberListSelected,
  linkIcon,
  linkSelected,
  inlineClose,
  checkmark,
  edit
} from '../../util/icons';
import Overlay from '../../atoms/Overlay/Overlay';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button/Button';

const RichTextEditor = ({
  config,
  onChange,
  value,
  visitLinktext,
  linkText
}) => {
  const editorRef = useRef();

  const quillRef = useRef();

  const [showTootip, toggleTooltip] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const [showVisitTootip, toggleVisitTooltip] = useState(false);
  const [activeStyles, toggleActiveStyles] = useState(false);

  const [selectedtext, setSelectedText] = useState('');
  const [textVal, setTextVal] = useState('');

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
      case 'numberlist':
        return numberlist();
    }
  };

  const showOveralyTooltip = () => {
    setTargetElement(
      window.getSelection().getRangeAt(0).startContainer.parentNode
    );
    toggleTooltip(true);
  };

  const hideOveralyTooltip = () => {
    setTargetElement(null);
    toggleTooltip(false);
  };

  const handler = range => {
    if (range) {
      if (range.length == 0) {
        const formats = quillRef.current.getFormat();
        toggleActiveStyles(formats);
        if (formats['link']) {
          if (!showTootip) {
            setTextVal(formats.link);
            showOveralyTooltip();
            toggleVisitTooltip(true);
          }
        } else {
          hideOveralyTooltip();
        }
      } else {
        var text = quillRef.current.getText(range.index, range.length);
        setSelectedText(text);
        const formats = quillRef.current.getFormat();
        if (!formats['link']) {
          setTextVal(text);
          hideOveralyTooltip();
        } else {
          showOveralyTooltip();
        }
        toggleActiveStyles(quillRef.current.getFormat());
      }
    }
  };

  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      modules: {
        toolbar: false
      }
    });

    quillRef.current.on('text-change', function (delta, oldDelta, source) {
      if (source == 'api') {
        toggleActiveStyles(quillRef.current.getFormat());
        onChange(editorRef.current.querySelector('.ql-editor'), delta);
      } else if (source == 'user') {
        toggleActiveStyles(quillRef.current.getFormat());
        onChange(editorRef.current.querySelector('.ql-editor'), delta);
      }
    });

    quillRef.current.on('selection-change', handler);
  }, []);

  const updateLink = formatLink => {
    quillRef.current.focus();

    let select = quillRef.current.getSelection();
    let indexVal = quillRef.current.getIndex(
      quillRef.current.getLeaf(select.index)[0]
    );
    let length = quillRef.current.getLeaf(select.index)[0].parent.domNode
      .textContent.length;

    if (formatLink == 'remove') {
      if (select.length) {
        quillRef.current.format('link', false);
      } else {
        quillRef.current.formatText(indexVal, length, 'link', false);
      }
      hideOveralyTooltip();
      toggleVisitTooltip(false);
      toggleActiveStyles(quillRef.current.getFormat());
    } else if (formatLink == 'add') {
      if (select.length) {
        quillRef.current.format(
          'link',
          quillRef.current.getFormat().link
            ? quillRef.current.getFormat().link
            : textVal
        );
      } else {
        quillRef.current.formatText(indexVal, length, 'link', textVal);
      }

      hideOveralyTooltip();
    } else {
      toggleVisitTooltip(false);
      toggleActiveStyles(false);
    }
  };

  const format = (type, value) => {
    if (type === 'link') {
      quillRef.current.focus();
      let select = quillRef.current.getSelection();
      let domNode = quillRef.current.getLeaf(select.index)[0].parent.domNode;
      if (select.length) {
        showOveralyTooltip();
        toggleVisitTooltip(false);
      }
      if (domNode.nodeName === 'A' && domNode.textContent !== selectedtext) {
        updateLink('remove');
      }
    } else {
      if (value === 'bullet') {
        quillRef.current.format(
          type,
          quillRef.current.getFormat()[type] &&
            quillRef.current.getFormat()[type] !== 'ordered'
            ? false
            : value
        );
      } else if (value === 'ordered') {
        quillRef.current.format(
          type,
          quillRef.current.getFormat()[type] &&
            quillRef.current.getFormat()[type] !== 'bullet'
            ? false
            : value
        );
      } else {
        quillRef.current.format(
          type,
          quillRef.current.getFormat()[type] ? false : true
        );
      }
    }
  };

  const bold = () => {
    return (
      <Button
        kind="button"
        type="neutral"
        aria-label="Bold"
        onClick={format.bind(this, 'bold')}
      >
        {activeStyles && activeStyles['bold'] ? boldSelected : boldIcon}
      </Button>
    );
  };

  const italic = () => {
    return (
      <Button
        kind="button"
        type="neutral"
        aria-label="Italic"
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
        aria-label="Underline"
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
        aria-label="BulletList"
        onClick={format.bind(this, 'list', 'bullet')}
      >
        {activeStyles && activeStyles['list'] === 'bullet'
          ? bulletListSelected
          : bulletList}
      </Button>
    );
  };

  const numberlist = () => {
    return (
      <Button
        kind="button"
        value="ordered"
        type="neutral"
        aria-label="NumberedList"
        onClick={format.bind(this, 'list', 'ordered')}
      >
        {activeStyles && activeStyles['list'] === 'ordered'
          ? numberListSelected
          : numberList}
      </Button>
    );
  };

  const link = () => {
    return (
      <Button
        kind="button"
        value="bullet"
        type="neutral"
        aria-label="Link"
        onClick={format.bind(this, 'link')}
      >
        {activeStyles && activeStyles['link'] ? linkSelected : linkIcon}
      </Button>
    );
  };
  return (
    <div className="hcl-rte-wrapper">
      <div className="hcl-rte-toolbar">
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
      <div className="hcl-rte-editor-wrapper">
        <div
          ref={editorRef}
          tabIndex="0"
          dangerouslySetInnerHTML={{ __html: value }}
          className="hcl-rte-editor"
        />
        <Overlay
          targetElement={targetElement}
          attachElementToBody
          onToggle={status => {
            if (!status) {
              toggleVisitTooltip(false);
              toggleTooltip(status);
              setTargetElement(null);
            }
          }}
          showOverlay={showTootip}
        >
          <div className="hcl-rte-flex">
            {showVisitTootip ? (
              <>
                {visitLinktext}
                <a
                  className="hcl-rte-new"
                  href={
                    quillRef.current.getFormat().link
                      ? quillRef.current.getFormat().link
                      : textVal
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {quillRef.current.getFormat().link
                    ? quillRef.current.getFormat().link
                    : textVal}
                </a>
                <Button
                  type="primary"
                  aria-label="edit"
                  onClick={() => updateLink('edit')}
                >
                  {edit}
                </Button>
                <Button
                  type="neutral"
                  aria-label="close"
                  onClick={() => updateLink('remove')}
                >
                  {inlineClose}
                </Button>
              </>
            ) : (
              <>
                {linkText}
                <TextInput
                  type="text"
                  placeholder="name"
                  value={textVal}
                  id="textInput"
                  onChange={event => {
                    toggleVisitTooltip(false);
                    setTextVal(event.currentTarget.value);
                  }}
                />
                <Button
                  type="primary"
                  aria-label="add"
                  onClick={() => updateLink('add')}
                >
                  {checkmark}
                </Button>
                <Button
                  type="neutral"
                  aria-label="close"
                  onClick={() => updateLink('remove')}
                >
                  {inlineClose}
                </Button>
              </>
            )}
          </div>
        </Overlay>
      </div>
    </div>
  );
};

RichTextEditor.propTypes = {
  /** Icons for toolbar [bold, underline,italic,ordered list, unordered list, link]*/
  config: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf([
        'bold',
        'italic',
        'underline',
        'bulletlist',
        'numberlist',
        'link'
      ])
    })
  ),
  /** A callback function which will be executed on editor change. */
  onChange: PropTypes.func,
  /** content for text editor field.(Can pass string or html) */
  value: PropTypes.string,
  /** visit link text value */
  visitLinktext: PropTypes.string,
  /** url link text value */
  linkText: PropTypes.string
};

RichTextEditor.defaultProps = {
  config: [],
  onChange: () => {},
  value: '',
  visitLinktext: 'Visit URL :',
  linkText: 'URL :'
};

export default RichTextEditor;
