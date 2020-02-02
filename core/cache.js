const NodeCache = require('node-cache');
const fp = require('lodash/fp');

const errorHandler = require('./errorHandler');
const code = require('../config/code');

class Cache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  /**
   * here in this code there is no structures for handling old caches but i'd want to suggest some ideas
   *
   * ideas
   * 1. add additional information to cache
   *   add two properties - count(integer), created(timestamp)
   *   whenever the cache is called, count up how many times it's called
   *   when it hits the maximum amount of cached items, calculate the score and remove from low score
   *   calculating score formula should be vary depending on the system, but i'd use something called weight
   *   applying different weight number depending on how old the cache is
   *   for instance,
   *    a full day: 0.2
   *   12 hours: 0.5
   *   6 hours: 0.8
   *   less than one hour: 1
   *
   *   score = count * weight
   *
   * 2. think about when to flush
   *   flushing cache could cause some problems since it has to search the whole cache and calculate the score
   *   there are multiple ways of doing this, but i'd rather cache only frequently used data than caching everything
   *   if the size of cache is small in the first place, it wouldn't cause overflow or delay problems.
   *   to do this, the system should have a server to log and store API calls so that we can track which APIs and data are frequently used
   *   and store cache that are used the most
   */

  get(key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
      console.log('Cache hit');
      return Promise.resolve(value);
    }
    if (value && storeFunction) {
      return storeFunction().then((result) => {
        console.log('Cache miss');
        this.cache.set(result, result);
        const data = {
          key: result,
          isNew: true,
        };
        return Promise.resolve(data);
      });
    } else {
      // when cache does not exists for POST and PUT
      throw errorHandler.createError(code.ERROR_CODE.NOT_FOUND);
    }
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
