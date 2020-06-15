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
                label={text('Label', 'Checkbox Label')}
                disabled={boolean('Disabled', false)}
                onChange={action(event)}
                value="check1"
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
                    label={text('Label 1', 'Checkbox Label 1')}
                    onChange={action(event)}
                    disabled={boolean("Disabled", false)}
                    value="check1"
                />
                <Checkbox
                    id="checkbox2"
                    label={text('Label 2', 'Checkbox Label 2')}
                    checked
                    onChange={action(event)}
                    disabled={boolean("Disabled", false)}
                    value="check2"

                />
                <Checkbox
                    id="checkbox3"
                    label={text('Label 3', 'Checkbox Label 3')}
                    value="check3"
                    disabled
                />
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
                    label={text('Label 1', 'Checkbox Label 1')}
                    onChange={action(event)}
                    disabled={boolean("Disabled", false)}
                    value="check1"
                />
                <Checkbox
                    id="checkbox2"
                    label={text('Label 2', 'Checkbox Label 2')}
                    checked
                    onChange={action(event)}
                    disabled={boolean("Disabled", false)}
                    value="check2"
                />
                <Checkbox
                    id="checkbox3"
                    label={text('Label 3', 'Checkbox Label 3')}
                    disabled
                    value="check3"
                />
            </div>
        ),
        {
            info: {
                text: `Description About Checkbox Component \n
  
        import { Checkbox } from '@patron/patron-react/checkbox'`
            }
        }
    );
