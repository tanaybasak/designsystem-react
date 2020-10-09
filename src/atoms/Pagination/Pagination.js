import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import prefix from '../../settings';

const Pagination = ({
  totalItems,
  itemsPerPageStepper,
  itemsStepperLimit,
  itemsPerPageText,
  onPageChange,
  onItemsPerPageChange,
  currentPage,
  itemsPerPageToSelect
}) => {
  const [
    currentItemsPerPageSelected,
    setCurrentItemsPerPageSelected
  ] = useState(null);
  const [currentPageSelected, setCurrentPageSelected] = useState(null);
  const [itemPerPageStepperArray, setItemPerPageStepperArray] = useState([]);

  useEffect(() => {
    if (currentPage) {
      if (
        currentItemsPerPageSelected &&
        totalItems &&
        Math.ceil(totalItems / currentItemsPerPageSelected) < currentPage
      ) {
        setCurrentPageSelected(1);
      } else {
        setCurrentPageSelected(currentPage);
      }
    }
  }, [currentPage, currentItemsPerPageSelected]);

  useEffect(() => {
    let stepperArray = [itemsPerPageStepper];
    for (let i = 1; i <= itemsStepperLimit; i++) {
      if (stepperArray[i - 1] * 2 > itemsStepperLimit) {
        break;
      }
      stepperArray.push(stepperArray[i - 1] * 2);
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

  const ItemsPerPageChange = e => {
    const { target } = e;
    setCurrentItemsPerPageSelected(parseInt(target.value));

    if (Math.ceil(totalItems / parseInt(target.value)) < currentPageSelected) {
      setCurrentPageSelected(1);
      if (onItemsPerPageChange) {
        onItemsPerPageChange(parseInt(target.value), 1);
      }
    } else {
      if (onItemsPerPageChange) {
        onItemsPerPageChange(parseInt(target.value), currentPageSelected);
      }
    }
  };

  const PageChange = e => {
    const { target } = e;
    setCurrentPageSelected(parseInt(target.value));
    if (onPageChange) {
      onPageChange(parseInt(target.value), currentItemsPerPageSelected);
    }
  };

  const onPreviousButtonClick = () => {
    setCurrentPageSelected(currentPageSelected - 1);
  };

  const onNextButtonClick = () => {
    setCurrentPageSelected(currentPageSelected + 1);
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
    const val = Array.from(
      {
        length: totalPage
      },
      (v, k) => k + 1
    ).slice(0);
    return val;
  };

  const rangeStart = () => {
    let val = (currentPageSelected - 1) * currentItemsPerPageSelected + 1;
    return val;
  };

  return (
    <div className={`${prefix}-pagination`}>
      <div className={`${prefix}-pagination-left`}>
        <div className={`${prefix}-pagination-text`}>{itemsPerPageText}</div>
        <div className={`${prefix}-pagination-select-wrapper`}>
          <Pager
            arialabel="page items"
            value={
              currentItemsPerPageSelected ? currentItemsPerPageSelected : null
            }
            onKeyDown={onPageItemsKeyDown}
            onChange={ItemsPerPageChange.bind(this)}
            options={itemPerPageStepperArray ? itemPerPageStepperArray : []}
            className={`${prefix}-pagination-select ${prefix}-page-items`}
          />
        </div>
        <span className={`${prefix}-pagination-text`}>
          <span className={`${prefix}-pagination-range`}>
            <span className={`${prefix}-range-start`}>{rangeStart()}</span>
            <span className={`${prefix}-range-separator`}>-</span>
            <span className={`${prefix}-range-end`}>
              {currentPageSelected * currentItemsPerPageSelected > totalItems
                ? totalItems
                : currentPageSelected * currentItemsPerPageSelected}
            </span>
          </span>
          of
          <span className={`${prefix}-pagination-totalitems`}>
            {totalItems}
          </span>
          items
        </span>
      </div>
      <div className={`${prefix}-pagination-right`}>
        <span className={`${prefix}-pagination-text`}>
          <span className={`${prefix}-page-start`}>{currentPageSelected}</span>
          of
          <span className={`${prefix}-page-end`}>{totalPage}</span>
          pages
        </span>
        <button
          type={`button`}
          className={`${prefix}-pagination-button-previous`}
          aria-label={`Previous page`}
          disabled={currentPageSelected === 1}
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
            className={`${prefix}-pagination-select ${prefix}-page-number`}
          />
        </div>
        <button
          type={`button`}
          className={`${prefix}-pagination-button-next`}
          aria-label="Next page"
          disabled={currentPageSelected === totalPage}
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
  /** Text to display to the left of the No. of items Dropdown */
  itemsPerPageText: PropTypes.string,
  /** Accepts Event handler as argument/prop which is triggered after Items Per Page Dropdown is changed. */
  onItemsPerPageChange: PropTypes.func,
  /** Accepts Event handler as argument/prop which is triggered after Page Drop-down is changed. */
  onPageChange: PropTypes.func,
  /** current active Page number */
  currentPage: PropTypes.number,
  /** itemsPerPageToSelect - The value to be selected from itemsPerPage dropdown */
  itemsPerPageToSelect: PropTypes.number
};

Pagination.defaultProps = {
  totalItems: 0,
  currentPage: 1,
  itemsPerPageStepper: 20,
  itemsStepperLimit: 100,
  itemsPerPageText: 'Items per Page:',
  itemsPerPageToSelect: null,
  onItemsPerPageChange: () => {},
  onPageChange: () => {}
};

export default Pagination;
