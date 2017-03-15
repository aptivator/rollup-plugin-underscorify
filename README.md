# rollup-plugin-underscorify

### Introduction

The plugin was written for [Backbone]- and [Marionette]-based applications and 
converts [underscore]&nbsp;templates (included as files) into modules.

### Installation

`npm install rollup-plugin-underscorify --save`

### Usage example

```tpl
  <!-- sample.tpl --> 

  <h2>Welcome <%= data.username %></h2>
```


```javascript
  /* sample.js */

  import Marionette from 'backbone.marionette';
  import sampleTpl  from './sample.tpl';
  
  export default Marionette.ItemView.extend({
    template: sampleTpl
  });
```

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
        variable: 'data'
      })
    ]
  };
```

### Plugin options

* **include**: specifies a minimatch pattern to determine the template files 
that are converted to underscore templates (default: `['**/*.tpl']`)

* **exclude**: specifies a minimatch pattern to determine the template files
that are ignored by the plugin (default: `undefined`)

* **variable**: sets a namespace object variable that is used within a template 
function to access other data objects passed to the function (default value: 
`'data'`)  *(underscore template functions use `with` statement internally, 
which fails the ES2015 `'use strict';` mode; hence the usage of namespace 
variables)*

[Backbone]: http://backbonejs.org/
[Marionette]: http://marionettejs.com/
[underscore]: http://underscorejs.com/
