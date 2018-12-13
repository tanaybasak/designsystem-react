import React, { Component } from 'react';
import { Accordion, AccordionTab } from '../dist/Accordion';

class App extends Component {
    render() {
        return (
            <Accordion
                expandAll="false"
                accordionId="test"
                activeIndex="0"
                onTabChange={()=> {}}
            >
                <AccordionTab header="Header I">
                <div>Content 1</div>
                </AccordionTab>
                <AccordionTab header="Header II">
                    Content II
                </AccordionTab>
            </Accordion>

        )
    }
}

export default App;