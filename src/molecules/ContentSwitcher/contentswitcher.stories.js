import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
//@update-path-build-start
import ContentSwitcher from './ContentSwitcher';
import Switch from './Switch';
//@update-path-build-end
import icons from '../../../.storybook/iconList';

storiesOf('ContentSwitcher', module)
    .add(
        'default',
        () => (
            <ContentSwitcher onChange={action('ContentSwitch-onChange')}>
                <Switch
                    role="tab"
                    label={text('Label 1', 'All')}
                    isDisabled={boolean('Disabled', false)}
                    onClick={action('switch-onClick')}
                />
                <Switch
                    role="tab"
                    label={text('Label 2', 'Cybernetics')}
                    isDisabled={boolean('Disabled', false)}
                    onClick={action('switch-onClick')}
                />
                <Switch
                    role="tab"
                    label={text('Label 3', 'Information and Communication')}
                    isDisabled={boolean('Disabled', false)}
                    onClick={action('switch-onClick')}
                />
            </ContentSwitcher>
        ),
        {
            info: {
                text: `Description About ContentSwitcher Component \n

      import { ContentSwitcher, Switch } from '@patron/patron-react/contentswitcher'`
            }
        }
    )
    .add(
        'with icons',
        () => (
            <ContentSwitcher onChange={action('ContentSwitch-onChange')}>
                <Switch
                    role="tab"
                    label={text('Label 1', 'All')}
                    icon={
                        <i
                            className={`pi pi-${select('Icon 1', icons, 'audio')}`}
                        />
                    }
                    isDisabled={boolean('Disabled 1', false)}
                    onClick={action('switch-onClick')}
                />
                <Switch
                    role="tab"
                    label={text('Label 2', 'Cybernetics')}
                    icon={
                        <i
                            className={`pi pi-${select('Icon 2', icons, 'blog')}`}
                        />
                    }
                    isDisabled={boolean('Disabled 2', false)}
                    onClick={action('switch-onClick')}
                />
                <Switch
                    role="tab"
                    label={text('Label 3', 'Information and Communication')}
                    icon={
                        <i
                            className={`pi pi-${select('Icon 3', icons, 'calendar')}`}
                        />
                    }
                    isDisabled={boolean('Disabled 3', false)}
                    onClick={action('switch-onClick')}
                />
            </ContentSwitcher>
        ),
        {
            info: {
                text: `Description About ContentSwitcher Component \n

      import {ContentSwitcher, Switch } from '@patron/patron-react/contentswitcher'`
            }
        }
    );
