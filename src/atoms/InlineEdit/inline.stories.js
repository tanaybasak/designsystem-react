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

storiesOf('InlineEdit', module)
  .add(
    'default',
    () => (
      <InlineEdit
        onTextUpdate={action('Inline-TextUpdate')}
        errorMessage={text('Error message', '')}
        onClose={action('Inline-Close')}
        loader={boolean('Loader', false)}
      >
        <TextInput
          value={text('Value', 'Content')}
          data-invalid={boolean('formStatus', false)}
        />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component \n 

    import { InlineEdit } from '@patron/patron-react/inlineedit';
    import { TextInput } from '@patron/patron-react/textinput';
      `
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
        loader={boolean('Loader', false)}
      >
        <Dropdown
          type="top"
          items={items}
          label="Top DropDown"
          selectedItem={items[1].id}
        />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component \n 

    import { InlineEdit } from '@patron/patron-react/inlineedit';
    import { Dropdown } from '@patron/patron-react/dropdown';
      `
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
        loader={boolean('Loader', false)}
      >
        <DateSelector defaultDate={new Date()} />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component \n 

    import { InlineEdit } from '@patron/patron-react/inlineedit';
    import { DateSelector } from '@patron/patron-react/dateselector';
      `
      }
    }
  )
  .add(
    'with custom button',
    () => (
      <InlineEdit
        onTextUpdate={action('Inline-TextUpdate')}
        customIcon={
          <Button type="neutral">
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
        />
      </InlineEdit>
    ),
    {
      info: {
        text: `Description About InlineEdit Component \n 

    import { InlineEdit } from '@patron/patron-react/inlineedit';
    import { Button } from '@patron/patron-react/button';
    import { TextInput } from '@patron/patron-react/textinput';
      `
      }
    }
  );
