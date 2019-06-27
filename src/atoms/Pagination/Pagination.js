import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Pagination(props) {
    //{ totalItems, pageSizes, pageSize, page, onChange }
    const [totalItems] = useState(props.totalItems);
    const [pageSizes] = useState(props.pageSizes);
    const [pageSize, setPageSize] = useState(props.pageSize);
    let [pageNumber, setPageNumber] = useState(1);


    let [pageArray, setPageArray] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [rangeStart, setRangeStart] = useState(1);
    const [rangeEnd, setRangeEnd] = useState(10);

    let itemsPerPageDropDownRef = useRef(null);
    let pageNumberDropDownRef = useRef(null);
    let nextButtonRef = useRef(null);
    let previousButtonRef = useRef(null);
    let pageEndDisplayRef = useRef(null);
    let pageStartDisplayRef = useRef(null);
    let rangeStartDisplayRef = useRef(null);
    let rangeEndDisplayRef = useRef(null);

    useEffect(
        () => {
            if (totalItems > 0 && pageSizes.length > 0 && pageArray.length === 0) {
                onLoad();
            }
            adjustRange();
        },
        [totalItems, pageSize, pageArray, pageNumber]
    )

    const adjustRange = () => {
        let rangeStart = rangeStartDisplayRef.current,
            rangeEnd = rangeEndDisplayRef.current;
        if (rangeStart && rangeEnd) {
            rangeStart.innerHTML = ((pageNumber - 1) * pageSize) + 1;
            if ((pageNumber * pageSize) > totalItems) {
                rangeEnd.innerHTML = totalItems;
            } else {
                rangeEnd.innerHTML = (pageNumber * pageSize);
            }
        }
    }

    const onLoad = async () => {
        await setNoofPagesArray();
        await toggleNavigationButtons(pageNumberDropDownRef.current.selectedIndex, pageNumberDropDownRef.current.options.length);
        adjustRange();
    }

    const setNoofPagesArray = () => {
        let pages = 0,
            pageArray = [];
        pages = getPages();
        if (pages && pages > 0) {
            pageArray = Array.from({ length: pages }, (v, k) => k + 1);
            setPageArray(pageArray);
            setPageCount(pageArray.length);
        }
    }

    const onPageNumberDropDownChange = (value, e) => {
        pageStartDisplayRef.current.innerHTML = e.target.options[e.target.selectedIndex].value;
        setPageNumber(Number(e.target.options[e.target.selectedIndex].value));
        toggleNavigationButtons(e.target.selectedIndex, e.target.options.length);
        props.onChange(e);
    }

    const onPageItemsDropDownChange = async (value, e) => {
        await setPageSize(Number(e.target.options[e.target.selectedIndex].value));
        await adjustRange();
        setNoofPagesArray();
        props.onChange(e);
    }

    const getPages = () => {
        let pageItemsSelected = itemsPerPageDropDownRef.current;

        if (pageItemsSelected && totalItems) {
            return (Math.ceil(totalItems / pageItemsSelected.options[pageItemsSelected.selectedIndex].value));
        }
    }

    const onPreviousChange = (e) => {
        e.preventDefault();
        let previousButton = previousButtonRef;

        if (previousButton && !previousButton.disabled && pageNumber > 1) {
            let pageNumberDropdown = pageNumberDropDownRef.current;
            pageNumberDropdown.selectedIndex--;
            pageNumber--;
            setPageNumber(pageNumber);
            toggleNavigationButtons(pageNumberDropdown.selectedIndex, pageNumberDropdown.options.length);
            adjustRange();
            //this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.PREVIOUS });
        }
    }

    const onNextChange = (e) => {
        e.preventDefault();
        let nextButton = nextButtonRef.current,
            totalPages = getPages();

        if (nextButton && !nextButton.disabled && totalPages !== pageNumber) {
            pageNumberDropDownRef.current.selectedIndex++;
            pageNumber++;
            setPageNumber(pageNumber);
            toggleNavigationButtons(pageNumberDropDownRef.current.selectedIndex, pageNumberDropDownRef.current.options.length);
            adjustRange();
            //this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.NEXT });
        }
    }

    const toggleNavigationButtons = (selectedIndex, optionsLength) => {
        let nextButton = nextButtonRef.current,
            previousButton = previousButtonRef.current,
            nextIndex = selectedIndex;
        nextIndex++;

        if (selectedIndex === 0) { //First Index
            previousButton.disabled = true;
            nextButton.disabled = false;
        } else if (nextIndex === optionsLength) { //Last Index
            nextButton.disabled = true;
            previousButton.disabled = false;
        } else { // Enable Navigation Buttons
            nextButton.disabled = false;
            previousButton.disabled = false;
        }
        let pageNumberDropDown = pageNumberDropDownRef.current;
        if (pageNumberDropDown.selectedIndex != -1) {
            pageStartDisplayRef.current.innerHTML = pageNumberDropDown.options[pageNumberDropDown.selectedIndex].value;
        }
    }


    return (
        <>
            <div className={`${prefix}-pagination`}>
                <div className={`${prefix}-pagination-left`}>
                    <label
                        id={`${prefix}-pagination-select-7`}
                        className={`${prefix}-pagination-text`}
                        htmlFor={`${prefix}-pagination-select-7`}
                    >
                        {props.itemsPerPageText}
                    </label>
                    <div className={`${prefix}-pagination-select-wrapper`}>
                        <select
                            className={`${prefix}-pagination-select ${prefix}-page-items`}
                            ref={itemsPerPageDropDownRef}
                            value={pageSize}
                            onChange={(e) => {
                                onPageItemsDropDownChange(itemsPerPageDropDownRef.current.value, e);
                            }}
                        >
                            {pageSizes.map((item, idx) => {
                                return (
                                    <option key={idx} value={item}>{item}</option>
                                );
                            })}
                        </select>
                        <svg className={`${prefix}-select-arrow`} width="10" height="5" viewBox="0 0 10 5">
                            <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
                        </svg>
                    </div>
                    <span className={`${prefix}-pagination-text`}>
                        <span className={`${prefix}-pagination-range`}>
                            <span className={`${prefix}-range-start`} ref={rangeStartDisplayRef} />&nbsp;
                            <span className={`${prefix}-range-separator`}>-</span>&nbsp;
                            <span className={`${prefix}-range-end`} ref={rangeEndDisplayRef}>{pageSize}</span>
                        </span>&nbsp;of&nbsp;
                        <span className={`${prefix}-pagination-totalitems`}>
                            {totalItems}
                        </span>&nbsp;items
                    </span>
                </div>
                <div className={`${prefix}-pagination-right`}>
                    <span className={`${prefix}-pagination-text`}>
                        <span className={`${prefix}-page-start`} ref={pageStartDisplayRef}>
                            1
                        </span>&nbsp;of&nbsp;
                        <span className={`${prefix}-page-end`} ref={pageEndDisplayRef} />{pageCount}&nbsp;pages
                    </span>
                    <button className={`${prefix}-pagination-button-previous`}
                        aria-label={`Previous page`}
                        ref={previousButtonRef}
                        onClick={onPreviousChange}
                    >
                        <svg className={`bx--pagination__button-icon`} width="7" height="12" viewBox="0 0 7 12">
                            <path fillRule="nonzero" d="M1.45 6.002L7 11.27l-.685.726L0 6.003 6.315 0 7 .726z" />
                        </svg>
                    </button>
                    <div className={`${prefix}-pagination-select-wrapper`}>
                        <select className={`${prefix}-pagination-select ${prefix}-page-number`}
                            ref={pageNumberDropDownRef}
                            onChange={(e) => {
                                onPageNumberDropDownChange(pageNumberDropDownRef.current.value, e);
                            }}
                        >
                            {
                                pageArray.map((item, idx) => {
                                    return (
                                        <option key={idx} value={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        <svg className={`${prefix}-select-arrow`} width="10" height="5" viewBox="0 0 10 5">
                            <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
                        </svg>
                    </div>
                    <button className={`${prefix}-pagination-button-next`}
                        aria-label="Next page"
                        ref={nextButtonRef}
                        onClick={onNextChange}
                    >
                        <svg className={`bx--pagination__button-icon`} width="7" height="12" viewBox="0 0 7 12">
                            <path fillRule="nonzero"
                                d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    pageSizes: PropTypes.array.isRequired,
    pageSize: PropTypes.number,
    page: PropTypes.number,
    itemsPerPageText: PropTypes.string,
    onChange: PropTypes.func
};

Pagination.defaultProps = {
    totalItems: 0,
    pageSizes: [],
    pageSize: 10,
    page: 1,
    itemsPerPageText: 'Items per page:',
    onChange: () => { }
};

export default Pagination;