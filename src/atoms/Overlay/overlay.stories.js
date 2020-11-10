import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Overlay from './Overlay';
import Notification from '../../atoms/Notification/Notification';
//@update-path-build-end

storiesOf('Overlay', module).add(
  'default',
  () => (
    <>
      <button className="hcl-btn hcl-primary" id="targetBtn">
        Target
      </button>
      <Overlay
        showOverlay={boolean('Show Overlay', false)}
        attachElementToBody
        scrollListner
        targetElement={document.getElementById('targetBtn')}
      >
        <Notification
          subtitle="Notification Sub Title"
          title="Notification Title"
          type="info"
          visible
        />
      </Overlay>
    </>
  ),
  {
    info: {
      text: `Description About Overlay Component\n
      
      import { Overlay } from '@patron/patron-react/overlay';
      
      `
    }
  }
);
