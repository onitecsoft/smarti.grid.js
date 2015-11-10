# smarti.grid.js

JQuery grid

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

Dependency: <a href="https://github.com/onitecsoft/smarti.to.js">smarti.to.js</a>

Structure:
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
