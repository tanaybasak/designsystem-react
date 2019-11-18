import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Accordion', module).add(
  'basic',
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
      text: 'Description About Accordion Component'
    }
  }
);
