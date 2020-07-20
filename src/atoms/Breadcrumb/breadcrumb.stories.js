import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import { Breadcrumb, BreadcrumbItem } from './index';
//@update-path-build-end

storiesOf('Breadcrumb', module)
  .add(
    'default',
    () => {
      return (
        <Breadcrumb
          id="small-navigator"
          className="custom-breadcrumb-top"
          activeIndex={1}
          onSelection={action('breadcrumb selection')}
        >
          <BreadcrumbItem className="custom-item" href="#">
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
        text: `Description About Breadcrumb Component \n 
      
      import { Breadcrumb , BreadcrumbItem } from '@patron/patron-react/breadcrumb';

      `
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
          onSelection={action('breadcrumb selection')}
        >
          <BreadcrumbItem className="custom-item" href="#">
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
        text: `Description About Breadcrumb Component \n 
        
        import { Breadcrumb , BreadcrumbItem } from '@patron/patron-react/breadcrumb';
  
        `
      }
    }
  );
