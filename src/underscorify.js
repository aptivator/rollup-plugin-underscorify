import _              from 'underscore';
import {createFilter} from 'rollup-pluginutils';

import * as df from './lib/consts';

export default (options = {}) => {
  let {exclude = df.exclude, include = df.include, variable = df.variable} = options;
  let filter = createFilter(include, exclude);
  
  return {
    name: 'underscorify',
    transform(code, id) {
      if(filter(id)) {
        code = _.template(code, {variable}).source;
        code = code.replace(/(_\.escape\()/g, `${variable}.$1`);
        
        return {
          code: `export default ${code};`,
          map: {mappings: ''}
        };
      }
    }
  };
};
