import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const WeekPanel = ({ weekDays }) => {
  const daysNodeList = [];

  const createWeekDays = () => {
    weekDays.forEach((element, index) => {
      daysNodeList.push(<span key={index}>{element}</span>);
    });
    return daysNodeList;
  }

  return (
    <div className={`${prefix}-datePicker-days`}>
      {daysNodeList.length === 0 ? createWeekDays() : daysNodeList}
    </div>
  );
}
WeekPanel.propTypes = {
  weekDays: PropTypes.array.isRequired
};
export default WeekPanel;
