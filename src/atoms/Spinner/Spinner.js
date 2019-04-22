import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';

export default function Spinner({ x, y, radius }) {

    return (
        <section className={`${prefix}-spinner`} title="loading">
            <svg className={`${prefix}-spinner-svg`}>
                <circle className={`${prefix}-spinner-svg-circle`} cx={x} cy={y} r={radius} />
            </svg>
        </section>
    );
};

Spinner.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired
};

Spinner.defaultProps = {
    x: 50,
    y: 50,
    radius: 40
};