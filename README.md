# rollup-plugin-underscorify

### Introduction

The plugin was written for [Backbone]- and [Marionette]-based applications and 
converts [underscore]&nbsp;static templates into template function modules.

### Installation

`npm install rollup-plugin-underscorify --save-dev`

### Build example

```javascript
/* rollup.config.js */

import underscorify from 'rollup-plugin-underscorify';

export default {
  entry: 'index.js',
  plugins: [
    underscorify({
      include: ['**/*.tpl'],
      exclude: ['**/some-other-tpl-file.tpl'],
      variable: 'p'
    })
  ]
};
```

### Plugin options

* **include**: specifies a minimatch pattern to determine the template files 
that are converted to underscore templates (default: `['**/*.tpl']`)

* **exclude**: specifies a minimatch pattern to determine the template files
that are ignored by the plugin (default: `undefined`)

* **variable**: sets a namespace variable that is used within a template 
function to access other data objects passed to the function (default value: 
`'p'` [short for parameters])

### Caveats and examples

#### Use of namespace variable within templates is <u>required</u>

Compiled underscore templates use `with` statement internally to scope local 
variables to the passed data object.  However, the `with` clause fails the 
ES2015 `'use strict';` mode.  This is why the use namespace of variable within 
templates (processed by this plugin) is required to asure that passed data can 
be correctly accessed.

For example, the following data object is passed to the template function:

```javascript
let data = {
  username: 'username',
  city: 'Blacksburg, VA'
};
```

Within a template, `username` and `city` properties are accessed through the 
namespace variable (i.e., `p` or whatever a developer sets it to be):

```tpl
<h2>Welcome <%= p.username %></h2>
<h3>Upcoming events in <a href = "..."><%= p.city %></a></h3>
```

#### Any library instance used within a template, must be passed to the template's function <u>explicitly</u>

Because of the way [rollup]&nbsp;and its related modules (e.g., 
[rollup-plugin-commonjs]) bundle and include imported code, there is no 
guarantee that `import _ from 'underscore';` statement will include `underscore`
library as either `_` or `underscore` variable within an ES5-type function
scope.  If `underscore` or some other library is used within a template, then
it must be explicitly passed to the template's function.

For example, the following template generates a list of links by iterating over
a passed links collection:

```tpl
<ul>
  <% p._.each(p.links, function(address, name) { %>
    <li><a href = "<%= address %>"><%= name %></a></li>
  <% }); %>
</ul>
```
**Note** that even the `_` instance is prefixed with a namespace variable.

To pass, the underscore library to the template function, the following could be 
done:

```javascript
import $        from 'jquery';
import _        from 'underscore';
import linksTpl from './links.tpl';

let tplObject = {
  _,
  links: {
    'recent blog posts': 'http://www.example.com/recent-blogs',
    'online shop': 'http://www.example.com/shop'
  }
};
let html = linksTpl(tplObject);

$('#side-bar').append(html);
```

When working with frameworks such as [Backbone]&nbsp;or [Marionette]&nbsp;that 
would invoke template functions themselves when rendering a view, either a 
template function, a view constructor, or a `serializeData` method should to be 
overridden (in some way) to inject required library instances into the template.

[Backbone]: http://backbonejs.org/
[Marionette]: http://marionettejs.com/
[underscore]: http://underscorejs.com/
[rollup]: http://rollupjs.org/
[rollup-plugin-commonjs]: https://github.com/rollup/rollup-plugin-commonjs
