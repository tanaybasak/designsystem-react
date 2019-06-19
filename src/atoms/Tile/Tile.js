import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Tile = () => {
    // const [value, setValue] = useState(restProps.value || "");
    // const classnames = `${prefix}-form-control ${className}`.trim();

    return (
        <React.Fragment>
            {/* <!-- default tile --> */}
            <div className="hcl-tile ">
                <p>This is read only tile</p>
            </div>
            {/* <!-- clickable  tile --> */}
            <div className="hcl-tile-clickable" tabIndex="0">
                <a>
                    <p>This is clickable tile</p>
                </a>
            </div>
            {/* <!-- selectable tile --> */}
            <div>
                <label htmlFor="tile-id" className="hcl-tile-selectable" tabIndex="0">
                    <input id="tile-id" className="hcl-tile-input" type="checkbox" title="tile" />
                    <svg className="hcl-tile-checkbox" width="16" height="16" viewBox="0 0 16 16">
                        <path
                            d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
                            fillRule="evenodd"
                        />
                    </svg>
                    <p>Click to select tile</p>
                </label>
            </div>
            {/* <!-- expandable tile --> */}
            <div className="hcl-tile-expandable" tabIndex="0">
                <input id="tile-id-expand" className="hcl-tile-input" type="checkbox" title="tile" />
                <label htmlFor="tile-id-expand" className="hcl-tile-arrow">
                    <svg width="12" height="7" viewBox="0 0 12 7">
                        <path fillRule="nonzero" d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" />
                    </svg>
                </label>
                <p className="hcl-tile-content">Content shown prior expand </p>
                <p className="hcl-tile-hide">Content shown after expand </p>
            </div>
        </React.Fragment >
    );
}

Tile.propTypes = {

};

Tile.defaultProps = {

};

export default Tile;