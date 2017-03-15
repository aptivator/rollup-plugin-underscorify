# rollup-plugin-underscorify

### Introduction

The plugin was written for [Backbone]- and [Marionette]-based applications and 
converts underscore templates (included as files) into modules.

### Installation

`npm install rollup-plugin-underscorify --save`

### Usage

```tpl
  <!-- sample.tpl --> 

  <h2>Welcome <%= username %></h2>
```


```javascript
  /* sample.js */

  import Marionette from 'backbone.marionette';
  import sampleTpl  from './sample.tpl';
  
  export default Marionette.ItemView.extend({
    template: sampleTpl
  });
```

[Backbone]: http://backbonejs.org/
[Marionette]: http://marionettejs.com/

### Build

```javascript
  /* rollup.config.js */

  import underscorify from 'rollup-plugin-underscorify';
  
  export default {
    entry: 'index.js',
    plugins: [
      underscorify({
        include: '**/*.tpl',
        exclude: ['**/some-other-tpl-file.tpl']
      })
    ]
  };
```
