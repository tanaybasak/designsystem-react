import React, { useState } from "react";
import { prefix } from "../../../settings";
import MenuList from "../../atoms/MenuList";
import PropTypes from "prop-types";

const Overflowmenu = ({ direction = "left" , ...rest}) => {
  const [display, changeDisplay] = useState(false);

  const clickHandler = e => {
    changeDisplay(!display);
  };

  return (
    <section className={`${prefix}-overflow`}>
      <div className={`${prefix}-ellipsis`} onClick={clickHandler} />
      {display && <div
          className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}
        ><MenuList items={rest.listItems}/>
         <div class={`${prefix}-overflow-caret`} />
         </div>}
    </section>
  );
};

Overflowmenu.propTypes = {
  direction: PropTypes.oneOf([ 'left' , 'right' ]),
  listItems : PropTypes.array.isRequired,
  onClick : PropTypes.func.isRequired
};

export default Overflowmenu;
