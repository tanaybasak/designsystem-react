# Tab Component

Tabs are used to quickly navigate between views within the same context.

# Usage
```
    <Tabs initialValue="tab2" onSelectionChange={ (e) => console.log(e)}>
        <TabList>
            <Tab name="tab1" isDisabled={true} label="Tab Label 1"></Tab>
            <Tab name="tab2" label="Tab Label 2"></Tab>
            <Tab name="tab3" label="Tab Label 3"></Tab>
        </TabList>
        <TabContent>
            <TabPanel name="tab1">
                <p>Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.</p>
            </TabPanel>
            <TabPanel name="tab2">
                <p>React has powerful composition model, and we recommend using composition to reuse code between components.</p>
            </TabPanel>
            <TabPanel name="tab3">
                <p>Several components need to reflect the same changing data.</p>
            </TabPanel>
        </TabContent>
    </Tabs>
```