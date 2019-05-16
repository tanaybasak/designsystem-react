# Tab Component

Tabs are used to quickly navigate between views within the same context.

## Usage
```
    <Tabs activeIndex={1} onSelectionChange={(e) => {console.log(e.label)}}>
        <Tab label='Tab List 1' isDisabled={true}>Content 1</Tab>
        <Tab label='Tab List 2'>Content 2</Tab>
        <Tab label='Tab List 3'>Content 3</Tab>
    </Tabs>
```

## **Properties for Tabs**

| Name | Type | Default | Description
| --- | --- | --- | --- |
| activeIndex | number | Optional | The Tab to be selected by default.
| onSelectionChange | Event | Optional | To get selected label text, Tab index.

## **Properties for Tab**

| Name | Type | Default | Description
| --- | --- | --- | --- |
| label | string | '' | Text to be displayed in Tab Header.
| isDisabled | bool | false | Tab is disabled or not.
| onClick | func | false | Tab is disabled or not.