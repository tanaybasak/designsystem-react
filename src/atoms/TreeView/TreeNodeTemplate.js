import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const TreeNodeTemplate = ({ children, ...restProps }) => {
  return (
    <div className={`${prefix}-treenode-content-wrapper`} {...restProps}>
      {children}
    </div>
  );
};

TreeNodeTemplate.propTypes = {
  children: PropTypes.any
};

TreeNodeTemplate.defaultProps = {
  children: null
};

export default TreeNodeTemplate;
