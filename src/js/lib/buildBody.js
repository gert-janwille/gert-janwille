import {pick, assign} from 'lodash';

export default (data, values, extra) => {
  data = pick(data, values);
  if (extra) {
    data = assign(data, extra);
  }
  return JSON.stringify(data);
};
