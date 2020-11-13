import React, { Component } from 'react';
import Checkbox from '../../atoms/Checkbox';
import Tooltip from '../../atoms/Tooltip';

class CheckboxExample extends Component {
  render() {
    return (
      <Tooltip
        content="Breif Definition of the dotted underlined word."
        direction="bottom"
        type="icon"
      >
        <Checkbox
          checked={false}
          className=""
          disabled={false}
          id="checkbox1"
          indeterminate={false}
          label="Checkbox Label"
          onChange={function noRefCheck() {}}
          value="check1"
        />
      </Tooltip>
    );
  }
}

export default CheckboxExample;
