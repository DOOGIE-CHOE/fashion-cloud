const common = {};

common.find = (inst, where, cb) => {
  return inst.find(where).then(cb);
};

module.exports = common;
