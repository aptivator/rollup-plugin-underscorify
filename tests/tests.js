/* globals describe it */

let assert = require('assert');
let {rollup} = require('rollup');
let _ = require('underscore');
let underscorify = require('../dist/underscorify');

process.chdir(__dirname);

function bundle(options, underscorifyOptions) {
  options.plugins = [underscorify(underscorifyOptions)];
  return rollup(options);
}

function generator(bundle) {
  return bundle.generate({format: 'iife', moduleName: 'underscorify'});
}

describe('rollup-plugin-underscorify', () => {
  it('converts a template file into a template function (using defaults)', () => {
    return bundle({entry: 'samples/sample.js'}).then(bundle => {
      let {code} = generator(bundle);
      new Function('assert', code)(assert);
    });
  });
  
  it('converts a template file into a template function (using custom settings)', () => {
    return bundle({entry: 'samples/sample-custom.js'}, {include: '**/*.html', variable: 'sources'}).then(bundle => {
      let {code} = generator(bundle);
      new Function('assert', '_', code)(assert, _);
    });
  });
  
  it('ignores an otherwise matching file if latter is in exclude', () => {
    return bundle({entry: 'samples/sample-exclude.js'}, {include: '**/*.html', exclude: '**/exclude.html'}).then(bundle => {
      let {modules} = bundle;
      let excluded = _.filter(modules, module => module.id.endsWith('/samples/templates/exclude.html'))[0];
      assert.equal(excluded.code.trim(), 'export default null;');
    });
  });
  
  it('produces an empty sourcemap', () => {
    return bundle({entry: 'samples/sample.js'}).then(bundle => {
      let {code, map} = bundle.generate({sourceMap: true, format: 'es'});
      assert.ok(code);
      assert.ok(map);
    });
  });
});
