import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, number } from '@storybook/addon-knobs';
//@update-path-build-start
import Pagination from './Pagination';
//@update-path-build-end

storiesOf('Pagination', module).add(
  'default',
  () => (
    <Pagination
      itemsPerPageStepper={20}
      itemsPerPageText={text('Items Per Page Text', 'Items per Page:')}
      itemsStepperLimit={100}
      onChange={action('on change')}
      onItemsPerPageChange={action('item per page change')}
      onPageChange={action('page change')}
      totalItems={number('Total Items', 103)}
    />
  ),
  {
    info: {
      text: `Description About Pagination Component \n

      import { Pagination } from 'patron-react/pagination'`
    }
  }
);
