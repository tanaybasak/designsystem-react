import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuList from '../../atoms/MenuList';
import prefix from '../../settings';

const Overflowmenu = ({ direction, ellipsisType, onClick, ...restProps }) => {
    const [display, changeDisplay] = useState(false);

    const clickHandler = event => {
        changeDisplay(!display);
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <section className="hcl-overflow-container">
            <div className={`${prefix}-ellipsis${ellipsisType === 'horizontal' ? ' horizontal-ellipsis' : ''}`} onClick={clickHandler} />
            {
                display &&
                <div className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}>
                    <MenuList
                        items={restProps.listItems}
                        onClick={event => {
                            changeDisplay(false);
                            onClick(event);
                        }}
                    />
                    <div className={`${prefix}-overflow-caret${direction === 'left' ? '' : '-right'}`} />
                </div>
            }
        </section>
    );
};

Overflowmenu.defaultProps = {
    direction: 'left',
    listItems: null,
    ellipsisType: 'vertical',
    onClick: () => { }
};

Overflowmenu.propTypes = {
    direction: PropTypes.oneOf(['left', 'right']),
    listItems: PropTypes.array.isRequired,
    ellipsisType: PropTypes.oneOf(['vertical', 'horizontal']),
    onClick: PropTypes.func.isRequired
};

export default Overflowmenu;
