import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Select from './Select';
import SelectItemGroup from './SelectItemGroup';
import SelectItem from './SelectItem';
//@update-path-build-end

const props = {
  select: () => ({
    label: text('Label', 'Select Option'),
    onChange: action('onChange')
  }),
  group: () => ({
    disabled: boolean('Disabled (disabled in <SelectItemGroup>)', false)
  })
};

storiesOf('Select', module).add(
  'default',
  () => (
    <Select {...props.select()} id="selct-id">
      <SelectItem
        value="placeholder-item"
        text="Choose an option"
      />
      <SelectItemGroup label="Category 1" {...props.group()}>
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </SelectItemGroup>
      <SelectItemGroup label="Category 2" {...props.group()}>
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </SelectItemGroup>
    </Select>
  ),
  {
    info: {
      text: `Description About Select Component\n
      import { Select } from '@patron/patron-react/select'\n
      import { SelectItem } from '@patron/patron-react/selectItem'\n
      import { SelectItemGroup } from '@patron/patron-react/selectItemGroup'
      `
    }
  }
);
