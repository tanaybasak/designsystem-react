/* eslint-disable no-console */
import React, { Component } from 'react';
import { Wizard2, Wizard, Step } from '../../molecules/Wizard';
import { User, User2 } from '../../util/icons';

class WizardExample extends Component {
  state = {
    selIndex: 0,
    wizardmodel: [
      {
        title: 'Little lillies Little lillies Little lillies',
        description: "It's flowering always"
      },
      {
        title: 'Address',
        description: 'Input your present address'
      }
      // {
      //   title: 'Card',
      //   description: 'Enter your card details'
      // },
      // {
      //   title: 'Alternate Contact',
      //   description: 'Alternate Contact'
      // },
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

  render() {
    return (
      <>
        {/* <Wizard
          activeIndex={0}
          direction="horizontal"
          model={this.state.wizardmodel}
        /> */}
        <Wizard2
          activeIndex={this.state.selIndex}
          onChange={(e, idx) => {
            //1. Step by Step
            if (idx === this.state.selIndex + 1)
              this.setState({ ...this.state, selIndex: idx });
            //2. Click anywhere - can also go back.
            // this.setState({ ...this.state, selIndex: idx });
          }}
        >
          <Step
            title="Current Address"
            description="Input your personal address"
          />
          <Step title="Present Address" />
          <Step
            title="Family Details Family Details Family Details"
            description="Input your personal details here"
          />
          <Step
            title="Work Details"
            description="Input your information here"
          />
          <Step
            title="Work Details"
            description="Input your information here"
          />
          <Step
            title="Work Details"
            description="Input your information here"
          />
          {/* <Step
            title="Work Details"
            description="Input your information here"
          />
          <Step
            title="Work Details"
            description="Input your information here"
          />
          <Step
            title="Work Details"
            description="Input your information here"
          />
          <Step
            title="Work Details"
            description="Input your information here"
          /> */}
          {/* <Step
            title="hello2"
            description="Boy2"
            iconClass="p-hclsw p-hclsw-user"
            icon={User2}
          /> */}
        </Wizard2>
      </>
    );
  }
}

export default WizardExample;
