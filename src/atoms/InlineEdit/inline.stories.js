import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
//@update-path-build-start
import InlineEdit from './InlineEdit';
import Button from '../../atoms/Button';
import TextInput from '../TextInput';
import Dropdown from '../Dropdown';
import DateSelector from '../../molecules/DateSelector';
//@update-path-build-end
import icons from '../../../.storybook/iconList';

const items = [
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
  }
];

storiesOf('Components/Inline Edit', module)
  .add(
    'default',
    () => (
      <InlineEdit
        onTextUpdate={action('Inline-TextUpdate')}
        errorMessage={text('Error message', '')}
        onClose={action('Inline-Close')}
        loader={boolean('Loader', false)}
        disableSave={boolean('disableSave', false)}
        disableClose={boolean('disableClose', false)}
      >
        <TextInput
          value={text('Value', 'Content')}
          onChange={action('Inline-Onchange')}
          data-invalid={boolean('formStatus', false)}
          aria-label="Inline edit"
        />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component`,
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        document: ['InlineEdit'],
        internal: ['TextInput']
      }
    }
  )
  .add(
    'with dropdown',
    () => (
      <InlineEdit
        onTextUpdate={action('Inline-TextUpdate')}
        errorMessage={text('Error message', '')}
        onClose={action('Inline-Close')}
        disableSave={boolean('disableSave', false)}
        disableClose={boolean('disableClose', false)}
        loader={boolean('Loader', false)}
      >
        <Dropdown
          type="top"
          items={items}
          onChange={action('Inline-Onchange')}
          label="Top DropDown"
          selectedItem={items[1].id}
        />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component`,
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        document: ['InlineEdit'],
        internal: ['Dropdown']
      }
    }
  )
  .add(
    'with date picker',
    () => (
      <InlineEdit
        onTextUpdate={action('Inline-TextUpdate')}
        errorMessage={text('Error message', '')}
        onClose={action('Inline-Close')}
        disableSave={boolean('disableSave', false)}
        disableClose={boolean('disableClose', false)}
        loader={boolean('Loader', false)}
      >
        <DateSelector
          defaultDate={new Date()}
          onChange={action('Inline-Onchange')}
        />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component`,
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        document: ['InlineEdit'],
        internal: ['DateSelector']
      }
    }
  )
  .add(
    'with custom button',
    () => (
      <InlineEdit
        onTextUpdate={action('Inline-TextUpdate')}
        customIcon={
          <Button type="neutral" aria-label="Custom Action">
            <i
              className={`p-hclsw p-hclsw-${select(
                'Icon Class',
                icons,
                'user'
              )}`}
            />
          </Button>
        }
        errorMessage={text('Error message', '')}
        onClose={action('Inline-Close')}
        loader={boolean('Loader', false)}
      >
        <TextInput
          value={text('Value', 'Content')}
          data-invalid={boolean('formStatus', false)}
          aria-label="Inline edit"
        />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component`,
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        document: ['InlineEdit'],
        internal: ['Button', 'TextInput']
      }
    }
  );
