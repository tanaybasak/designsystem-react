import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Dropdown = ({ type, items, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [typeState, setTypeState] = useState(type);

    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        checkPosition()
    });

    const onSelect = (event) => {
        setIsOpen(false);
        setSelected(event.target.innerText);
    };

    const checkPosition = () => {
        let getBound;
        if (document.getElementById(id).getElementsByTagName('ul')[0]) {
            getBound = document.getElementById(id).getElementsByTagName('ul')[0].getBoundingClientRect();
        }

        // To open bottom dropdown at top
        if (window.innerHeight < getBound.bottom) {
            setTypeState('top')
        }

        // To open top dropdown at bottom
        if (getBound.top < 0) {
            setTypeState('down')
        }

        // console.log('window height', window.innerHeight);

        // console.log('container', getBound);

        // For Down Dropdown
        // 1) no space below & can be accomadate at top

        // For Top Dropdown
        // 1)no space top can & be accomadate at below

        // document.getElementById(id).getElementsByTagName('ul')[0].getBoundingClientRect()
    }
    return (
        <section className={`hcl-dropdown ${typeState === "down" ? "hcl-dropdown-bottom" : "hcl-dropdown-top"}
             ${isOpen ? "hcl-dropdown-open" : ""}`} data-component="dropdown" id={id}
        >
            <button className="hcl-btn hcl-dropdown-toggle"
                data-toggle="dropdown"
                onClick={() => { setIsOpen(true) }}
            >
                {selected ? selected : "Dropdown Bottom"}
            </button>
            {
                // isOpen
                true
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
    id: PropTypes.string.isRequired
};

Dropdown.defaultProps = {
    type: "down"
};

export default Dropdown;
