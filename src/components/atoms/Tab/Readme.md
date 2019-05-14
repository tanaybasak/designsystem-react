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

> Properties for Tabs

| Name | Type | Default | Description
| --- | --- | --- | --- |
| initialValue | string | required | The Tab to be selected by default.

> Properties for Tab

| Name | Type | Default | Description
| --- | --- | --- | --- |
| name | string | required | Name of Each Tab to distinguish.
| label | string | required | Text to be displayed in Tab Header.
| isDisabled | bool | false | Tab is disabled or not.

> Properties for TabPanel

| Name | Type | Default | Description
| --- | --- | --- | --- |
| name | string | required | Name of Tab Content to Link with each Tab.






