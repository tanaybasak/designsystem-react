import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Dropdown = ({ type, items, id, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [typeState, setTypeState] = useState(type);

    useEffect(() => {
        positionDropDown()
    });

    const onSelect = (event) => {
        setIsOpen(false);
        setSelected(event.target.innerText);
    };

    const positionDropDown = () => {
        let getBound;
        if (document.getElementById(id).getElementsByTagName('ul')[0]) {
            getBound = document.getElementById(id).getElementsByTagName('ul')[0].getBoundingClientRect();
            // To open bottom dropdown at top
            if (window.innerHeight < getBound.bottom && type === 'bottom') {
                setTypeState('top')
            }
            // To open top dropdown at bottom
            if (getBound.top + window.pageYOffset < 0 && type === 'top') {
                setTypeState('down')
            }
        }
    }
    return (
        <section className={`${prefix}-dropdown ${typeState === "bottom" ? `${prefix}-dropdown-bottom` : `${prefix}-dropdown-top`}
             ${isOpen ? `${prefix}-dropdown-open` : ""}`} data-component="dropdown" id={id}
        >
            <button className={`${prefix}-btn ${prefix}-dropdown-toggle`}
                data-toggle="dropdown"
                onClick={() => { setIsOpen(true) }}
            >
                {selected ? selected : label}
            </button>
            {
                isOpen
                    ?
                    <ul className={`${prefix}-dropdown-container`} aria-labelledby="dropdownMenuButton">
                        {
                            items.map(item => {
                                return (<li className={`${prefix}-dropdown-item`} key={item.id} onClick={onSelect}>{item.text}</li>)
                            })
                        }
                    </ul>
                    : null}
        </section>
    );
};

Dropdown.propTypes = {
    type: PropTypes.string,
    items: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string
};

Dropdown.defaultProps = {
    type: "down",
    label: "Select Option"
};

export default Dropdown;
