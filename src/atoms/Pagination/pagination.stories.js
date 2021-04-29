import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, number, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Pagination from './Pagination';
//@update-path-build-end

const items = [20, 50, 70, 80, 90];

const position = {
  left: ['itemsPerPageSelection', 'itemsPerPageInfo', 'pageNumberSelection'],
  right: ['pageNumberInfo']
};

storiesOf('Components/Pagination', module)
  .add(
    'default',
    () => (
      <Pagination
        itemsPerPageText={text('Items Per Page Text', 'Items per Page:')}
        pagePrepositionText={text('Page Preposition Text', 'of')}
        itemsPerPageInfoText={text('Items Per Page Info Text', 'items')}
        pageNumberInfoText={text('Page Number Info Text', 'pages')}
        itemsStepperLimit={number('Items Per Page Limit', 100)}
        onItemsPerPageChange={action('item per page change')}
        itemsPerPageStepper={number('Items Per Page Stepper', 20)}
        itemsPerPageToSelect={number('Items Per Page Selected', 40)}
        onPageChange={action('page change')}
        noItemDisplayText={text('NoItemText', 'Zero item to display')}
        totalItems={number('Total Items', 103)}
        currentPage={number('current page', 2)}
      />
    ),
    {
      info: {
        text: `Description About Pagination Component`,
        document: ['Pagination']
      }
    }
  )
  .add(
    'custom pagination',
    () => (
      <Pagination
        itemsPerPageText={text('Items Per Page Text', 'Items per Page:')}
        pagePrepositionText={text('Page Preposition Text', 'of')}
        itemsPerPageInfoText={text('Items Per Page Info Text', 'items')}
        pageNumberInfoText={text('Page Number Info Text', 'pages')}
        itemsStepperLimit={number('Items Per Page Limit', 100)}
        position={object('Position', position)}
        itemsValuesPerPage={object('Options', items)}
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
        text: `Description About Pagination Component`,
        document: ['Pagination']
      }
    }
  );
