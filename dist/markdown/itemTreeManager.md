## Objects

<dl>
<dt><a href="#Zotero">Zotero</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ItemTreeColumnDataProvider">ItemTreeColumnDataProvider</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#ItemTreeColumnRenderCell">ItemTreeColumnRenderCell</a> ⇒ <code>HTMLElement</code></dt>
<dd></dd>
</dl>

<a name="Zotero"></a>

## Zotero : <code>object</code>
**Kind**: global namespace  

* [Zotero](#Zotero) : <code>object</code>
    * [.ItemTreeManager](#Zotero.ItemTreeManager)
        * [.registerColumn(option)](#Zotero.ItemTreeManager.registerColumn) ⇒ <code>string</code> \| <code>false</code>
        * ~~[.registerColumns()](#Zotero.ItemTreeManager.registerColumns)~~
        * [.unregisterColumn(dataKey)](#Zotero.ItemTreeManager.unregisterColumn) ⇒ <code>boolean</code>
        * ~~[.unregisterColumns()](#Zotero.ItemTreeManager.unregisterColumns)~~
        * [.refreshColumns()](#Zotero.ItemTreeManager.refreshColumns) ⇒ <code>void</code>

<a name="Zotero.ItemTreeManager"></a>

### Zotero.ItemTreeManager
Manages item tree APIs.

**Kind**: static property of [<code>Zotero</code>](#Zotero)  

* [.ItemTreeManager](#Zotero.ItemTreeManager)
    * [.registerColumn(option)](#Zotero.ItemTreeManager.registerColumn) ⇒ <code>string</code> \| <code>false</code>
    * ~~[.registerColumns()](#Zotero.ItemTreeManager.registerColumns)~~
    * [.unregisterColumn(dataKey)](#Zotero.ItemTreeManager.unregisterColumn) ⇒ <code>boolean</code>
    * ~~[.unregisterColumns()](#Zotero.ItemTreeManager.unregisterColumns)~~
    * [.refreshColumns()](#Zotero.ItemTreeManager.refreshColumns) ⇒ <code>void</code>

<a name="Zotero.ItemTreeManager.registerColumn"></a>

#### ItemTreeManager.registerColumn(option) ⇒ <code>string</code> \| <code>false</code>
Register a custom column, must be valid with a unique dataKey.

Note that the `dataKey` you use here may be different from the one returned by the function.
This is because the `dataKey` is prefixed with the `pluginID` to avoid conflicts after the column is registered.

**Kind**: static method of [<code>ItemTreeManager</code>](#Zotero.ItemTreeManager)  
**Returns**: <code>string</code> \| <code>false</code> - - The dataKey of the added column or false if no column is added  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| option | <code>Object</code> |  | An option or array of options to register |
| option.dataKey | <code>string</code> |  | Required, see use in ItemTree#_getRowData() |
| option.label | <code>string</code> |  | The column label. Either a string or the id to an i18n string. |
| option.pluginID | <code>string</code> |  | Set plugin ID to auto remove column when plugin is removed. |
| [option.enabledTreeIDs] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Which tree ids the column should be enabled in. If undefined, enabled in main tree. If ["*"], enabled in all trees. |
| [option.defaultIn] | <code>Array.&lt;string&gt;</code> |  | Will be deprecated. Types of trees the column is default in. Can be [default, feed]; |
| [option.disabledIn] | <code>Array.&lt;string&gt;</code> |  | Will be deprecated. Types of trees where the column is not available |
| [option.sortReverse] | <code>boolean</code> | <code>false</code> | Default: false. Set to true to reverse the sort order |
| [option.flex] | <code>number</code> | <code>1</code> | Default: 1. When the column is added to the tree how much space it should occupy as a flex ratio |
| [option.width] | <code>string</code> |  | A column width instead of flex ratio. See above. |
| [option.fixedWidth] | <code>boolean</code> |  | Default: false. Set to true to disable column resizing |
| [option.staticWidth] | <code>boolean</code> |  | Default: false. Set to true to prevent columns from changing width when the width of the tree increases or decreases |
| [option.noPadding] | <code>boolean</code> |  | Set to true for columns with padding disabled in stylesheet |
| [option.minWidth] | <code>number</code> |  | Override the default [20px] column min-width for resizing |
| [option.iconLabel] | <code>React.Component</code> |  | Set an Icon label instead of a text-based one |
| [option.iconPath] | <code>string</code> |  | Set an Icon path, overrides {iconLabel} |
| [option.htmlLabel] | <code>string</code> \| <code>React.Component</code> |  | Set an HTML label, overrides {iconLabel} and {label}. Can be a HTML string or a React component. |
| [option.showInColumnPicker] | <code>boolean</code> | <code>true</code> | Default: true. Set to true to show in column picker. |
| [option.columnPickerSubMenu] | <code>boolean</code> | <code>false</code> | Default: false. Set to true to display the column in "More Columns" submenu of column picker. |
| [option.primary] | <code>boolean</code> |  | Should only be one column at the time. Title is the primary column |
| [option.dataProvider] | [<code>ItemTreeColumnDataProvider</code>](#ItemTreeColumnDataProvider) |  | Custom data provider that is called when rendering cells |
| [option.renderCell] | [<code>ItemTreeColumnRenderCell</code>](#ItemTreeColumnRenderCell) |  | The cell renderer function |
| [option.zoteroPersist] | <code>Array.&lt;string&gt;</code> |  | Which column properties should be persisted between zotero close |

<a name="Zotero.ItemTreeManager.registerColumns"></a>

#### ~~ItemTreeManager.registerColumns()~~
***Deprecated***

**Kind**: static method of [<code>ItemTreeManager</code>](#Zotero.ItemTreeManager)  
<a name="Zotero.ItemTreeManager.unregisterColumn"></a>

#### ItemTreeManager.unregisterColumn(dataKey) ⇒ <code>boolean</code>
Unregister a custom column.

**Kind**: static method of [<code>ItemTreeManager</code>](#Zotero.ItemTreeManager)  
**Returns**: <code>boolean</code> - - true if the column was unregistered, false if the column was not found  

| Param | Type | Description |
| --- | --- | --- |
| dataKey | <code>string</code> | The dataKey of the column to unregister |

<a name="Zotero.ItemTreeManager.unregisterColumns"></a>

#### ~~ItemTreeManager.unregisterColumns()~~
***Deprecated***

**Kind**: static method of [<code>ItemTreeManager</code>](#Zotero.ItemTreeManager)  
<a name="Zotero.ItemTreeManager.refreshColumns"></a>

#### ItemTreeManager.refreshColumns() ⇒ <code>void</code>
Refresh the columns in the item tree

**Kind**: static method of [<code>ItemTreeManager</code>](#Zotero.ItemTreeManager)  
<a name="ItemTreeColumnDataProvider"></a>

## ItemTreeColumnDataProvider ⇒ <code>string</code>
**Kind**: global typedef  
**Returns**: <code>string</code> - - The data to display in the column  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Zotero.Item</code> | The item to get data from |
| dataKey | <code>string</code> | The dataKey of the column |

<a name="ItemTreeColumnRenderCell"></a>

## ItemTreeColumnRenderCell ⇒ <code>HTMLElement</code>
**Kind**: global typedef  
**Returns**: <code>HTMLElement</code> - - The HTML to display in the cell  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the row |
| data | <code>string</code> | The data to display in the column |
| column | <code>ItemTreeColumnOptions</code> \| <code>Object</code> | The column options |
| isFirstColumn | <code>boolean</code> | true if this is the first column |
| doc | <code>Document</code> | The document of the item tree |

