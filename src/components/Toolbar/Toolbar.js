import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Toolbar.scss';

const Toolbar = props => {
    const toolbarClass = classNames('patron-toolbar', props.className)
    return (
        <div id={props.id} className={toolbarClass} style={props.style}>
            {props.children}
        </div>
    );
}


Toolbar.defaultProps = {
    id: null,
    style: null,
    className: null
};

Toolbar.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string
};

export default Toolbar;