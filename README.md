# smarti.grid.js

<b>JQuery grid</b>

* Sorting (custom sorting field)
* Scrolling (columns autowidth ability)
* Selecting (single, multiple, checkbox)
* Grouping (multiple headers and footers ability)
* Aggregates (sum, count, min, max, avg, first, last, value)
* Native configuration and templates (multirow ability)
* Ability to apply custom layout, css style or theme
* Custom html attributes dependent on data
* Ability to render custom content by native javascript
* Data formatting with smarti.to.js

<b>Dependency:</b> <a href="https://github.com/onitecsoft/smarti.to.js">smarti.to.js</a>

<b>JSBin:</b> <a href="https://jsbin.com/tuxuvo/edit?html,output">https://jsbin.com/tuxuvo/edit?html,output</a>

<b>Structure:</b>
```html
<div ...> - container
  <table>
    <thead> - header
      <tr>
        <th ...>...</th>
        <th ...>...</th>
      </tr>
    </thead>
    <tbody> - body template
      <tr data-group-header="0" data-group-field="..."> - group header template (level=0)
        ...
      </tr>
      <tr data-group-footer="0"> - group footer template (level=0)
        ...
      </tr>
      <tr ...>
        <td ...>...</td>
        <td ...>...</td>
      </tr>
    </tbody>
    <tfoot> - footer
      <tr>
        <td ...>...</td>
        <td ...>...</td>
      </tr>
    </tfoot>
  </table>
</div>
```
<b>Container:</b>

attribute name | description
--- | ---
data-name="..." | name of js instance
data-smarti="grid" | type of js instance (smarti.grid)
data-data="..." | json data (plain json or js variable name)
data-selectable="true \| false \| multiple" | defines if grid is selectable (default: false)
data-select-class="..." | defines css class for selected row
data-scrollable="true \| false" | defines if grid is scrollable (default: false)
data-on-init="function(e){ ... }" | fires when grid is initilized<ul><li>e.sender - current grid js instance</li></ul>
data-on-load="function(e){ ... }" | fires when data is rendered<ul><li>e.sender - current grid js instance</li></ul>
data-on-select="function(e){ ... }" | fires when user changes selection<ul><li>e.sender - current grid js instance</li><li>e.tr - jquery row object</li><li>e.selected - shows if current row is selected</li><li>e.item - current row data item</li></ul>

<b>Header and footer (attributes apply to any inner element):</b>

attribute name | description
--- | ---
data-sort-field="..." | sorting field name
data-sort="asc \| desc" | initial sorting
data-aggregate="sum \| count \| min \| max \| avg \| first \| last \| value" | aggregate function (inner html is used as formatting pattern)
data-field="..." | field name used in aggregate function
data-method="true" | custom content function defined inside of element (example: function(e) { return e.count() }). Argument contain aggregate functions
data-select="true" | "select all" checkbox

<b>Body template (attributes apply to any inner element):</b>

| attribute name                   | description
| -------------------------------- | -----------------------------------------
| data-attr="function(e){ ... }"   | custom attribute function, returns html attributes in json format (example: function(e) { if(e.ID==1) return {style:'color:red'} }). Argument contain current row data item
| data-select="true"               | "select" checkbox
| data-field="..."                 | bound field name (inner html is used as formatting pattern)
| data-method="true"               | custom content function defined inside of element (example: function(e) { return e.ID }). Argument contain current row data item

<b>Group header and footer templates (attributes apply to any inner element):</b>

attribute name | description
--- | ---
data-group-header="0" | defines group header template at level=0
data-group-field="..." | grouped by data field
data-group-footer="0" | defines group footer template at level=0
data-attr="function(e){ ... }" | custom attribute function, returns html attributes in json format (example: function(e) { if(e.ID==1) return {style:'color:red'} }). Argument contain aggregate functions
data-aggregate="sum \| count \| min \| max \| avg \| first \| last \| value" | aggregate function (inner html is used as formatting pattern)
data-field="..." | field name used in aggregate function
data-method="true" | custom content function defined inside of element (example: function(e) { return e.count() }). Argument contain aggregate functions

<b>Smarit.grid members</b>

member | description
--- | --- | ---
init() | initializes grid (launch automatically on page load)
load(data) | renders data into grid (argument is optional)
selectAll(true \| false) | select \| unselect all rows
select(jq, toggle) |
