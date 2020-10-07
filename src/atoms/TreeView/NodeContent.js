import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
const NodeContent = ({ content }) => {
  return (
    <div
      className={`${prefix}-tree-content-node`}
      style={{ flexBasis: 'calc(100% - 50px)' }}
      title={content}
    >
      <div className="tree-content-text">{content}</div>
    </div>
  );
};

NodeContent.propTypes = {
  content: PropTypes.any
};

NodeContent.defaultProps = {
  content: null
};

export default NodeContent;
