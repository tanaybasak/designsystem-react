import React from 'react';


class WeekPanel extends React.Component {

    constructor(props) {
        super(props)
        this.weekDays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
        this.daysNodeList =[];
    }

    createWeekDays = () => {
        this.weekDays.forEach(element => {
            this.daysNodeList.push(<span>{element}</span>);
        });
        return this.daysNodeList;
    }

    render() {
        return (
          <div className='hcl-datePicker-days'>
            {this.daysNodeList.length ===0 ?  this.createWeekDays() : this.daysNodeList}
          </div>
        );
    }
};
export default WeekPanel;
