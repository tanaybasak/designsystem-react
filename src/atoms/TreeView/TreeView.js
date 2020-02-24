import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeNode from './TreeNode';

const TreeView = ({
  treeData,
  expandedIcon,
  onChange,
  collapsedIcon,
  className,
  config,
  onToggle,
  type
}) => {
  let [selectedNode, updateSelectedNode] = useState({});

  const onSelectNode = event => {
    updateSelectedNode(event);
    onChange(event);
  };

  const onToggleNode = event => {
    onToggle(event);
  };

  let defaultConfig = {
    displayChildren: 'displayChildren',
    expandIcon: 'expandIcon',
    collapsedIcon: 'collapsedIcon',
    icon: 'icon',
    children: 'children',
    name: 'name',
    hasChildren: 'hasChildren'
  };

  const configuration = { ...defaultConfig, ...config };
  const classnames = `${prefix}-tree ${className.trim()}`;
  return (
    <ul role="tree" className={classnames}>
      {treeData.map((node, index) => {
        return (
          <TreeNode
            node={node}
            key={`index-${index}`}
            expandedIcon={expandedIcon}
            collapsedIcon={collapsedIcon}
            onSelectNode={type === 'single' ? onSelectNode : null}
            selectedNode={type === 'single' ? selectedNode : null}
            onToggleNode={onToggle ? onToggleNode : null}
            configuration={configuration}
          />
        );
      })}
    </ul>
  );
};

TreeView.propTypes = {
  /** Tree Data */
  treeData: PropTypes.any,
  /** To Specify Expand Icon */
  expandedIcon: PropTypes.string,
  /** To Specify Collapsed Icon */
  collapsedIcon: PropTypes.string,
  /** Style class of the component */
  className: PropTypes.string,
  /** Callback function on selecting tree node */
  onChange: PropTypes.func,
  /** Callback function on expanding/collapsing tree node */
  onToggle: PropTypes.func,
  /** Configuration Object for updating propery name in tree data
 {
  displayChildren: 'displayChildren',
  expandIcon: 'expandIcon',
  collapsedIcon: 'collapsedIcon',
  icon: 'icon',
  children: 'children',
  name: 'name',
  hasChildren: 'hasChildren'
}
*/
  config: PropTypes.any,
  /** Type of Treeview
   * default : Component without any node selection
   * single : Component with node selection
   */
  type: PropTypes.oneOf(['default', 'single'])
};

TreeView.defaultProps = {
  treeData: [],
  onChange: null,
  onToggle: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  className: '',
  type: 'default',
  config: {}
};

export default TreeView;
