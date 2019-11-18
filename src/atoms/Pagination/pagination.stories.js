import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, number, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Pagination from './Pagination';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Pagination', module).add(
  'basic',
  () => (
    <Pagination
      itemsPerPageStepper={20}
      itemsPerPageText={text('Items Per Page Text', 'Items per Page:')}
      itemsStepperLimit={100}
      onChange={action('on change')}
      onItemsPerPageChange={action('item per page change')}
      onPageChange={action('page change')}
      pageSizes={object('Page Size', [5, 10, 20])}
      totalItems={number('Total Items', 103)}
    />
  ),
  {
    info: {
      text: 'Description About Pagination Component'
    }
  }
);
