import React from 'react';
//import PropTypes from 'prop-types';
import prefix from '../../settings';

const Pager = (props, ref) => {
    // eslint-disable-next-line react/prop-types
    if (props.options.length <= 0) {
        return null;
    }

    return (
        <>
            {/* eslint-disable-next-line react/prop-types */}
            <select className={props.className}
                ref={ref}
                onChange={(e) => {
                    // eslint-disable-next-line react/prop-types
                    props.onChange(ref.current.value, e);
                }}
            >
                {
                    // eslint-disable-next-line react/prop-types
                    props.options.map((item, idx) => {
                        return (
                            <option key={idx} value={item}>{item}</option>
                        )
                    })
                }
            </select>
            <svg className={`${prefix}-select-arrow`} width="10" height="5" viewBox="0 0 10 5">
                <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
            </svg>
        </>
    )
};

// Pager.protoTypes = {
//     options: PropTypes.arrayOf(PropTypes.number),
//     className: PropTypes.string,
//     onChange: PropTypes.func
// }

// Pager.defaultProps = {
//     options: [],
//     className: '',
//     onChange: () => { }
// }

export default React.forwardRef(Pager);