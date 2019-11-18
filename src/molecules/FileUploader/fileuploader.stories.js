import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import FileUploader from './FileUploader';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const classOptions = {
  Primary: 'hcl-btn hcl-primary',
  'Primary Danger': 'hcl-btn hcl-primary hcl-danger',
  'Primary Danger Small': 'hcl-btn hcl-primary hcl-danger hcl-sm',
  'Primary Small': 'hcl-btn hcl-primary hcl-sm',
  Secondary: 'hcl-btn hcl-secondary',
  'Secondary Danger': 'hcl-btn hcl-secondary hcl-danger',
  'Secondary Danger Small': 'hcl-btn hcl-secondary hcl-danger hcl-sm',
  Ghost: 'hcl-btn hcl-ghost'
};

storiesOf('FileUploader', module).add(
  'basic',
  () => (
    <FileUploader
      className={select(
        'Button Type',
        classOptions,
        'hcl-btn hcl-primary hcl-sm'
      )}
      description={text('Description', 'File Uploader Description')}
      disabled={boolean('Disabled', false)}
      fileType={text('File Type', '')}
      id="sample_file_uploader"
      label={text('Label', 'Add File')}
      multiple
      onChange={action('File Uploader OnChange')}
    >
      Add File
    </FileUploader>
  ),
  {
    info: {
      text: 'Description About FileUploader Component'
    }
  }
);
