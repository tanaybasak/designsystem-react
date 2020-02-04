import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
//@update-path-build-end

storiesOf('Accordion', module).add(
  'default',
  () => (
    <Accordion uncontrolled={boolean('Uncontrolled', false)}>
      <AccordionItem
        onChange={action('Accordion Clicked')}
        title={text('Title 1', 'Accordion Title 1')}
      >
        {text('Content 1', 'Accordion Content 1')}
      </AccordionItem>
      <AccordionItem
        onChange={action('Accordion Clicked')}
        title={text('Title 2', 'Accordion Title 2')}
      >
        {text('Content 2', 'Accordion Content 2')}
      </AccordionItem>
      <AccordionItem
        onChange={action('Accordion Clicked')}
        title={text('Title 3', 'Accordion Title 3')}
      >
        {text('Content 3', 'Accordion Content 3')}
      </AccordionItem>
    </Accordion>
  ),
  {
    info: {
      text: `Description About Accordion Component
      
      import { Accordion, AccordionItem } from 'patron-react/accordion'
      
      `
    }
  }
);
