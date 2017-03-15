import {moduleName} from './vars';

export default errorMessage => {
  throw new Error(`${moduleName}: ${errorMessage}`);
};
