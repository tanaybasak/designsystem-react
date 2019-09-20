import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import prefix from '../../settings';

const Pagination = ({ totalItems, itemsPerPageStepper, itemsStepperLimit, itemsPerPageText, onPageChange, onItemsPerPageChange }) => {
    //states
    const [nItems, setNItems] = useState(totalItems);//totalItems State
    const [stepper, setItemsPerPageStepper] = useState(itemsPerPageStepper);//itemsPerPageStepper State
    const [stepperLimit, setStepperLimit] = useState(itemsStepperLimit);//itemsStepperLimit State
    const [perPageText, setItemsPerPageText] = useState(itemsPerPageText);

    const [itemsPerPageDropDown, setItemsPerPageDropDown] = useState([]);
    const [itemsPerPageSelected, setItemsPerPageSelected] = useState(-1);
    const [totalPages, setTotalPages] = useState(0);
    const [pagesDropDown, setPageItems] = useState([]);
    const [pagesSelected, setPagesSelected] = useState(-1);


    //refs
    const nextbtnRef = useRef();
    const previousbtnRef = useRef();
    const pageItemsSelectedRef = useRef();
    const pagesRef = useRef();
    const startpagedisplayRef = useRef();
    const totalpagesdisplayRef = useRef();
    const rangeStartRef = useRef();
    const rangeEndRef = useRef();

    // props change - totalItems
    useEffect(() => {
        if (nItems != totalItems) {
            setNItems(totalItems);
        }
    }, [totalItems]);

    //props change - itemsPerPageStepper
    useEffect(() => {
        if (stepper != itemsPerPageStepper) {
            setItemsPerPageStepper(itemsPerPageStepper);
        }
    }, [itemsPerPageStepper]);

    //props change - itemsStepperLimit
    useEffect(() => {
        if (stepperLimit != itemsStepperLimit) {
            setStepperLimit(itemsStepperLimit);
        }
    }, [itemsStepperLimit]);

    //props change - itemsPerPageText
    useEffect(() => {
        if (itemsPerPageText !== perPageText) {
            setItemsPerPageText(itemsPerPageText);
        }
    }, [itemsPerPageText]);

    //stepper, stepperLimit change useEffect
    useEffect(() => {
        createItemsPerPageValues();
    }, [stepper, stepperLimit]);

    //itemsPerPageDropDown creation effect
    useEffect(() => {
        if (JSON.stringify(itemsPerPageDropDown) !== JSON.stringify([])) {
            if (itemsPerPageDropDown && itemsPerPageDropDown.length > 0) {
                setItemsPerPageSelected(itemsPerPageDropDown[0]);
            }
        }
    }, [itemsPerPageDropDown]);

    //itemsPerPageDropDown selected, nItems change effect
    useEffect(() => {
        if (itemsPerPageSelected != -1) {
            resetRange();
            calculatePages();
        }
    }, [itemsPerPageSelected, nItems]);

    //total pages useEffect
    useEffect(() => {
        //if (totalPages != 0) {
        setPageItems(Array.from({ length: totalPages }, (v, k) => k + 1));
        //}
    }, [totalPages]);

    // pages Dropdown creation useEffect
    useEffect(() => {
        if (JSON.stringify(pagesDropDown) !== JSON.stringify([]) && pagesDropDown.length > 0) {
            setPagesSelected(pagesDropDown[0]);
        }
    }, [pagesDropDown]);

    // pages DropDown selected useEffect
    useEffect(() => {
        if (pagesSelected != -1) {
            toggleNavButtons();
            adjustRange();
            togglePageDisplay();
        }
    }, [pagesSelected]);

    //on Load useEffect
    useEffect(() => {
        createItemsPerPageValues();
    }, []);

    const togglePageDisplay = () => {
        if (startpagedisplayRef.current) {
            startpagedisplayRef.current.innerHTML = pagesSelected;
        }
    }

    const createItemsPerPageValues = () => {
        let stepperArray = [stepper];
        for (let i = 1; i <= stepperLimit; i++) {
            if (stepperArray[i - 1] * 2 > stepperLimit) {
                break;
            }
            stepperArray.push(stepperArray[i - 1] * 2);
        }
        setItemsPerPageDropDown(stepperArray);
    }

    const resetRange = () => {
        rangeStartRef.current.innerHTML = 1;
        rangeEndRef.current.innerHTML = itemsPerPageSelected;
    }

    const calculatePages = () => {
        if (pageItemsSelectedRef.current && nItems) {
            let pages = Math.ceil(Number(nItems) / Number(itemsPerPageSelected));
            if (pages > 0) {
                setTotalPages(pages);
            }
        }
    }

    const adjustRange = () => {
        if (pageItemsSelectedRef.current && pagesRef.current) {
            let pageSize = itemsPerPageSelected,
                pageDropDown = pagesSelected;

            let rangeStart = rangeStartRef.current,
                rangeEnd = rangeEndRef.current;
            if (rangeStart && rangeEnd) {
                rangeStart.innerHTML = ((pageDropDown - 1) * pageSize) + 1;
                if ((pageDropDown * pageSize) > totalItems) {
                    rangeEnd.innerHTML = totalItems;
                } else {
                    rangeEnd.innerHTML = (pageDropDown * pageSize);
                }
            }
        }
    }

    const toggleNavButtons = () => {
        if (pagesRef.current) {
            let nextIndex = pagesRef.current.selectedIndex;
            nextIndex++;
            if (totalItems === 0 || pagesRef.current.options.length === 1) { // One Option
                previousbtnRef.current.disabled = true;
                nextbtnRef.current.disabled = true;
            } else if (pagesRef.current.selectedIndex === 0) { //First Index
                previousbtnRef.current.disabled = true;
                nextbtnRef.current.disabled = false;
            } else if (nextIndex === pagesRef.current.options.length) { //Last Index
                nextbtnRef.current.disabled = true;
                previousbtnRef.current.disabled = false;
            } else { // Enable Navigation Buttons
                nextbtnRef.current.disabled = false;
                previousbtnRef.current.disabled = false;
            }
        }
    }

    const _onItemsChange = () => {
        if (pageItemsSelectedRef.current) {
            setItemsPerPageSelected(pageItemsSelectedRef.current.options[pageItemsSelectedRef.current.selectedIndex].value);
            if (onItemsPerPageChange) {
                onItemsPerPageChange(pageItemsSelectedRef.current.options[pageItemsSelectedRef.current.selectedIndex].value);
            }
        }
    }

    const _onPreviousClick = (e) => {
        e.preventDefault();
        if (pagesRef.current) {
            let pageDropDown = pagesRef.current.options[pagesRef.current.selectedIndex];
            if (previousbtnRef.current && !previousbtnRef.current.disabled && pageDropDown.value > 1) {
                pagesRef.current.selectedIndex--;
                setPagesSelected(pagesRef.current.options[pagesRef.current.selectedIndex].value);
                if (onPageChange) {
                    onPageChange(pagesRef.current.options[pagesRef.current.selectedIndex].value);
                }
            }
        }
    }

    const _onNextClick = (e) => {
        e.preventDefault();
        if (pagesRef.current) {
            let pageDropDown = pagesRef.current.options[pagesRef.current.selectedIndex];
            if (nextbtnRef.current && !nextbtnRef.current.disabled && nItems != pageDropDown.value) {
                pagesRef.current.selectedIndex++;
                setPagesSelected(pagesRef.current.options[pagesRef.current.selectedIndex].value);
                if (onPageChange) {
                    onPageChange(pagesRef.current.options[pagesRef.current.selectedIndex].value);
                }
            }
        }
    }

    const _onPagesChange = () => {
        toggleNavButtons();
        setPagesSelected(pagesRef.current.options[pagesRef.current.selectedIndex].value);
        if (startpagedisplayRef.current) {
            startpagedisplayRef.current.innerHTML = pagesRef.current.options[pagesRef.current.selectedIndex].value;
            if (onPageChange) {
                onPageChange(pagesRef.current.options[pagesRef.current.selectedIndex].value);
            }
        }
    }

    return (
        <div className={`${prefix}-pagination`}>
            <div className={`${prefix}-pagination-left`}>
                <div className={`${prefix}-pagination-text`}>
                    {perPageText}
                </div>
                <div className={`${prefix}-pagination-select-wrapper`}>
                    <Pager ref={pageItemsSelectedRef} value={itemsPerPageSelected} onChange={_onItemsChange} options={itemsPerPageDropDown} className={`${prefix}-pagination-select ${prefix}-page-items`} />
                </div>
                <span className={`${prefix}-pagination-text`}>
                    <span className={`${prefix}-pagination-range`}>
                        <span className={`${prefix}-range-start`} ref={rangeStartRef} />
                        <span className={`${prefix}-range-separator`}>-</span>
                        <span className={`${prefix}-range-end`} ref={rangeEndRef} />
                    </span>of
                    <span className={`${prefix}-pagination-totalitems`}>
                        {nItems}
                    </span>items
                </span>
            </div>
            <div className={`${prefix}-pagination-right`}>
                <span className={`${prefix}-pagination-text`}>
                    <span className={`${prefix}-page-start`} ref={startpagedisplayRef} />of
                    <span className={`${prefix}-page-end`} ref={totalpagesdisplayRef}>{totalPages}</span>pages
                </span>
                <button className={`${prefix}-pagination-button-previous`}
                    aria-label={`Previous page`}
                    ref={previousbtnRef}
                    onClick={(e) => { _onPreviousClick(e); }}
                >
                    <svg className={`${prefix}-pagination-button-icon`} width="7" height="12" viewBox="0 0 7 12">
                        <path fillRule="nonzero" d="M1.45 6.002L7 11.27l-.685.726L0 6.003 6.315 0 7 .726z" />
                    </svg>
                </button>
                <div className={`${prefix}-pagination-select-wrapper`}>
                    <Pager ref={pagesRef} value={pagesSelected} onChange={_onPagesChange} options={pagesDropDown} className={`${prefix}-pagination-select ${prefix}-page-number`} />
                </div>
                <button className={`${prefix}-pagination-button-next`}
                    aria-label="Next page"
                    ref={nextbtnRef}
                    onClick={(e) => { _onNextClick(e); }}
                >
                    <svg className={`${prefix}-pagination-button-icon`} width="7" height="12" viewBox="0 0 7 12">
                        <path fillRule="nonzero"
                            d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"
                        />
                    </svg>
                </button>
            </div>
        </div >
    )
}

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPageStepper: PropTypes.number.isRequired,
    itemsStepperLimit: PropTypes.number,
    itemsPerPageText: PropTypes.string,
    onItemsPerPageChange: PropTypes.func,
    onPageChange: PropTypes.func
};

Pagination.defaultProps = {
    totalItems: 0,
    itemsPerPageStepper: 20,
    itemsStepperLimit: 100,
    itemsPerPageText: 'Items per Page:',
    onItemsPerPageChange: () => { },
    onPageChange: () => { }
};

export default Pagination;