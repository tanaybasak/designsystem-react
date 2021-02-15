/* eslint-disable no-console */
import React, { Component, createRef } from 'react';
import { Wizard2, Wizard, Step } from '../../molecules/Wizard';
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
    selIndex: 0,
    wizardmodel: [
      {
        title: 'Little lillies Little lillies Little lillies',
        description: "It's flowering always",
        // status: 'error'
      },
      {
        title: 'Address',
        description: 'Input your present address'
      },
      {
        title: 'Family Details Family Details Family Details',
        description: 'Input your personal details here'
      },
      {
        title: 'Card',
        description: 'Enter your card details'
      },
      {
        title: 'Alternate Contact',
        description: 'Alternate Contact'
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

  // componentDidUpdate(p) {
  //   console.log(p);
  // }

  handleLinearClick = (idx, e) => {
    console.log(idx);
    // let combinedState = [...this.state.wizardmodel];
    // if (idx === 1) {
    //   combinedState = [];
    //   const oldState = this.state.wizardmodel;
    //   const newState = oldState.map((item, idx) => {
    //     if (idx === 0) {
    //       item.error = true;
    //     }
    //     return item;
    //   });

    //   combinedState = [...newState];
    // }
    // console.log(combinedState);
    // this.setState({
    //   selIndex: idx,
    //   wizardmodel: combinedState
    // });
  };

  render() {
    return (
      <>
        <Wizard2
          ref={this.rr}
          // titleBelow
          // responsive
          activeIndex={this.state.selIndex}
          // onChange={(e, idx) => {
          //1. Step by Step
          // if (idx === this.state.selIndex + 1 || idx < this.state.selIndex)
          //   this.setState({ ...this.state, selIndex: idx });
          //2. Click anywhere - can also go back.
          // this.setState({ ...this.state, selIndex: idx });
          //3. Step by Step
          // if (idx === this.state.selIndex + 1 || idx < this.state.selIndex)
          //   this.setState({ ...this.state, selIndex: idx });
          // }}
        >
          {this.state.wizardmodel.map((item, idx) => {
            // const state = {
            //   complete: false
            // };
            // if (idx === 2) {
            //   state.disabled = false;
            // }
            // if (idx === this.state.selIndex) {
            //   state.complete = true;
            // }
            return (
              <Step
                key={idx}
                title={item.title}
                description={item.description}
                error={item['error'] ? item.error : false}
                // iconClass={'testing-icon'}
                // onClick={idx <= this.selIndex ? this.handleLinearClick : null}
                // onClick={this.handleLinearClick.bind(this, idx)}
                onClick={idx === 1 ? this.handleLinearClick.bind(this, idx) : null}
                // {...state}
              />
            );
          })}
        </Wizard2>
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
