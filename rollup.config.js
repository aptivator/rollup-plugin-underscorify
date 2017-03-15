import buble    from 'rollup-plugin-buble';
import resolver from 'rollup-plugin-node-resolve';

let pkgJson = require('./package.json');
let {'jsnext:main': jsnext, main} = pkgJson;

export default {
  entry: 'index.js',
  plugins: [
    resolver(),
    buble()
  ],
  globals: {
    'rollup-pluginutils': 'rollup-pluginutils',
    'underscore': '_'
  },
  external: ['rollup-pluginutils', 'underscore'],
  targets: [{
    format: 'cjs',
    dest: main
  }, {
    format: 'es',
    dest: jsnext
  }]
};
