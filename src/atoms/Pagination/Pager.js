import React from 'react';
import prefix from '../../settings';

const Pager = (props, ref) => {
    if (props.options.length <= 0) {
        return null;
    }

    return (
        <>
            <select className={props.className}
                ref={ref}
                onChange={(e) => {

                    props.onChange(ref.current.value, e);
                }}
            >
                {

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

export default React.forwardRef(Pager);