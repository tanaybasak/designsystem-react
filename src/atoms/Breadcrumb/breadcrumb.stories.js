import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, number } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Breadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Breadcrumb', module).add(
  'basic',
  () => {
    return (
      <Breadcrumb
        id="small-navigator"
        className="custom-breadcrumb-top"
        activeIndex={1}
        onSelection={action('breadcrumb selection')}
      >
        <BreadcrumbItem className="custom-item" href="#">
          {text('Breadcrumb 1 Label', 'Breadcrumb 1')}
        </BreadcrumbItem>
        <BreadcrumbItem href="#">
          {text('Breadcrumb 2 Label', 'Breadcrumb 2')}
        </BreadcrumbItem>
        <BreadcrumbItem href="#tools">
          {text('Breadcrumb 3 Label', 'Breadcrumb 3')}
        </BreadcrumbItem>
      </Breadcrumb>
    );
  },
  {
    info: {
      text: 'Description About Breadcrumb Component'
    }
  }
);
