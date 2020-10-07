import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import prefix from '../../settings';

const Pagination = ({
  totalItems,
  itemsPerPageStepper,
  itemsStepperLimit,
  itemsPerPageText,
  onPageChange,
  currentPage,
  onItemsPerPageChange,
  itemsPerPageToSelect
}) => {
  const [itemPerPageStepperArray, setItemPerPageStepperArray] = useState([]);
  const [
    currentItemsPerPageSelected,
    setCurrentItemsPerPageSelected
  ] = useState(null);
  const [currentPageSelected, setCurrentPageSelected] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(false);
  const [pagesArray, setPagesArray] = useState([]);

  const pageItemsSelectedRef = useRef(null);
  const pagesRef = useRef(null);
  const nextbtnRef = useRef(null);

  useEffect(() => {
    let stepperArray = [itemsPerPageStepper];
    for (let i = 1; i <= itemsStepperLimit; i++) {
      if (stepperArray[i - 1] * 2 > itemsStepperLimit) {
        break;
      }
      stepperArray.push(stepperArray[i - 1] * 2);
    }
    setItemPerPageStepperArray(stepperArray);
  }, [itemsPerPageStepper, itemsStepperLimit]);

  useEffect(() => {
    if (
      currentPage &&
      currentPage > 0 &&
      totalItems &&
      totalItems > 0 &&
      (itemsPerPageToSelect || itemsPerPageStepper)
    ) {
      const totalpages = Math.ceil(
        totalItems / itemsPerPageStepper
          ? itemsPerPageStepper
          : itemsPerPageToSelect
      );
      if (isFinite(totalpages)) {
        if (currentPage > totalpages) {
          setCurrentPageSelected(1);
        } else {
          setCurrentPageSelected(currentPage);
        }
        if (itemsPerPageToSelect && itemsPerPageToSelect > 0) {
          setCurrentItemsPerPageSelected(itemsPerPageToSelect);
        }
        setNextButtonDisabled(
          totalpages === currentPage || totalpages === 1 ? true : false
        );
        setPreviousButtonDisabled(
          currentPage === 1 || totalpages === 1 ? true : false
        );
        if (itemsPerPageStepper && itemsPerPageToSelect) {
          // both given
          getPagesArrayVal(itemsPerPageToSelect);
        } else if (!itemsPerPageToSelect) {
          getPagesArrayVal(itemsPerPageStepper);
        }
      }
    }
  }, [currentPage, totalItems, itemsPerPageToSelect, itemsPerPageStepper]);

  const getPagesArrayVal = (sel = undefined) => {
    const val = Array.from(
      {
        length: Math.ceil(
          totalItems /
            (sel
              ? sel
              : itemsPerPageToSelect
              ? itemsPerPageToSelect
              : itemsPerPageStepper)
        )
      },
      (v, k) => k + 1
    ).slice(0);
    setPagesArray(val);
  };

  const _onItemsChange = e => {
    const { target } = e;
    if (target) {
      const selectedVal = parseInt(
        target.options[target.selectedIndex].value,
        10
      );
      setCurrentItemsPerPageSelected(selectedVal);
      if (Math.ceil(totalItems / selectedVal) < currentPageSelected) {
        setCurrentPageSelected(1);
      }
      setButtonEnableDisable();
      getPagesArrayVal(selectedVal);
      onItemsPerPageCallBack(selectedVal);
    }
  };

  const _onPagesChange = e => {
    const { target } = e;
    if (target) {
      const selectedVal = parseInt(
        target.options[target.selectedIndex].value,
        10
      );
      setCurrentPageSelected(selectedVal);
      setButtonEnableDisable();
      onPageChangeCallBack();
    }
  };

  const setButtonEnableDisable = () => {
    if (pageItemsSelectedRef && pageItemsSelectedRef.current) {
      const itemsPerPageTemp = parseInt(
        pageItemsSelectedRef.current.options[
          pageItemsSelectedRef.current.selectedIndex
        ].value,
        10
      );
      const currentPageTemp = parseInt(
        pagesRef.current.options[pagesRef.current.selectedIndex].value,
        10
      );
      const totalpages = Math.ceil(totalItems / itemsPerPageTemp);
      setNextButtonDisabled(
        totalpages === currentPageTemp || totalpages === 1 ? true : false
      );
      setPreviousButtonDisabled(
        totalpages < currentPageTemp ||
          currentPageTemp === 1 ||
          totalpages === 1
          ? true
          : false
      );
    }
  };

  const rangeStart = () => {
    let val = itemsPerPageStepper;
    if (
      currentPageSelected &&
      currentItemsPerPageSelected &&
      !itemsPerPageToSelect
    ) {
      val = (currentPageSelected - 1) * currentItemsPerPageSelected + 1;
    } else if (
      currentPageSelected &&
      !currentItemsPerPageSelected &&
      itemsPerPageToSelect
    ) {
      val = (currentPageSelected - 1) * itemsPerPageToSelect + 1;
    } else if (
      currentPageSelected &&
      currentItemsPerPageSelected &&
      itemsPerPageToSelect
    ) {
      val = (currentPageSelected - 1) * currentItemsPerPageSelected + 1;
    } else if (
      currentPage &&
      currentItemsPerPageSelected &&
      !itemsPerPageToSelect
    ) {
      val = (currentPage - 1) * currentItemsPerPageSelected + 1;
    } else if (
      currentPage &&
      !currentItemsPerPageSelected &&
      itemsPerPageToSelect
    ) {
      val = (currentPage - 1) * itemsPerPageToSelect + 1;
    } else if (
      currentPage &&
      currentItemsPerPageSelected &&
      itemsPerPageToSelect
    ) {
      val = (currentPage - 1) * currentItemsPerPageSelected + 1;
    } else {
      val =
        (currentPageSelected ? currentPageSelected - 1 : currentPage - 1) *
          val +
        1;
    }

    return val;
  };

  const rangeEnd = () => {
    let val = itemsPerPageStepper;
    if (
      currentPageSelected &&
      currentItemsPerPageSelected &&
      itemsPerPageToSelect
    ) {
      const isGreater =
        currentPageSelected *
          (currentItemsPerPageSelected
            ? currentItemsPerPageSelected
            : itemsPerPageToSelect) >
        totalItems;
      if (isGreater) {
        val = totalItems;
      } else {
        val = currentPageSelected * currentItemsPerPageSelected;
      }
    } else if (
      currentPage &&
      currentItemsPerPageSelected &&
      itemsPerPageToSelect
    ) {
      const isGreater =
        currentPage *
          (currentItemsPerPageSelected
            ? currentItemsPerPageSelected
            : itemsPerPageToSelect) >
        totalItems;
      if (isGreater) {
        val = totalItems;
      } else {
        val = currentPage * currentItemsPerPageSelected;
      }
    } else if (!itemsPerPageToSelect) {
      if (currentPageSelected && currentItemsPerPageSelected) {
        const isGreater =
          currentPageSelected * currentItemsPerPageSelected > totalItems;
        if (isGreater) {
          val = totalItems;
        } else {
          val = currentPageSelected * currentItemsPerPageSelected;
        }
      } else if (currentPage && currentItemsPerPageSelected) {
        const isGreater =
          currentPage * currentItemsPerPageSelected > totalItems;
        if (isGreater) {
          val = totalItems;
        } else {
          val = currentPage * currentItemsPerPageSelected;
        }
      } else if (
        currentPage &&
        currentPageSelected &&
        !currentItemsPerPageSelected
      ) {
        const isGreater =
          currentPageSelected * itemsPerPageStepper > totalItems;
        if (isGreater) {
          val = totalItems;
        } else {
          val = currentPageSelected * itemsPerPageStepper;
        }
      }
    }
    return val;
  };

  const _onNextButtonClick = e => {
    e.preventDefault();
    onNextBtnClick();
  };

  const _onPreviousButtonClick = e => {
    e.preventDefault();
    onPreviousBtnClick();
  };

  const onNextBtnClick = () => {
    if (pagesRef && pagesRef.current) {
      pagesRef.current.selectedIndex++;
      const incrementedIndex = parseInt(pagesRef.current.selectedIndex, 10);
      const pageDropDownOption =
        pagesRef.current.options[incrementedIndex + ''];
      setCurrentPageSelected(parseInt(pageDropDownOption.value, 10));
      setButtonEnableDisable();
      onPageChangeCallBack();
    }
  };

  const onPreviousBtnClick = () => {
    if (pagesRef && pagesRef.current) {
      pagesRef.current.selectedIndex--;
      const decrementedIndex = parseInt(pagesRef.current.selectedIndex, 10);
      const pageDropDownOption =
        pagesRef.current.options[decrementedIndex + ''];
      setCurrentPageSelected(parseInt(pageDropDownOption.value, 10));
      setButtonEnableDisable();
      onPageChangeCallBack();
    }
  };

  const onNextItemsPerPage = () => {
    const incrementedIndex =
      parseInt(pageItemsSelectedRef.current.selectedIndex, 10) + 1;
    const pageItemsDropDownOption =
      pageItemsSelectedRef.current.options[incrementedIndex + ''];
    getPagesArrayVal(parseInt(pageItemsDropDownOption.value, 10));
    setCurrentItemsPerPageSelected(parseInt(pageItemsDropDownOption.value, 10));
    onItemsPerPageCallBack(parseInt(pageItemsDropDownOption.value, 10));
  };

  const onPreviousItemsPerPage = () => {
    const decrementedIndex =
      parseInt(pageItemsSelectedRef.current.selectedIndex, 10) - 1;
    const pageItemsDropDownOption =
      pageItemsSelectedRef.current.options[decrementedIndex + ''];
    getPagesArrayVal(parseInt(pageItemsDropDownOption.value, 10));
    setCurrentItemsPerPageSelected(parseInt(pageItemsDropDownOption.value, 10));
    onItemsPerPageCallBack(parseInt(pageItemsDropDownOption.value, 10));
  };

  const _onKeyDown = e => {
    const { target, keycode, which } = e;
    const key = keycode || which;
    const selIndex = target.selectedIndex;
    if (key === 37) {
      if (selIndex > 0) {
        // OTHER THAN FIRST ELEMENT
        if (target === pagesRef.current) {
          onPreviousBtnClick();
        } else if (target === pageItemsSelectedRef.current) {
          onPreviousItemsPerPage();
        }
      }
    } else if (key === 39) {
      const optionsLen = target.options.length;
      if (optionsLen - 1 !== selIndex) {
        if (target === pagesRef.current) {
          onNextBtnClick();
        } else if (target === pageItemsSelectedRef.current) {
          onNextItemsPerPage();
        }
      }
    }
  };

  const onPageChangeCallBack = () => {
    if (onPageChange) {
      console.log(
        pagesRef.current.options[pagesRef.current.selectedIndex].value
      );
      onPageChange(
        parseInt(
          pagesRef.current.options[pagesRef.current.selectedIndex].value,
          10
        ),
        parseInt(
          pageItemsSelectedRef.current.options[
            pageItemsSelectedRef.current.selectedIndex
          ].value,
          10
        )
      );
    }
  };

  const onItemsPerPageCallBack = (val = null) => {
    if (onItemsPerPageChange && val) {
      if (
        Math.ceil(totalItems / val) <
        (currentPageSelected ? currentPageSelected : currentPage)
      ) {
        onItemsPerPageChange(val, 1);
      } else {
        onItemsPerPageChange(
          val,
          currentPageSelected ? currentPageSelected : currentPage
        );
      }
    }
  };

  return (
    <div className={`${prefix}-pagination`}>
      <div className={`${prefix}-pagination-left`}>
        <div className={`${prefix}-pagination-text`}>{itemsPerPageText}</div>
        <div className={`${prefix}-pagination-select-wrapper`}>
          <Pager
            arialabel="page items"
            ref={pageItemsSelectedRef}
            value={
              currentItemsPerPageSelected
                ? currentItemsPerPageSelected
                : itemsPerPageToSelect
            }
            onKeyDown={_onKeyDown}
            onChange={_onItemsChange.bind(this)}
            options={itemPerPageStepperArray}
            className={`${prefix}-pagination-select ${prefix}-page-items`}
          />
        </div>
        <span className={`${prefix}-pagination-text`}>
          <span className={`${prefix}-pagination-range`}>
            <span className={`${prefix}-range-start`}>{rangeStart()}</span>
            <span className={`${prefix}-range-separator`}>-</span>
            <span className={`${prefix}-range-end`}>{rangeEnd()}</span>
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
          <span className={`${prefix}-page-start`}>
            {currentPageSelected ? currentPageSelected : currentPage}
          </span>
          of
          <span className={`${prefix}-page-end`}>{pagesArray.length}</span>
          pages
        </span>
        <button
          type={`button`}
          className={`${prefix}-pagination-button-previous`}
          aria-label={`Previous page`}
          disabled={previousButtonDisabled}
          onClick={_onPreviousButtonClick.bind(this)}
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
            ref={pagesRef}
            value={currentPageSelected ? currentPageSelected : currentPage}
            onKeyDown={_onKeyDown}
            onChange={_onPagesChange.bind(this)}
            options={pagesArray}
            className={`${prefix}-pagination-select ${prefix}-page-number`}
          />
        </div>
        <button
          type={`button`}
          className={`${prefix}-pagination-button-next`}
          ref={nextbtnRef}
          aria-label="Next page"
          disabled={nextButtonDisabled}
          onClick={_onNextButtonClick.bind(this)}
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
