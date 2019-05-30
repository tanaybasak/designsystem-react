import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuList = ({ items = [] }) => {
    return (
        <ul className={`${prefix}-overflow-list`}>
            {
                items.map((item, index) => {
                    const { onClick = () => { }, danger, disabled, separator, link, name, ...rest } = item;
                    const itemClassNames = [`${prefix}-overflow-option`];

                    danger && itemClassNames.push(`${prefix}-overflow-optiondanger`);
                    disabled && itemClassNames.push(`${prefix}-overflow-disable`);
                    separator && itemClassNames.push(`${prefix}-overflow-separator`);

                    return (
                        <li
                            className={itemClassNames.join(' ')}
                            onClick={onClick}
                            {...rest}
                            key={`menulist-${name}-${index}`}
                        >
                            {
                                link ?
                                    <a href={link} title={name}>
                                        {name}
                                    </a>
                                    : name
                            }
                        </li>
                    );
                })
            }
        </ul>
    );
};

MenuList.propTypes = {
    items: PropTypes.array.isRequired
};

export default MenuList;
