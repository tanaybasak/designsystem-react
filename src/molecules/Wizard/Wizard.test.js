import React from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Wizard, Step } from './index';
import { act } from 'react-dom/test-utils';

const activeIndex = 1;
const wizardmodel = [
  {
    title: 'Step 1',
    description: 'Basic Info'
  },
  {
    title: 'Step 2',
    description: 'Upload File'
  },
  {
    title: 'Step 3',
    description: 'Add Social Markup'
  },
  {
    title: 'Step 4',
    description: 'Add Campaign details'
  },
  {
    title: 'Step 5',
    description: 'Verify Details'
  }
];

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const timeout = ms => {
  const p1 = new Promise(resolve => setTimeout(resolve, ms));
  return p1
    .then(function () {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const getSteps = model => {
  return model.map((item, idx) => {
    return (
      <Step
        key={idx}
        title={item.title}
        description={item.description}
        status={item.status}
      />
    );
  });
};

const handleClick = e => {
  console.log(e);
};

it('Wizard renders correctly', () => {
  const wizard = renderer
    .create(<Wizard>{getSteps(wizardmodel)}</Wizard>)
    .toJSON();
  expect(wizard).toMatchSnapshot();
});

// it('Wizard has defined steps', async () => {
//   const wizard = mount(<Wizard>{getSteps(wizardmodel)}</Wizard>);
//   //   console.log(wizard.debug());
//   wizard.update();
//   await act(async () => {
//     await timeout(300);
//   });
//   console.log(wizard.find('.wiz-item'));
// });

// it('Wizard - Linear clickability', () => {
//   const wizard = mount(
//     <Wizard activeIndex={activeIndex}>{getSteps(wizardmodel)}</Wizard>
//   ).debug();
//   console.log(wizard);
// });
