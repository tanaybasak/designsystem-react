/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import prefix from '../../settings';

const Pagination = ({
  totalItems,
  itemsPerPageStepper,
  itemsStepperLimit,
  itemsPerPageText,
  position,
  onPageChange,
  onItemsPerPageChange,
  currentPage,
  itemsPerPageInfoText,
  pageNumberInfoText,
  itemsValuesPerPage,
  pagePrepositionText,
  noItemDisplayText,
  itemsPerPageToSelect,
  className,
  ...restProps
}) => {
  const [
    currentItemsPerPageSelected,
    setCurrentItemsPerPageSelected
  ] = useState(null);
  const [currentPageSelected, setCurrentPageSelected] = useState(0);
  const [itemPerPageStepperArray, setItemPerPageStepperArray] = useState([]);

  useEffect(() => {
    if (currentPage) {
      setCurrentPageSelected(currentPage);
    }
    if (currentPage < 1) {
      setCurrentPageSelected(1);
    }
  }, [currentPage]);

  useEffect(() => {
    let stepperArray;
    if (itemsValuesPerPage) {
      stepperArray = itemsValuesPerPage.filter(val => {
        return val <= itemsStepperLimit;
      });
    } else {
      stepperArray = [itemsPerPageStepper];

      for (let i = 1; i <= itemsStepperLimit; i++) {
        if (stepperArray[i - 1] * 2 > itemsStepperLimit) {
          break;
        }
        stepperArray.push(stepperArray[i - 1] * 2);
      }
    }
    setItemPerPageStepperArray(stepperArray);
    if (
      itemsPerPageToSelect &&
      stepperArray.indexOf(itemsPerPageToSelect) > -1
    ) {
      setCurrentItemsPerPageSelected(itemsPerPageToSelect);
    } else {
      setCurrentItemsPerPageSelected(stepperArray[0]);
    }
  }, [itemsPerPageStepper, itemsStepperLimit, itemsPerPageToSelect]);

  useEffect(() => {
    if (itemsPerPageToSelect) {
      setCurrentItemsPerPageSelected(itemsPerPageToSelect);
    }
  }, [itemsPerPageToSelect]);

  const totalPage =
    totalItems && currentItemsPerPageSelected
      ? Math.ceil(totalItems / currentItemsPerPageSelected)
      : 0;

  if (currentPage && currentItemsPerPageSelected && currentPage > totalPage) {
    // eslint-disable-next-line no-console
    console.error('Pagination:props data mismatches');
  }

  const ItemsPerPageChange = e => {
    setCurrentItemsPerPageSelected(parseInt(e.value));
    if (Math.ceil(totalItems / parseInt(e.value)) < currentPageSelected) {
      setCurrentPageSelected(1);
      if (onItemsPerPageChange) {
        onItemsPerPageChange(parseInt(e.value), 1);
      }
    } else {
      if (onItemsPerPageChange) {
        onItemsPerPageChange(parseInt(e.value), currentPageSelected);
      }
    }
  };

  const PageChange = e => {
    // const { target } = e;
    setCurrentPageSelected(parseInt(e.value));
    if (onPageChange) {
      onPageChange(parseInt(e.value), currentItemsPerPageSelected);
    }
  };

  const onPreviousButtonClick = () => {
    setCurrentPageSelected(currentPageSelected - 1);
    if (onPageChange) {
      onPageChange(currentPageSelected - 1, currentItemsPerPageSelected);
    }
  };

  const onNextButtonClick = () => {
    setCurrentPageSelected(currentPageSelected + 1);
    if (onPageChange) {
      onPageChange(currentPageSelected + 1, currentItemsPerPageSelected);
    }
  };

  const onPagesKeyDown = e => {
    const key = e.keycode || e.which;
    if (key === 37) {
      if (currentPageSelected !== 1) {
        setCurrentPageSelected(currentPageSelected - 1);
      }
      e.preventDefault();
    } else if (key === 39) {
      if (currentPageSelected < totalPage) {
        setCurrentPageSelected(currentPageSelected + 1);
      }
      e.preventDefault();
    }
  };

  const onPageItemsKeyDown = e => {
    const key = e.keycode || e.which;
    const { target } = e;
    const selIndex = target.options.selectedIndex;
    const options = target.options;
    if (key === 37) {
      if (selIndex != 0) {
        setCurrentItemsPerPageSelected(
          parseInt(options[selIndex - 1].value, 10)
        );
      }
      e.preventDefault();
    } else if (key === 39) {
      if (selIndex < options.length - 1) {
        setCurrentItemsPerPageSelected(
          parseInt(options[selIndex + 1].value, 10)
        );
      }
      e.preventDefault();
    }
  };

  const getPagesArrayVal = () => {
    const val = totalPage
      ? Array.from(
          {
            length: totalPage
          },
          (v, k) => k + 1
        )
      : Array.from(Array(1).keys());
    return val;
  };
  const numberOfPages = () => {
    return (
      <>
        <span className={`${prefix}-pagination-text`}>
          <span className={`${prefix}-page-start`}>
            {totalItems ? currentPageSelected : totalPage}
          </span>
          {pagePrepositionText}
          <span className={`${prefix}-page-end`}>{totalPage}</span>
          {pageNumberInfoText}
        </span>
      </>
    );
  };
  const navPagination = () => {
    return (
      <>
        <button
          type={`button`}
          className={`${prefix}-pagination-button-previous`}
          aria-label={`Previous page`}
          disabled={currentPageSelected === 1 || totalPage === 0}
          onClick={onPreviousButtonClick.bind(this)}
        >
          <svg
            className={`${prefix}-pagination-button-icon`}
            width="7"
            height="12"
            viewBox="0 0 7 12"
          >
            <path
              fillRule="nonzero"
              d="M1.45 6.002L7 11.27l-.685.726L0 6.003 6.315 0 7 .726z"
            />
          </svg>
        </button>
        <div className={`${prefix}-pagination-select-wrapper`}>
          <Pager
            arialabel="page number"
            value={currentPageSelected ? currentPageSelected : 1}
            onKeyDown={onPagesKeyDown}
            onChange={PageChange.bind(this)}
            options={getPagesArrayVal()}
            className={`${prefix}-page-number`}
          />
        </div>
        <button
          type={`button`}
          className={`${prefix}-pagination-button-next`}
          aria-label="Next page"
          disabled={currentPageSelected === totalPage || totalPage === 0}
          onClick={onNextButtonClick.bind(this)}
        >
          <svg
            className={`${prefix}-pagination-button-icon`}
            width="7"
            height="12"
            viewBox="0 0 7 12"
          >
            <path
              fillRule="nonzero"
              d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"
            />
          </svg>
        </button>
      </>
    );
  };
  const numberOfRows = () => {
    return (
      <>
        <div className={`${prefix}-pagination-label`}>{itemsPerPageText}</div>
        <div className={`${prefix}-pagination-select-wrapper`}>
          <Pager
            arialabel="page items"
            value={
              currentItemsPerPageSelected ? currentItemsPerPageSelected : null
            }
            onKeyDown={onPageItemsKeyDown}
            onChange={ItemsPerPageChange.bind(this)}
            options={itemPerPageStepperArray}
            className={`${prefix}-page-items`}
          />
        </div>
      </>
    );
  };
  const itemsName = () => {
    return (
      <>
        <span className={`${prefix}-pagination-text`}>
          {totalItems ? (
            <>
              <span className={`${prefix}-pagination-range`}>
                <span className={`${prefix}-range-start`}>
                  {(currentPageSelected - 1) * currentItemsPerPageSelected + 1}
                </span>
                <span className={`${prefix}-range-separator`}>-</span>
                <span className={`${prefix}-range-end`}>
                  {currentPageSelected * currentItemsPerPageSelected >
                  totalItems
                    ? totalItems
                    : currentPageSelected * currentItemsPerPageSelected}
                </span>
              </span>
              {pagePrepositionText}
              <span className={`${prefix}-pagination-totalitems`}>
                {totalItems}
              </span>
              {itemsPerPageInfoText}
            </>
          ) : (
            noItemDisplayText
          )}
        </span>
      </>
    );
  };

  const pageAlign = fnstring => {
    switch (fnstring) {
      case 'itemsPerPageSelection':
        return numberOfRows();
      case 'pageNumberSelection':
        return navPagination();
      case 'pageNumberInfo':
        return numberOfPages();
      case 'itemsPerPageInfo':
        return itemsName();
    }
  };

  return (
    <div
      className={`${prefix}-pagination${className ? ` ${className}` : ''}`}
      {...restProps}
    >
      <div className={`${prefix}-pagination-left`}>
        {position.left
          ? position.left.map((item, index) => {
              return (
                <div
                  className={
                    item === 'pageNumberSelection'
                      ? `${prefix}-pagination-left-wrapper`
                      : position.left.length - 1 != index
                      ? `${prefix}-pagination-left-wrapper`
                      : `${prefix}-pagination-wrapper`
                  }
                  key={index}
                >
                  {pageAlign(item)}
                </div>
              );
            })
          : null}
      </div>
      <div className={`${prefix}-pagination-right`}>
        {position.right
          ? position.right.map((item, index) => {
              return (
                <div
                  className={
                    item === 'pageNumberSelection'
                      ? `${prefix}-pagination-right-wrapper`
                      : index
                      ? `${prefix}-pagination-right-wrapper`
                      : `${prefix}-pagination-wrapper`
                  }
                  key={index}
                >
                  {pageAlign(item)}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  /** Total number of items to be shown in Pagination Component. */
  totalItems: PropTypes.number.isRequired,
  /** Stepper value which is incremented in multiples of 2 with the previous value. */
  itemsPerPageStepper: PropTypes.number.isRequired,
  /** Number within which Step Numbers are generated. */
  itemsStepperLimit: PropTypes.number,
  /** Array values for options */
  itemsValuesPerPage: PropTypes.arrayOf(PropTypes.number),
  /** Text to display to the left of the No. of items Dropdown */
  itemsPerPageText: PropTypes.string,
  /** Text to display to the itemsPerPageInfo */
  itemsPerPageInfoText: PropTypes.string,
  /** Text to display to the page Preposition */
  pagePrepositionText: PropTypes.string,
  /** Text to display to the page Number Info */
  pageNumberInfoText: PropTypes.string,
  /** Text to display when totalItem is zero */
  noItemDisplayText: PropTypes.string,
  /** Accepts Event handler as argument/prop which is triggered after Items Per Page Dropdown is changed.
   *
   * @signature
   * * ```itemPerPage``` :  item per page value
   * * ```currentPageNo``` : current Page Selected value
   */
  onItemsPerPageChange: PropTypes.func,
  /** Accepts Event handler as argument/prop which is triggered after Page Drop-down is changed.
   *
   * @signature
   * * ```currentPageNo``` : current Page Selected value
   * * ```itemPerPage``` :  item per page value
   */
  onPageChange: PropTypes.func,
  /** current active Page number */
  currentPage: PropTypes.number,
  /** itemsPerPageToSelect - The value to be selected from itemsPerPage dropdown */
  itemsPerPageToSelect: PropTypes.number,
  /** position - Holds the customisable content names to be placed in left and right side of pagination. If empty object, nothing will be rendered*/
  position: PropTypes.shape({
    left: PropTypes.arrayOf(PropTypes.string),
    right: PropTypes.arrayOf(PropTypes.string)
  }),
  /** custom className for the Pagination */
  className: PropTypes.string
};

Pagination.defaultProps = {
  totalItems: 0,
  currentPage: 1,
  itemsPerPageStepper: 20,
  itemsStepperLimit: 100,
  itemsValuesPerPage: null,
  itemsPerPageText: 'Items per Page:',
  itemsPerPageInfoText: 'items',
  pagePrepositionText: 'of',
  pageNumberInfoText: 'pages',
  noItemDisplayText: 'No items to display',
  itemsPerPageToSelect: null,
  onItemsPerPageChange: () => {},
  onPageChange: () => {},
  position: {
    left: ['itemsPerPageSelection', 'itemsPerPageInfo'],
    right: ['pageNumberInfo', 'pageNumberSelection']
  },
  className: null
};

export default Pagination;
