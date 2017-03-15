import _              from 'underscore';
import {createFilter} from 'rollup-pluginutils';

export default (options = {}) => {
  let {exclude, include, variable} = options;
  
  if(!include) {
    throw new Error('rollup-plugin-underscorify: specify template file extensions');
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
