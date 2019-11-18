import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import ContentSwitcher from './ContentSwitcher';
import Switch from './Switch';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('ContentSwitcher', module).add(
  'basic',
  () => (
    <ContentSwitcher onChange={action('ContentSwitch-onChange')}>
      <Switch
        label={text('Switch 1 Label', 'All')}
        iconClass={text('Icon Class 1', '')}
        isDisabled={boolean('Disabled 1', false)}
        onClick={action('switch-onClick')}
      />
      <Switch
        label={text('Switch 2 Label', 'Cybernetics')}
        iconClass={text('Icon Class 2', '')}
        isDisabled={boolean('Disabled 2', false)}
        onClick={action('switch-onClick')}
      />
      <Switch
        label={text('Switch 3 Label', 'Information and Communication')}
        iconClass={text('Icon Class 3', '')}
        isDisabled={boolean('Disabled 3', false)}
        onClick={action('switch-onClick')}
      />
    </ContentSwitcher>
  ),
  {
    info: {
      text: 'Description About ContentSwitcher Component'
    }
  }
);
