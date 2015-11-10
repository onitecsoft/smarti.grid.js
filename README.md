# smarti.grid.js

<b>JQuery grid</b>

* Sorting (custom sorting field)
* Scrolling (autowidth columns ability)
* Selecting (single, multiple, checkbox)
* Grouping (multiple headers and footers ability)
* Aggregates (sum, count, min, max, avg, first, last, value)
* Native configuration and templates (multirow ability)
* Ability to apply custom layout, css style or theme
* Custom html attributes dependent on data
* Native javascript methods for custom content
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

<b>Header and footer (attributes apply to any inner element of \<tr\>):</b>

attribute name | description
--- | ---
data-sort-field="..." | sorting field name
data-sort="asc \| desc" | initial sorting
data-aggregate="sum \| count \| min \| max \| avg \| first \| last \| value" | aggregate function (inner html is used as formatting pattern)
data-field="..." | field name used in aggregate function
data-method="true" | custom content function defined inside of element (example: function(e) { return e.count() }). Argument contain aggregate functions
data-select="true" |

<b>Body template</b>

attribute name | description
--- | ---
data-attr="function(e){ ... }" |
data-select="true" |
data-field="..." |
data-method="true" |
