import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, number, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Pagination from './Pagination';
//@update-path-build-end

const position = {
  left: ['itemsPerPageSelection', 'itemsPerPageInfo', 'pageNumberSelection'],
  right: ['pageNumberInfo']
};

storiesOf('Pagination', module)
  .add(
    'default',
    () => (
      <Pagination
        itemsPerPageText={text('Items Per Page Text', 'Items per Page:')}
        itemsStepperLimit={number('Items Per Page Limit', 100)}
        onItemsPerPageChange={action('item per page change')}
        itemsPerPageStepper={number('Items Per Page Stepper', 20)}
        itemsPerPageToSelect={number('Items Per Page Selected', 40)}
        onPageChange={action('page change')}
        totalItems={number('Total Items', 103)}
        currentPage={number('current page', 2)}
      />
    ),
    {
      info: {
        text: `Description About Pagination Component \n

      import { Pagination } from '@patron/patron-react/pagination';`
      }
    }
  )
  .add(
    'custom pagination',
    () => (
      <Pagination
        itemsPerPageText={text('Items Per Page Text', 'Items per Page:')}
        itemsStepperLimit={number('Items Per Page Limit', 100)}
        position={object('Position', position)}
        onItemsPerPageChange={action('item per page change')}
        itemsPerPageStepper={number('Items Per Page Stepper', 20)}
        itemsPerPageToSelect={number('Items Per Page Selected', 40)}
        onPageChange={action('page change')}
        totalItems={number('Total Items', 103)}
        currentPage={number('current page', 2)}
      />
    ),
    {
      info: {
        text: `Description About Pagination Component \n

      import { Pagination } from '@patron/patron-react/pagination';`
      }
    }
  );
