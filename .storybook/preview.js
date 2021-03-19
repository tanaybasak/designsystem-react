import { addDecorator, addParameters } from '@storybook/react';
import Container from './Container';
export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical'
    }
  }
};

addDecorator((story, config) => {
  return <Container story={story} config={config} />;
});

addParameters({
  a11y: {
    element: '#component-demo'
  }
});
