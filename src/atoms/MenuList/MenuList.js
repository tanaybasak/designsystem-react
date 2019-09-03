import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuList = ({ items, onClick: onClickGlobal }) => {
    return (
        <ul className={`${prefix}-overflow-list`}>
            {
                items.map((item, index) => {
                    const { onClick, danger, disabled, separator, link, name, ...rest } = item;
                    const itemClassNames = [`${prefix}-overflow-option`];

                    danger && itemClassNames.push(`${prefix}-overflow-optiondanger`);
                    disabled && itemClassNames.push(`${prefix}-overflow-disable`);
                    separator && itemClassNames.push(`${prefix}-overflow-separator`);

                    return (
                        <li
                            className={itemClassNames.join(' ')}
                            onClick={event => {
                                onClickGlobal(event);
                                if (onClick) onClick(event);
                            }}
                            data-name={name}
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
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func
};

MenuList.defaultProps = {
    items: [],
    onClick: () => { }
};

export default MenuList;
