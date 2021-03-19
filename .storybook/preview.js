import { addDecorator , addParameters } from "@storybook/react";
import Container from "./Container";
import "@patron/patron-css/patron/index.css";
import "@patron/patron-icon/dist/patron-font.css";
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
      element: "#component-demo"
    }
  });

// .storybook/preview.js


