/* eslint-disable no-console */
import React, { Component, createRef } from 'react';
import { Wizard2, Wizard, Step } from '../../molecules/Wizard';
// import { User, User2 } from '../../util/icons';
import Button from '../../atoms/Button';

class WizardExample extends Component {
  constructor(props) {
    super(props);
    this.rr = React.createRef();
  }

  state = {
    selIndex: 2,
    wizardmodel: [
      {
        title: 'Little lillies Little lillies Little lillies',
        description: "It's flowering always"
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

  // handleLinearClick = e => {};

  render() {
    return (
      <>
        <Wizard2
          ref={this.rr}
          // titleBelow
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
            const state = {
              error: false
            };
            // if (idx === 1) {
            //   state.error = true;
            // }
            return (
              <Step
                key={idx}
                title={item.title}
                description={item.description}
                // onClick={handleLinearClick}
                {...state}
              />
            );
          })}
        </Wizard2>
        {/* <div>
          <Button type="ghost" kind="button">
            Back
          </Button>
          <Button type="primary" kind="button">
            Next
          </Button>
        </div> */}
      </>
    );
  }
}

export default WizardExample;
