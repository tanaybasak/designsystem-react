import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, number } from '@storybook/addon-knobs';
//@update-path-build-start
import { Breadcrumb, BreadcrumbItem } from './index';
//@update-path-build-end

storiesOf('Components/Breadcrumb', module)
  .add(
    'default',
    () => {
      return (
        <Breadcrumb
          id="small-navigator"
          className="custom-breadcrumb-top"
          activeIndex={1}
          displayMax={number('display Max', 3)}
          onSelection={action('breadcrumb selection')}
        >
          <BreadcrumbItem itemClass="custom-item" href="#">
            {text('Label 1', 'Breadcrumb 1')}
          </BreadcrumbItem>
          <BreadcrumbItem href="#">
            {text('Label 2', 'Breadcrumb 2')}
          </BreadcrumbItem>
          <BreadcrumbItem href="#tools">
            {text('Label 3', 'Breadcrumb 3')}
          </BreadcrumbItem>
        </Breadcrumb>
      );
    },
    {
      info: {
        text: `Description About Breadcrumb Component`,
        document: ['Breadcrumb', 'BreadcrumbItem']
      }
    }
  )
  .add(
    'with overflow',
    () => {
      return (
        <Breadcrumb
          id="small-navigator"
          className="custom-breadcrumb-top"
          activeIndex={0}
          displayMax={number('display Max', 3)}
          onSelection={action('breadcrumb selection')}
        >
          <BreadcrumbItem itemClass="custom-item" href="#">
            {text('Label 1', 'Breadcrumb 1')}
          </BreadcrumbItem>
          <BreadcrumbItem href="#">
            {text('Label 2', 'Breadcrumb 2')}
          </BreadcrumbItem>
          <BreadcrumbItem href="#tools">
            {text('Label 3', 'Breadcrumb 3')}
          </BreadcrumbItem>
          <BreadcrumbItem href="#settings">
            {text('Label 4', 'Breadcrumb 4')}
          </BreadcrumbItem>
        </Breadcrumb>
      );
    },
    {
      info: {
        text: `Description About Breadcrumb Component`,
        document: ['Breadcrumb', 'BreadcrumbItem']
      }
    }
  );
