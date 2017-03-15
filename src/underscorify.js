import _              from 'underscore';
import {createFilter} from 'rollup-pluginutils';
import errorer        from './lib/errorer';

export default (options = {}) => {
  let {exclude, include, variable} = options;
  
  if(!include) {
    errorer('specify template file extensions');
  }
  
  if(!variable) {
    errorer('specify template namespace variable');
  }
  
  let filter = createFilter(include, exclude);
  
  return {
    name: 'underscorify',
    transform(code, id) {
      if(filter(id)) {
        return {
          code: `export default ${_.template(code, {variable}).source}`,
          map: {mappings: ''}
        };
      }
    }
  };
};
