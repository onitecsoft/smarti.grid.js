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
```
| attribute name | description |
| --- | --- |
| data-name="..." | name of javascript instance |
| data-smarti="grid" | type of javascript instance (smarti.grid) |
| data-data="..." | json data (plain json or javascript variable name) |
| data-selectable="single|multiple" | defines if grid is selectable |
```
