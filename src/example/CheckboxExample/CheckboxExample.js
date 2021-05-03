import React, { Component } from 'react';
import Checkbox from '../../atoms/Checkbox';
import { RadioGroup, Radio } from '../../atoms/Radio';

class CheckboxExample extends Component {
  render() {
    return (
      <>
        <Checkbox
          checked={false}
          className=""
          disabled={false}
          tooltipTitle="Breif Definition of the dotted underlined word."
          id="checkbox1"
          indeterminate={false}
          label="Checkbox Label"
          onChange={function noRefCheck() {}}
          value="check1"
        />
        <RadioGroup
          orientation="vertical"
          defaultSelected="35"
          onChange={(checkedVal, e) => {
            console.log('RadioGroup', checkedVal, e);
          }}
        >
          <Radio
            id="RadioBtn1"
            tooltipTitle="1 (default)"
            labelText="1 (default)"
            value="35"
            name="RadioBtn1"
          />
          <Radio
            id="RadioBtn2"
            name="RadioBtn2"
            tooltipTitle="2 (default)"
            labelText="2"
            value="45"
          />
          <Radio id="RadioBtn3" labelText="3 (disabled)" value="30" />
        </RadioGroup>
      </>
    );
  }
}

export default CheckboxExample;
