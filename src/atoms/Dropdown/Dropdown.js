import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { trackDocumentClick, positionComponent } from '../../util/utility'


const Dropdown = ({ type, items, label, onChange, selectedIndex }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(selectedIndex + 1 ? items[selectedIndex] : null);
    const [typeState, setTypeState] = useState(type);
    const dropDown = useRef(null);

    useEffect(() => {
         setSelected(selectedIndex ? items[selectedIndex] : null);
         positionComponent(() => { setTypeState('top') }, () => { setTypeState('bottom') }, type, dropDown.current.getElementsByTagName('ul')[0]);
     });

    const onSelect = (event) => {
        event.stopPropagation();
        setIsOpen(false);
        const itemSelected = { id: event.target.id, text: event.target.innerText };
        setSelected(itemSelected);
        onChange(itemSelected);
    };

    return (
        <section className={`${prefix}-dropdown ${typeState === "bottom" ? `${prefix}-dropdown-bottom` : `${prefix}-dropdown-top`}
             ${isOpen ? `${prefix}-dropdown-open` : ""}`} ref={dropDown}
        >
            <button className={`${prefix}-btn ${prefix}-dropdown-toggle`}
                data-toggle="dropdown"
                onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(true);
                    trackDocumentClick(dropDown.current, () => {
                        setIsOpen(false);
                    });
                }}
            >
                {selected ? selected.text : label}
            </button>
            {
                isOpen
                    ?
                    <ul className={`${prefix}-dropdown-container`} aria-labelledby="dropdownMenuButton">
                        {
                            items.map(item => {
                                return (
                                    <li className={`${prefix}-dropdown-item`}
                                        key={item.id}
                                        onClick={onSelect}
                                        id={item.id}
                                    >{item.text}</li>)
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
    label: PropTypes.string,
    onChange: PropTypes.func,
    selectedIndex: PropTypes.number
};

Dropdown.defaultProps = {
    type: "down",
    label: "Select Option",
    onChange: () => { },
    selectedIndex: null
};

export default Dropdown;
