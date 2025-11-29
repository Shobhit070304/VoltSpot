import Report from '../models/Report.js';

const create = (data) => {
  return Report.create(data);
};

export default { create };
