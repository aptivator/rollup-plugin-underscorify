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
  it('should convert .tpl file into a template function', () => {
    return bundle({entry: 'samples/sample.js'}, {include: '**/*.tpl', variable: 'data'}).then(bundle => {
      let {code} = bundle.generate({format: 'iife', moduleName: 'underscorify'});
      new Function('assert', code)(assert);
    });
  });
  
  it('should produce an empty sourcemap', () => {
    return bundle({entry: 'samples/sample.js'}, {include: '**/*.tpl', variable: 'data'}).then(bundle => {
      let {code, map} = bundle.generate({sourceMap: true, format: 'es'});
      assert.ok(code);
      assert.ok(map);
    });
  });
  
  it('should error when include is not specified', () => {
    assert.throws(() => bundle({entry: 'samples/sample.js'}, {variable: 'data'}), /specify template file extensions/);
  });
  
  it('should error out when variable is not specified', () => {
    assert.throws(() =>  bundle({entry: 'samples/sample.js'}, {include: '**/*.tpl'}), /specify template namespace variable/);
  });
});
