import React from "react";
import PropTypes from "prop-types";
import { prefix } from '../../../settings';

function MenuList({ items = [] }) {
  return (
    <ul className={`${prefix}-menulist`}>
      {items.map((item) => {
        const { onClick = ()=>{}, danger, disabled, separator, link, name, ...rest} = item
        const itemClassNames = [`${prefix}-menulist-item`];

        danger && itemClassNames.push(`${prefix}-danger`);
        disabled && itemClassNames.push(`${prefix}-disabled`);
        separator && itemClassNames.push(`${prefix}-separator`);

        return <li className={itemClassNames.join(" ")} onClick={onClick} {...rest}>
            {link && <a href={link} title={name}>{name}</a>}
            {!link && name}
        </li>;

      })}
    </ul>
  );
}

MenuList.propTypes = {
  items : PropTypes.array.isRequired,
}

export default MenuList;
