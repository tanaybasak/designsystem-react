import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import prefix from '../../settings';

const Pagination = ({ totalItems, pageSizes, itemsPerPageText }) => {
    //states
    const [items, setItems] = useState(pageSizes[0]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageItems, setPageItems] = useState([]);

    //ref
    const pageItemsSelectedRef = useRef();
    const rangeStartRef = useRef();
    const rangeEndRef = useRef();
    const pagesRef = useRef(null);
    const nextbtnRef = useRef();
    const previousbtnRef = useRef();
    const startpagedisplayRef = useRef();
    const totalpagesdisplayRef = useRef();

    //useEffect PagesItems
    useEffect(
        () => {
            rangeStartRef.current.innerHTML = 1;
            rangeEndRef.current.innerHTML = items;
            calculatePages();
        },
        [items, pageItemsSelectedRef.current]
    )

    // useEffect pages
    useEffect(
        () => {
            if (pagesRef.current && pagesRef.current.selectedIndex != -1) {
                pagesRef.current.selectedIndex = 0;
                startpagedisplayRef.current.innerHTML = pagesRef.current.options[pagesRef.current.selectedIndex].value;
                toggleNavButtons();
            }
        },
        [pageItems, pagesRef.current]
    )

    const calculatePages = () => {
        if (pageItemsSelectedRef.current && totalItems) {
            let pages = Math.ceil(Number(totalItems) / Number(pageItemsSelectedRef.current.options[pageItemsSelectedRef.current.selectedIndex].value));
            if (pages > 0) {
                setTotalPages(
                    Math.ceil(Number(totalItems) / Number(pageItemsSelectedRef.current.options[pageItemsSelectedRef.current.selectedIndex].value))
                );
                setPageItems(Array.from({ length: pages }, (v, k) => k + 1));
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
        setItems(pageItemsSelectedRef.current.options[pageItemsSelectedRef.current.selectedIndex].value);
    }

    const adjustRange = () => {
        let pageSize = pageItemsSelectedRef.current.options[pageItemsSelectedRef.current.selectedIndex],
            pageDropDown = pagesRef.current.options[pagesRef.current.selectedIndex];

        let rangeStart = rangeStartRef.current,
            rangeEnd = rangeEndRef.current;
        if (rangeStart && rangeEnd) {
            rangeStart.innerHTML = ((pageDropDown.value - 1) * pageSize.value) + 1;
            if ((pageDropDown.value * pageSize.value) > totalItems) {
                rangeEnd.innerHTML = totalItems;
            } else {
                rangeEnd.innerHTML = (pageDropDown.value * pageSize.value);
            }
        }
    }

    const _onNextClick = (e) => {
        e.preventDefault();
        let pageDropDown = pagesRef.current.options[pagesRef.current.selectedIndex];
        if (nextbtnRef.current && !nextbtnRef.current.disabled && totalPages != pageDropDown.value) {
            pagesRef.current.selectedIndex++;
            startpagedisplayRef.current.innerHTML = pagesRef.current.options[pagesRef.current.selectedIndex].value;
            toggleNavButtons();
            adjustRange();
        }
    }

    const _onPreviousClick = (e) => {
        e.preventDefault();
        let pageDropDown = pagesRef.current.options[pagesRef.current.selectedIndex];
        if (previousbtnRef.current && !previousbtnRef.current.disabled && pageDropDown.value > 1) {
            pagesRef.current.selectedIndex--;
            startpagedisplayRef.current.innerHTML = pagesRef.current.options[pagesRef.current.selectedIndex].value;
            toggleNavButtons();
            adjustRange();
        }
    }

    const _onPagesChange = () => {
        toggleNavButtons();
        adjustRange();
        startpagedisplayRef.current.innerHTML = pagesRef.current.options[pagesRef.current.selectedIndex].value;
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
                        {itemsPerPageText}
                    </label>
                    <div className={`${prefix}-pagination-select-wrapper`}>
                        <Pager ref={pageItemsSelectedRef} onChange={_onItemsChange} options={pageSizes} className={`${prefix}-pagination-select ${prefix}-page-items`} />
                    </div>
                    <span className={`${prefix}-pagination-text`}>
                        <span className={`${prefix}-pagination-range`}>
                            <span className={`${prefix}-range-start`} ref={rangeStartRef} />&nbsp;
                             <span className={`${prefix}-range-separator`}>-</span>&nbsp;
                             <span className={`${prefix}-range-end`} ref={rangeEndRef} />
                        </span>&nbsp;of&nbsp;
                         <span className={`${prefix}-pagination-totalitems`}>
                            {totalItems}
                        </span>&nbsp;items
                     </span>
                </div>
                <div className={`${prefix}-pagination-right`}>
                    <span className={`${prefix}-pagination-text`}>
                        <span className={`${prefix}-page-start`} ref={startpagedisplayRef}>
                            1
                        </span>&nbsp;of&nbsp;
                         <span className={`${prefix}-page-end`} ref={totalpagesdisplayRef} />{totalPages}&nbsp;pages
                     </span>
                    <button className={`${prefix}-pagination-button-previous`}
                        aria-label={`Previous page`}
                        ref={previousbtnRef}
                        onClick={(e) => { _onPreviousClick(e); }}
                    >
                        <svg className={`bx--pagination__button-icon`} width="7" height="12" viewBox="0 0 7 12">
                            <path fillRule="nonzero" d="M1.45 6.002L7 11.27l-.685.726L0 6.003 6.315 0 7 .726z" />
                        </svg>
                    </button>
                    <div className={`${prefix}-pagination-select-wrapper`}>
                        <Pager ref={pagesRef} onChange={_onPagesChange} options={pageItems} className={`${prefix}-pagination-select ${prefix}-page-number`} />
                    </div>
                    <button className={`${prefix}-pagination-button-next`}
                        aria-label="Next page"
                        ref={nextbtnRef}
                        onClick={(e) => { _onNextClick(e); }}
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
    )
}

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    pageSizes: PropTypes.array,
    itemsPerPageText: PropTypes.string,
    onChange: PropTypes.func
};

Pagination.defaultProps = {
    totalItems: 0,
    pageSizes: [10, 20, 30],
    itemsPerPageText: 'Items per Page:',
    onChange: () => { }
};

export default Pagination;