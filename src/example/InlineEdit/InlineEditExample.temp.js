/* eslint-disable no-console */
import React, { Component } from 'react';
import InlineEdit from '../../atoms/InlineEdit';
import { edit } from '../../util/icons';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';
import Dropdown from '../../atoms/Dropdown';
import DateSelector from '../../molecules/DateSelector';

class InlineEditExample extends Component {
  state = {
    value: 'Option 2',
    isHovering: false,
    isEditing: false,
    loader: false,
    formStatus: false,
    selectedItem: 'option-2',
    errorMessage: null,
    items: [
      {
        id: 'option-1',
        text: 'Option 1'
      },
      {
        id: 'option-2',
        text: 'Option 2'
      },
      {
        id: 'option-3',
        text: 'Option 3'
      },
      {
        id: 'option-4',
        text: 'Option 4'
      },
      {
        id: 'option-5',
        text: 'Option 5'
      },
      {
        id: 'option-6',
        text: 'Option 6'
      }
    ]
  };

  render() {
    return (
      <>
        <div className="hcl-col-4 mt-5" id="inline-section">
          {this.state.isEditing ? (
            <InlineEdit
              loader={this.state.loader}
              errorMessage={this.state.errorMessage}
              customIcon={
                <Button
                  type="neutral"
                  disabled={this.state.loader ? true : false}
                >
                  <Icon
                    type="svg"
                    alt="alt"
                    title="title"
                    viewBox="0 0 512 512"
                    className="toggleIcon"
                  >
                    <polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 " />
                  </Icon>
                </Button>
              }
              onTextUpdate={e => {
                console.log(e);
                this.setState({ loader: true });

                /** Dropdown */
                setTimeout(() => {
                  this.setState({
                    isEditing: false,
                    value: e.text,
                    selectedItem:e.id,
                    isHovering: false,
                    loader: false
                  });
                }, 2000);

                /** Text Input */
                // if (e.length > 4) {
                //   setTimeout(() => {
                //     this.setState({
                //       isEditing: false,
                //       value: e,
                //       isHovering: false,
                //       formStatus: false,
                //       errorMessage: null,
                //       loader: false
                //     });
                //   }, 2000);
                // } else {
                //   setTimeout(() => {
                //     this.setState({
                //       formStatus: true,
                //       errorMessage: 'Enter more than 3',
                //       loader: false
                //     });
                //   }, 2000);
                // }


                // /** DatePIcker */
                // setTimeout(() => {
                //   this.setState({
                //     isEditing: false,
                //     value: e.toDateString(),
                //     isHovering: false,
                //     loader: false
                //   });
                // }, 2000);


              }}
              onClose={() => {
                this.setState({
                  isEditing: false,
                  loader: false,
                  formStatus: false,
                  errorMessage: null
                });
                console.log('close is called');
              }}
            >
              {/* <DateSelector
                id="date-selector-id"
                weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
                months={[
                  'JAN',
                  'FEB',
                  'MAR',
                  'APR',
                  'MAY',
                  'JUN',
                  'JUL',
                  'AUG',
                  'SEP',
                  'OCT',
                  'NOV',
                  'DEC'
                ]}
                format="mm/dd/yyyy"
                //   onDateSelect={date => {
                //     console.log(date);
                //   }}
                // minDate={new Date(2020, 10, 5)}
                // maxDate={new Date(2065, 10, 22)}
              ></DateSelector> */}

              {/* <TextInput
                value={this.state.value}
                data-invalid={this.state.formStatus}
              /> */}
              <Dropdown
                type="top"
                items={this.state.items}
                label="Top DropDown"
                selectedItem={this.state.selectedItem}
                
              />
            </InlineEdit>
          ) : (
            <div
              style={{ height: '4rem', display: 'inline-block' }}
              onMouseEnter={() => this.setState({ isHovering: true })}
              onMouseLeave={() => this.setState({ isHovering: false })}
            >
              <span
                className="hcl-inline-label"
                style={
                  !this.state.isHovering
                    ? { cursor: 'pointer', position: 'relative', top: '12px' }
                    : { cursor: 'pointer' }
                }
              >
                {this.state.value}
              </span>
              <button
                type="button"
                className={
                  this.state.isHovering
                    ? `hcl-inline-btn hcl-inline-close`
                    : null
                }
                style={{ cursor: 'pointer' }}
                aria-label="inline-close"
                onClick={() => this.setState({ isEditing: true })}
              >
                {edit}
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default InlineEditExample;
