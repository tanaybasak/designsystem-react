import React, { useState } from "react";
import PropTypes from "prop-types";
import { prefix } from "../../../settings";
import MenuList from "../../atoms/MenuList";


const Overflowmenu = ({ direction = "left", ...rest }) => {
  const [display, changeDisplay] = useState(false);

  const clickHandler = e => {
    changeDisplay(!display);
  };

  return (
    <section className="hcl-overflow-container">
      <div className={`${prefix}-ellipsis`} onClick={clickHandler} />
      {display && <div
        className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}
      ><MenuList items={rest.listItems} />
        <div className={direction === 'left' ? `${prefix}-overflow-caret` : `${prefix}-overflow-caret-right`} />
      </div>}
    </section>
  );
};

Overflowmenu.defaultProps = {
  direction: 'left',
  listItems: null,
  onClick: () => { }
};

Overflowmenu.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
  listItems: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Overflowmenu;