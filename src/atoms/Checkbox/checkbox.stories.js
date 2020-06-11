import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Checkbox from './Checkbox';
//@update-path-build-end

storiesOf('Checkbox', module)
    .add(
        'default',
        () => (
            <Checkbox
                id="checkbox1"
                value={text('Value', 'standard')}
                label={text('Label', 'Checkbox Label')}
                disabled={boolean('Disabled', false)}
                onChange={action(event)}
            />
        ),
        {
            info: {
                text: `Description About Checkbox Component \n

      import { Checkbox } from '@patron/patron-react/checkbox'`
            }
        }
    )
    .add(
        'horizontal',
        () => (
            <div className="hcl-checkbox-group">
                <Checkbox
                    id="checkbox1"
                    value={text('Value', 'standard')}
                    label={text('Label', 'Checkbox Label 1')}
                    onChange={action(event)}
                    disabled={boolean("disabled", false)}
                />
                <Checkbox
                    id="checkbox2"
                    label={'Checkbox Label 2'}
                    checked
                    onChange={action(event)}
                />
                <Checkbox id="checkbox3" label="Checkbox Label 3 (disabled)" disabled />
            </div>
        ),
        {
            info: {
                text: `Description About Checkbox Component \n
  
        import { Checkbox } from '@patron/patron-react/checkbox'`
            }
        }
    )
    .add(
        'vertical',
        () => (
            <div className="hcl-checkbox-group hcl-stack-vertical">
                <Checkbox
                    id="checkbox1"
                    value={text('Value', 'standard')}
                    label={text('Label', 'Checkbox Label 1')}
                    onChange={action(event)}
                    disabled={boolean("disabled", false)}
                />
                <Checkbox
                    id="checkbox2"
                    label={'Checkbox Label 2'}
                    checked
                    onChange={action(event)}
                />
                <Checkbox id="checkbox3" label="Checkbox Label 3 (disabled)" disabled />
            </div>
        ),
        {
            info: {
                text: `Description About Checkbox Component \n
  
        import { Checkbox } from '@patron/patron-react/checkbox'`
            }
        }
    );
