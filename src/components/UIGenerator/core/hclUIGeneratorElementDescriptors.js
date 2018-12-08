export default {
    properties: [
        {
            "label": "Textbox",
            "name": "textbox",
            "id": 1,
            "type": "string",
            "path": "textbox",
            "default": "",
            "ui_hint": "textbox"
        },
        {
            "label": "Textarea",
            "name": "textarea",
            "id": 2,
            "type": "string",
            "path": "textarea",
            "default": "",
            "ui_hint": "textarea"
        },
        {
            "label": "Dropdown",
            "name": "dropdown",
            "id": 3,
            "type": "string",
            "path": "dropdown",
            "values": [
                {
                    "value": "item",
                    "label": "Item Properties"
                },
                {
                    "value": "group",
                    "label": "Group Properties"
                },
                {
                    "value": "syntax",
                    "label": "Syntax Properties"
                },
                {
                    "value": "restrictions",
                    "label": "Restrictions"
                },
                {
                    "value": "misc",
                    "label": "Miscellaneous"
                },
                {
                    "value": "where_used",
                    "label": "Where Used"
                }
            ],
            "default": "item",
            "ui_hint": "dropdown"
        },
        {
            "label": "Switch",
            "name": "switch",
            "id": 4,
            "type": "boolean",
            "path": "switch",
            "default": "false",
            "ui_hint": "switch"
        },
        {
            "label": "Radio",
            "name": "radio",
            "id": 5,
            "type": "string",
            "path": "radio",
            "values": [
                {
                    "value": "category",
                    "label": "Category"
                },
                {
                    "value": "group",
                    "label": "Group"
                },
                {
                    "value": "item",
                    "label": "Item"
                }
            ],
            "default": "category",
            "ui_hint": "radio"
        },
        {
            "label": "Table",
            "name": "table",
            "id": 6,
            "type": "table",
            "path": "table",
            "columns": [
                {
                    "label": "First Column",
                    "name": "first_column",
                    "type": "string",
                    "path": "first_column"
                },
                {
                    "label": "Second Column",
                    "name": "second_column",
                    "type": "string",
                    "path": "second_column"
                }
            ],
            "ui_hint": "table"
        }
    ]
};