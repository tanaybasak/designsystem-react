import React from 'react';
import PropTypes from 'prop-types';
import { Overflowmenu, MenuItem } from '../../molecules/Overflowmenu';

const QueryAction = ({ dispatch, item }) => {
  const onOverflowSelect = (item, type) => {
    switch (type) {
      case 'add': {
        dispatch({
          type: 'ADD_CHILDREN',
          data: {
            node: item,
            header: item.type.charAt(0).toUpperCase() + item.type.slice(1)
          }
        });
        break;
      }
      case 'remove': {
        dispatch({
          type: 'REMOVE_CHILDREN',
          data: item
        });
        break;
      }
      default:
        throw new Error('Unexpected action');
    }
  };
  return (
    <Overflowmenu
      attachElementToBody
      direction="bottom-left"
      ellipsisType="vertical"
      onClick={onOverflowSelect.bind(this, item)}
    >
      <MenuItem item={'add'}>Add</MenuItem>
      <MenuItem item={'remove'}>Remove</MenuItem>
      <MenuItem item={'wrap'}>Wrap</MenuItem>
      <MenuItem item={'cut'}>Cut</MenuItem>
      <MenuItem item={'copy'}>Copy</MenuItem>
      <MenuItem item={'paste'}>Paste</MenuItem>
    </Overflowmenu>
  );
};

QueryAction.propTypes = {};

QueryAction.defaultProps = {};

export default QueryAction;
