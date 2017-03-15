/* globals describe it */

let assert = require('assert');
let {rollup} = require('rollup');
let underscorify = require('../dist/underscorify');

process.chdir(__dirname);

function bundle(options, underscorifyOptions) {
  options.plugins = [underscorify(underscorifyOptions)];
  return rollup(options);
}

describe('rollup-plugin-underscorify', () => {
  it('converts .tpl file into a template function', () => {
    return bundle({entry: 'samples/sample.js'}, {include: '**/*.tpl', variable: 'data'}).then(bundle => {
      let {code} = bundle.generate({format: 'iife', moduleName: 'underscorify'});
      new Function('assert', code)(assert);
    });
  });
  
  it('produces an empty sourcemap', () => {
    return bundle({entry: 'samples/sample.js'}, {include: '**/*.tpl', variable: 'data'}).then(bundle => {
      let {code, map} = bundle.generate({sourceMap: true, format: 'es'});
      assert.ok(code);
      assert.ok(map);
    });
  });
  
  it('errors when include is not specified', () => {
    assert.throws(() => bundle({entry: 'samples/sample.js'}, {variable: 'data'}), /specify template file extensions/);
  });
  
  it('errors when variable is not specified', () => {
    assert.throws(() =>  bundle({entry: 'samples/sample.js'}, {include: '**/*.tpl'}), /specify template namespace variable/);
  });
});
