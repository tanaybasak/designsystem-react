import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';
import MenuList from '../../atoms/MenuList';

const Overflowmenu = ({ direction = 'left', ...rest }) => {
  const [display, changeDisplay] = useState(false);

  const clickHandler = () => {
    changeDisplay(!display);
  };

  return (
    <section className={`${prefix}-overflow`}>
      <div className={`${prefix}-ellipsis`} onClick={clickHandler} />
      {display && (
        <div
          className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}
        >
          <MenuList items={rest.listItems} />
          <div className={`${prefix}-overflow-caret`} />
        </div>
      )}
    </section>
  );
};

Overflowmenu.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
  listItems: PropTypes.arrayOf([]).isRequired,
  onClick: PropTypes.func.isRequired
};

Overflowmenu.defaultProps = {
  direction : "left"
}



export default Overflowmenu;
