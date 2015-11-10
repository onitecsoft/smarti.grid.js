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
data-on-init="function(e){ ... }" | event handler after grid initilization<br>
arguments:
* e.sender - current grid js instance
data-on-load="function(e){ ... }" | event handler after data is rendered<br>
arguments:
* e.sender - current grid js instance
data-on-select="function(e){ ... }" |
