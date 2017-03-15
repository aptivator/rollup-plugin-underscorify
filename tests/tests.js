/* globals describe it */

let assert = require('assert');
let {rollup} = require('rollup');
let underscorify = require('../dist/index');

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
});
