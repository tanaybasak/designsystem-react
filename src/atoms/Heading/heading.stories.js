import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
//@update-path-build-start
import Heading from './Heading';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const options = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6'
};
storiesOf('Heading', module).add(
    'basic',
    () => (
        <Heading type={select('Type', options, 'h1')}>
            {text('Label', 'Heading')}
        </Heading>
    ),
    {
        info: {
            text: `Description About Heading Component \n 

      import { Heading } from 'patron-react/heading'`
        }
    }
);
