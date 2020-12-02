import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TextInput from '../TextInput';
import { checkmark, Close } from '../../util/icons';
//import Overlay from '../Overlay';
const InlineEdit = ({
  onClose,
  onTextUpdate,
  // formStatus,
  // errorMessage,
  ...restProps
}) => {
  const textEditorRef = useRef(null);
  //const [width, setOverlayWidth] = useState('');
  const stopPropagation = e => {
    e.stopPropagation();
  };

  const updateTreenodeNameOnEnter = event => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      onTextUpdate(event.currentTarget.value);
      event.preventDefault();
    } else if (event.key === 'Escape') {
      onClose();
      event.preventDefault();
    }
  };

  const updateTextNodeOnBlur = event => {
    onTextUpdate(event.currentTarget.value);
  };

  useEffect(() => {
    textEditorRef.current.firstElementChild.focus();
    textEditorRef.current.firstElementChild.select();
    // setOverlayWidth(textEditorRef.current.firstElementChild.offsetWidth);
    return function cleanup() {};
  }, []);

  //const [showOverlay, setOverlay] = useState(false);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          className={`${prefix}-form-group`}
          style={{ marginBottom: ' 0rem' }}
          ref={textEditorRef}
        >
          <TextInput
            type="text"
            {...restProps}
            onBlur={updateTextNodeOnBlur}
            onKeyDown={updateTreenodeNameOnEnter}
            //data-invalid={formStatus}
            onClick={stopPropagation}
          />
        </div>
        <div
          className="hcl-inline-icon"
          style={{
            border: '1px solid black',
            position: 'absolute',
            right: '0'
          }}
        >
          <button className="hcl-icon">{Close}</button>
          <button className="hcl-icon white">{checkmark}</button>
        </div>
      </div>
    </>
  );
};

InlineEdit.propTypes = {
  onClose: PropTypes.func,
  onTextUpdate: PropTypes.func
  //formStatus: PropTypes.bool,
  // errorMessage: PropTypes.any
};

InlineEdit.defaultProps = {
  onClose: () => {},
  onTextUpdate: () => {}
  //formStatus: false,
  //errorMessage: null
};

export default InlineEdit;
