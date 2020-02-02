const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

const code = require('../../config/code');
const CacheService = require('../../core/cache');
const common = require('../../core/common');

const Products = mongoose.model('Products');
const router = express.Router();

const ttl = 60 * 60;
const cache = new CacheService(ttl);

router.get('/', (req, res) => {
  res.send('hello world');
});

router.get('/cache/all', (req, res) => {
  cache.getAll().then((value) => {
    res.json(value);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  cache.get(id, () => {
    return new Promise((resolve) => {
      resolve(crypto.randomBytes(6).toString('hex'));
    });
  }).then((value) => {
    if (value && value.isNew) {
      res.json(value.key);
    } else {
      common.find(Products, { key: value }, (result) => res.json(result));
    }
  });
});

router.post('/:id', (req, res) => {
  const { id } = req.params;
  cache.get(id).then((value) => {
    const data = req.body;
    data.key = value;
    const products = new Products(data);
    products.save((err) => {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
      }
      common.find(Products, { key: value }, (result) => res.json(result));
    });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  cache.get(id).then((value) => {
    const data = req.body;
    data.key = id;
    Products.updateOne({ key: value }, { $set: data }, (err) => {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
      }
      common.find(Products, { key: value }, (result) => res.json(result));
    });
  });
});


router.delete('/cache/all', (req, res) => {
  cache.flush().then((value) => {
    if (value) res.json({ result: 1 });
  });
});

router.delete('/cache/:id', (req, res) => {
  const { id } = req.params;
  cache.delete(id).then((value) => {
    if (value) res.json({ result: 1 });
  });
});

module.exports = router;
