const NodeCache = require('node-cache');
const fp = require('lodash/fp');

class Cache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
      console.log('Cache hit');
      return Promise.resolve(value);
    }
    return storeFunction().then((result) => {
      console.log('Cache miss');
      this.cache.set(result, result);
      const data = {
        key: result,
        isNew: true,
      };
      return Promise.resolve(data);
    });
  }

  getAll() {
    const keys = fp.map((value) => value.v, this.cache.data);
    return Promise.resolve(keys);
  }

  delete(keys) {
    this.cache.del(keys);
    return Promise.resolve(true);
  }

  flush() {
    this.cache.flushAll();
    return Promise.resolve(true);
  }
}


module.exports = Cache;
