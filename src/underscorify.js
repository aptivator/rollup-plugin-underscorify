import _              from 'underscore';
import {createFilter} from 'rollup-pluginutils';

import {includeDefault, variableDefault} from './lib/vars';

export default (options = {}) => {
  let {exclude, include = includeDefault, variable = variableDefault} = options;
  let filter = createFilter(include, exclude);
  
  return {
    name: 'underscorify',
    transform(code, id) {
      if(filter(id)) {
        return {
          code: `export default ${_.template(code, {variable}).source};`,
          map: {mappings: ''}
        };
      }
    }
  };
};
