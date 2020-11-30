import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../../settings';
import Button from '../../../../atoms/Button';

const PanelHeader = ({
  view,
  setView,
  currDateObj,
  setCurrDateObj,
  months,
  weekDays,
  minDate,
  maxDate
}) => {
  const dateViewChangeHandler = event => {
    event.stopPropagation();
    event.preventDefault();
    let tempDate;
    if (
      event.currentTarget.classList.contains(
        `${prefix}-dateSelector-month-next`
      )
    ) {
      tempDate = new Date(
        currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year,
        currDateObj.month === 11 ? 0 : currDateObj.month + 1,
        15
      );
    } else if (
      event.currentTarget.classList.contains(
        `${prefix}-dateSelector-month-prev`
      )
    ) {
      tempDate = new Date(
        currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year,
        currDateObj.month === 0 ? 11 : currDateObj.month - 1,
        15
      );
    }
    setCurrDateObj({
      day: tempDate.getDay(),
      month: tempDate.getMonth(),
      date: tempDate.getDate(),
      year: tempDate.getFullYear()
    });
  };

  const createWeekDaysHeader = () => {
    return weekDays.map((weekDay, index) => {
      return <span key={`week-day-${index}`}>{weekDay}</span>;
    });
  };

  const monthViewChangeHandler = event => {
    if (
      event.currentTarget.classList.contains(
        `${prefix}-dateSelector-month-next`
      )
    ) {
      setCurrDateObj({
        day: currDateObj.day,
        month: currDateObj.month,
        date: currDateObj.date,
        year: currDateObj.year + 1
      });
    } else if (
      event.currentTarget.classList.contains(
        `${prefix}-dateSelector-month-prev`
      )
    ) {
      setCurrDateObj({
        day: currDateObj.day,
        month: currDateObj.month,
        date: currDateObj.date,
        year: currDateObj.year - 1
      });
    }
  };

  const yearViewChangeHandler = event => {
    if (
      event.currentTarget.classList.contains(
        `${prefix}-dateSelector-month-next`
      )
    ) {
      setCurrDateObj({
        day: currDateObj.day,
        month: currDateObj.month,
        date: currDateObj.date,
        year: currDateObj.year + 20
      });
    } else if (
      event.currentTarget.classList.contains(
        `${prefix}-dateSelector-month-prev`
      )
    ) {
      setCurrDateObj({
        day: currDateObj.day,
        month: currDateObj.month,
        date: currDateObj.date,
        year: currDateObj.year - 20
      });
    }
  };

  const ifPreviousDisabled = () => {
    let isDisabled = false;
    if (view === 'date') {
      if (minDate.getFullYear() > currDateObj.year) {
        isDisabled = true;
      } else {
        if (minDate.getFullYear() === currDateObj.year) {
          if (minDate.getMonth() >= currDateObj.month) {
            isDisabled = true;
          }
        }
      }
    }

    if (view === 'month') {
      if (minDate.getFullYear() >= currDateObj.year) {
        isDisabled = true;
      }
    }

    if (view === 'year') {
      if (minDate.getFullYear() >= currDateObj.year) {
        isDisabled = true;
      }
    }

    return isDisabled;
  };

  const ifNextDisabled = () => {
    let isDisabled;
    if (view === 'date') {
      if (maxDate.getFullYear() < currDateObj.year) {
        isDisabled = true;
      } else {
        if (maxDate.getFullYear() === currDateObj.year) {
          if (maxDate.getMonth() <= currDateObj.month) {
            isDisabled = true;
          }
        }
      }
    }

    if (view === 'month') {
      if (maxDate.getFullYear() <= currDateObj.year) {
        isDisabled = true;
      }
    }

    if (view === 'year') {
      if (maxDate.getFullYear() <= currDateObj.year + 19) {
        isDisabled = true;
      }
    }

    return isDisabled;
  };

  return (
    <>
      <div className="hcl-dateSelector-year-month">
        <Button
          className="hcl-dateSelector-month-prev"
          // disabled={
          //   panelType === 'endpanel' && monthDifference === 1 && view === 'date'
          //     ? true
          //     : false
          // }
          onClick={
            view === 'date'
              ? dateViewChangeHandler
              : view === 'month'
              ? monthViewChangeHandler
              : yearViewChangeHandler
          }
          disabled={ifPreviousDisabled()}
          small={false}
          title="Default"
          type="ghost"
        >
          <svg
            className="hcl-btn-icon"
            width="16"
            height="16"
            id="bd87ab4c-5665-4d97-8204-964dbb1387ec"
            data-name="Refresh-line-icon"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <rect
              id="a37e92ae-7a1a-4290-b76e-5382d19e71ed"
              data-name="&lt;Transparent Rectangleh&gt;"
              width="16"
              height="16"
              fill="none"
            />
            <path d="M10,13,5,8l5-5,.71.71L6.41,8l4.3,4.29Z" />
          </svg>
        </Button>
        <div className="hcl-dateSelector-select">
          {view === 'date' ? (
            <>
              <Button
                className="hcl-dateSelector-curMonth"
                disabled={false}
                onClick={() => {
                  setView('month');
                }}
                small={false}
                title="Default"
                type="ghost"
              >
                <span>{months[currDateObj.month]}</span>
                <svg
                  className="hcl-btn-icon"
                  width="16"
                  height="16"
                  id="ef373a64-617c-4deb-8356-779b7514bad4"
                  data-name="Refresh-line-icon"
                  xmlns="https://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <rect
                    id="a3a40fa6-f8d0-446a-b907-d86d4de572e6"
                    data-name="&lt;Transparent Rectangleh&gt;"
                    width="16"
                    height="16"
                    fill="none"
                  />
                  <path d="M12,6,8,11,4,6Z" />
                </svg>
              </Button>
              <Button
                className="hcl-dateSelector-year"
                disabled={false}
                onClick={() => {
                  setView('year');
                }}
                small={false}
                title="Default"
                type="ghost"
              >
                <span>{currDateObj.year}</span>
                <svg
                  className="hcl-btn-icon"
                  width="16"
                  height="16"
                  id="ef373a64-617c-4deb-8356-779b7514bad4"
                  data-name="Refresh-line-icon"
                  xmlns="https://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <rect
                    id="a3a40fa6-f8d0-446a-b907-d86d4de572e6"
                    data-name="&lt;Transparent Rectangleh&gt;"
                    width="16"
                    height="16"
                    fill="none"
                  />
                  <path d="M12,6,8,11,4,6Z" />
                </svg>
              </Button>
            </>
          ) : view === 'month' ? (
            <span> {currDateObj.year} </span>
          ) : (
            <span>
              {' '}
              {currDateObj.year} - {currDateObj.year + 20}{' '}
            </span>
          )}
        </div>
        <Button
          className="hcl-dateSelector-month-next"
          // disabled={
          //   panelType === 'startpanel' &&
          //   monthDifference === 1 &&
          //   view === 'date'
          //     ? true
          //     : false
          // }
          disabled={ifNextDisabled()}
          onClick={
            view === 'date'
              ? dateViewChangeHandler
              : view === 'month'
              ? monthViewChangeHandler
              : yearViewChangeHandler
          }
          small={false}
          title="Default"
          type="ghost"
        >
          {/* { view === 'date' ? null } */}
          <svg
            className="hcl-btn-icon"
            width="16"
            height="16"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <rect
              id="abe90e78-f5b1-4c39-852d-e6bc5403fd14"
              data-name="&lt;Transparent Rectangleh&gt;"
              width="16"
              height="16"
              fill="none"
            />
            <path d="M6,13l-.71-.71L9.59,8,5.29,3.71,6,3l5,5Z" />
          </svg>
        </Button>
      </div>
      {view === 'date' ? (
        <div className="hcl-dateSelector-days hcl-roboto-medium">
          {/* <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>Th</span>
          <span>F</span>
          <span>S</span> */}
          {createWeekDaysHeader()}
        </div>
      ) : null}
    </>
  );
};

PanelHeader.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  currDateObj: PropTypes.object.isRequired,
  setCurrDateObj: PropTypes.func.isRequired,
  // setYearSelected:PropTypes.string,
  months: PropTypes.array.isRequired,

  weekDays: PropTypes.array,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
};
export default PanelHeader;
