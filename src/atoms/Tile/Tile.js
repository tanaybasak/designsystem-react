import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Tile = ({ type, children }) => {
    return (
        <React.Fragment>
            {type === 'readable' && children
                ?
                <div className={`${prefix}-tile`}>
                    {children}
                </div>
                : type === 'clickable' && children
                    ?
                    <div className={`${prefix}-tile-clickable`} tabIndex="0">
                        <a>
                            {children}
                        </a>
                    </div>
                    : type === 'selectable' && children
                        ?
                        <label htmlFor="tile-id" className={`${prefix}-tile-selectable`} tabIndex="0">
                            <input id="tile-id" className={`${prefix}-tile-input`} type="checkbox" title="tile" />
                            <svg className={`${prefix}-tile-checkbox`} width="16" height="16" viewBox="0 0 16 16">
                                <path
                                    d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
                                    fillRule="evenodd"
                                />
                            </svg>
                            {children}
                        </label>
                        : type === 'expandable' && children
                            ?
                            <div className={`${prefix}-tile-expandable`} tabIndex="0">
                                <input id="tile-id-expand" className={`${prefix}-tile-input`} type="checkbox" title="tile" />
                                <label htmlFor="tile-id-expand" className={`${prefix}-tile-arrow"`}>
                                    <svg width="12" height="7" viewBox="0 0 12 7">
                                        <path fillRule="nonzero" d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" />
                                    </svg>
                                </label>
                                <div className={`${prefix}-tile-content`}>
                                    {children[0]}
                                </div>
                                <div className={`${prefix}-tile-hide`}>
                                    {children[1]}
                                </div>
                            </div>
                            : null
            }
        </React.Fragment >
    );
}

Tile.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node.isRequired
};

Tile.defaultProps = {
    type: 'readable'
};

export default Tile;