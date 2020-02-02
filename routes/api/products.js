const express = require('express');
const mongoose = require('mongoose');
const Products = mongoose.model('Products');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello world');
});

router.post('/', (req, res) => {
  const products = new Products(req.body.keys)
  products.save(function(err){
    if(err){
      console.error(err);
      res.json({result: 0});
      return;
    }

    res.json({result: 1});

  });
});


module.exports = router;
