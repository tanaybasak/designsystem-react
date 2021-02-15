/* eslint-disable no-console */
import React, { Component } from 'react';
import { Wizard, Step } from '../../molecules/Wizard';
// import { User, User2 } from '../../util/icons';
import Button from '../../atoms/Button';

class WizardExample extends Component {
  constructor(props) {
    super(props);
    this.rr = React.createRef();
    this.finishRef = React.createRef();
    this.nextRef = React.createRef();
  }

  state = {
    selIndex: 2,
    wizardmodel: [
      {
        title: 'Little lillies Little lillies Little lillies',
        description: "It's flowering always",
        status: 'completed'
      },
      {
        title: 'Address',
        description: 'Input your present address',
        status: 'error'
        // status: 'default'
      },
      {
        title: 'Family Details Family Details Family Details',
        description: 'Input your personal details here'
        // status: 'default'
      },
      {
        title: 'Card',
        description: 'Enter your card details'
        // status: 'default'
      },
      {
        title: 'Alternate Contact',
        description: 'Alternate Contact'
        // status: 'default'
      }
      // {
      //   title: 'Alternate Contact',
      //   description: 'Alternate Contact'
      // }
      // {
      //   title: 'Alternate Contact',
      //   description: 'Alternate Contact'
      // }
    ]
  };

  handleLinearClick = (idx, e) => {
    // if (idx < this.state.selIndex) {
    //   this.setState({
    //     selIndex: idx
    //   });
    // }
  };

  render() {
    return (
      <>
        <Wizard
          ref={this.rr}
          type={'style1'}
          // iconType="number"
          // titleBelow
          // responsive
          activeIndex={this.state.selIndex}
        >
          {this.state.wizardmodel.map((item, idx) => {
            return (
              <Step
                key={idx}
                title={item.title}
                description={item.description}
                status={item.status}
                onClick={this.handleLinearClick.bind(this, idx)}
              />
            );
          })}
        </Wizard>
        <div>
          <Button
            type="ghost"
            kind="button"
            onClick={() =>
              this.setState(
                (prevState, props) => {
                  return { selIndex: prevState.selIndex - 1 };
                },
                () => {
                  console.log('updated state', this.state.selIndex);
                }
              )
            }
          >
            Back
          </Button>
          {this.state.selIndex < 4 ? (
            <Button
              type="primary"
              kind="button"
              // ref={this.nextRef}
              onClick={() =>
                this.setState(
                  (prevState, props) => {
                    return { selIndex: prevState.selIndex + 1 };
                  },
                  () => {
                    console.log('updated state', this.state.selIndex);
                    // console.log(this.nextRef);
                  }
                )
              }
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              kind="button"
              // ref={this.finishRef}
              disabled={this.state.selIndex === 5}
              onClick={() =>
                this.setState(
                  (prevState, props) => {
                    return { selIndex: prevState.selIndex + 1 };
                  },
                  () => {
                    // console.log(this.finishRef);
                    console.log('updated state', this.state.selIndex);
                  }
                )
              }
            >
              Finish
            </Button>
          )}
        </div>
      </>
    );
  }
}

export default WizardExample;
