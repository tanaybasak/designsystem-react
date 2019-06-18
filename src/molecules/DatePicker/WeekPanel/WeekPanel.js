import React from 'react';
import PropTypes from 'prop-types';

class WeekPanel extends React.Component {
    static propTypes = {
        weekDays: PropTypes.array.isRequired
      };

    constructor(props) {
        super(props)
        this.daysNodeList =[];
    }

    createWeekDays = () => {
       this.props.weekDays.forEach((element , index) => {
            this.daysNodeList.push(<span key={index}>{element}</span>);
        });
        return this.daysNodeList;
    }

    render() {
        return (
          <div className="hcl-datePicker-days">
            {this.daysNodeList.length ===0 ? this.createWeekDays() : this.daysNodeList}
          </div>
        );
    }
}
export default WeekPanel;
