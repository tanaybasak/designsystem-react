import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Dropdown = ({ type, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const onSelect = (event) => {
        setIsOpen(false);
        setSelected(event.target.innerText);
    };
    return (
        <section className={`hcl-dropdown ${type === "down" ? "hcl-dropdown-bottom" : "hcl-dropdown-top"}
             ${isOpen ? "hcl-dropdown-open" : ""}`} data-component="dropdown"
        >
            <button className="hcl-btn hcl-dropdown-toggle"
                data-toggle="dropdown"
                onClick={() => { setIsOpen(true) }}
            >
                {selected ? selected : "Dropdown Bottom"}
            </button>
            {isOpen
                ?
                <ul className="hcl-dropdown-container" aria-labelledby="dropdownMenuButton">
                    {
                        items.map(item => {
                            return (<li className="hcl-dropdown-item" key={item.id} onClick={onSelect}>{item.text}</li>)
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
};

Dropdown.defaultProps = {
    type: "down"
};

export default Dropdown;
