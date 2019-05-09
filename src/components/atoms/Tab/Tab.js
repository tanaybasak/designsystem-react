import React, { createContext } from 'react';

const context = createContext({});

const { Provider, Consumer } = context;

const Tab = (props) => (
    <Consumer>
        {() => (props.children)}
    </Consumer>
);

const TabPanel = (props) => (
    <Consumer>
        {() => (props.children)}
    </Consumer>
);


export { Tab, TabPanel };