/* eslint-disable no-console */
import React, { Component } from 'react';
import { Wizard, Step } from '../../molecules/Wizard';
import { User, User2 } from '../../util/icons';

class WizardExample extends Component {
  state = {
    wizardmodel: [
      {
        title: 'Little lillies',
        description: "It's flowering always"
      },
      {
        title: 'Address',
        description: 'Input your present address'
      },
      {
        title: 'Card',
        description: 'Enter your card details'
      },
      {
        title: 'Alternate Contact',
        description: 'Alternate Contact'
      },
      {
        title: 'Alternate Contact',
        description: 'Alternate Contact'
      },
      {
        title: 'Alternate Contact',
        description: 'Alternate Contact'
      }
    ]
  };

  render() {
    return (
        <Wizard activeIndex={0}>
          <Step title="hello" description="Boy" icon={User} />
          <Step title="hello2" description="Boy2" />
          <Step
            title="hello2"
            description="Boy2"
            iconClass="p-hclsw p-hclsw-user"
            icon={User2}
          />
        </Wizard>
    );
  }
}

export default WizardExample;
