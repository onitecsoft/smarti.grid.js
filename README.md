# smarti.grid.js ´´´´Deprecated´´´´

<b>Fluent JQuery grid with pure html,css and javascript configuration</b>

* Data binding with json
* Sorting (custom sorting field)
* Scrolling (columns autowidth ability)
* Selecting (single, multiple, checkbox)
* Filtering (any filter in any place)
* Grouping (multiple headers and footers ability)
* Aggregates (sum, count, min, max, avg, first, last, value)
* Native configuration and templates (multirow ability)
* Ability to apply custom layout, css style or theme
* Dynamic html attributes dependent on data
* Custom content generating by native javascript
* Data formatting with smarti.to.js

Automatically initializes when page is loaded. If content was loaded within ajax request, call JQuery extension method `smarti()` on container: `$(container).smarti();`

<b>Dependency:</b> <a href="https://github.com/onitecsoft/smarti.to.js">smarti.to.js</a>

<b>Examples:</b> <a href="http://www.onitecsoft.com/smarti/grid">http://www.onitecsoft.com/smarti/grid</a>

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
      <tr ...> - row template (can be multiple rows)
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
data-filters="{ name1: function(e){ ... }, name2: function(e){ ... } }" | initial filters represented as json object of key-value pairs;<br/>function must return boolean result if its argument (data item) passed filtering;<br/>all filters are concatenated with `and` operator
data-on-init="function(e){ ... }" | fires when grid is initilized<ul><li>e.sender - current grid js instance</li></ul>
data-on-load="function(e){ ... }" | fires when data is rendered<ul><li>e.sender - current grid js instance</li></ul>
data-on-select="function(e){ ... }" | fires when user changes selection<ul><li>e.sender - current grid js instance</li><li>e.tr - jquery row object</li><li>e.selected - shows if current row is selected</li><li>e.item - current row data item</li></ul>
data-on-click="function(e){ ... }" | fires when user clicks row<ul><li>e.sender - current grid js instance</li><li>e.tr - clicked row jquery object</li><li>e.item - clicked row data item</li></ul>

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
| data-attr="function(e){ ... }"   | custom attribute function, returns html attributes in json format (example: function(e) { if(e.ID==1) return {style:'color:red'} }). Argument represent current row data item
| data-select="true"               | "select" checkbox (if applied to \<tr\> then selectable by rowclick)
| data-field="..."                 | bound field name (inner html is used as formatting pattern)
| data-method="true"               | custom content function defined inside of element (example: function(e) { return e.ID }). Argument represent current row data item

<b>Group header and footer templates (attributes apply to any inner element):</b>

attribute name | description
--- | ---
data-group-header="0" | defines group header template at level=0
data-group-field="..." | grouped by data field
data-group-footer="0" | defines group footer template at level=0
data-attr="function(e){ ... }" | custom attribute function, returns html attributes in json format (example: function(e) { if(e.count()>10) return {style:'color:red'} }). Argument contain aggregate functions
data-aggregate="sum \| count \| min \| max \| avg \| first \| last \| value" | aggregate function (inner html is used as formatting pattern)
data-field="..." | field name used in aggregate function
data-method="true" | custom content function defined inside of element (example: function(e) { return e.count() }). Argument contain aggregate functions

<b>Smarti.grid members</b>

member | description
--- | --- | ---
init() | initialize grid (launch automatically on page load)
load(data) | render data into grid (argument is optional)
selectAll(true \| false) | select \| unselect all rows
select(JqObject, toggle) | select rows corresponding to JqObject. If toggle==true, then toggle selection
selectedItems() | return array of items corresponding to selected rows
sort(fieldName) | sort grid by field name
filter({ name1: function(e){ ... }, name2: null }) | add new, update or clear existing filters (pass `null` to clear), grid automatically reload
data | array of data
selectClass | css class name of selected row
headerTemplate | JQuery object of header. Init() have to be called after editing
footerTemplate | JQuery object of footer. Init() have to be called after editing
rowTemplate | JQuery object of body template. Init() have to be called after editing
groupHeaderTemplate | JQuery object of group header template. Init() have to be called after editing
groupFooterTemplate | JQuery object of group footer template. Init() have to be called after editing
