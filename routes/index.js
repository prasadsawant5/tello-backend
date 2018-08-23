var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Bin = require('../models/bin');

/* GET home page. */
router.post('/addItem', function (req, res, next) {
  var body = req.body;

  console.log(body);

  if (body.items === '') {
    Bin.update({ name: body.bin }, { $set: { items: null } }, function (err, bin) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: 'DB error while updating the bin.',
          obj: err
        });
      }

      if (bin === null) {
        return res.status(400).json({
          message: 'DB error while updating the bin.'
        });
      }

      res.status(201).json({ message: 'Bin updated', obj: bin });
    });
  } else {
    Bin.updateMany({ items: { $in: body.items } }, { $pull: { items: body.items }}, function(err, bins) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: 'DB error while deleting bins with duplicate items.',
          obj: err
        });
      }

      console.log(bins);

      Bin.update({ name: body.bin }, { $set: { items: body.items } }, function (err, bin) {
        if (err) {
          console.error(err);
          return res.status(400).json({
            message: 'DB error while updating the bin.',
            obj: err
          });
        }
  
        if (bin === null) {
          return res.status(400).json({
            message: 'DB error while updating the bin.'
          });
        }
  
        res.status(201).json({ message: 'Bin updated', obj: bin });
      });

    });
  }
});


router.get('/items', function (req, res, next) {
  Bin.find({}, function (err, bins) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Not able to save item.',
        obj: err
      });
    }

    if (bins === null) {
      return res.status(400).json({
        message: 'Not able to save item.',
        obj: null
      });
    }

    res.status(200).json({ message: 'Items found', obj: bins });
  });
});

router.get('/deleteDb', function (req, res, next) {
  mongoose.connection.db.dropCollection('bins');

  // bin9 => bin4 => bin3 => up
  // bin1 => bin6 => Object1 => up1
  // bin7 => bin8 => Object1 => com
  var bins = [
    { name: 'bin9', items: null }, { name: 'bin4', items: null }, { name: 'bin3', items: null }, { name: 'up', items: null },
    { name: 'bin1', items: null }, { name: 'bin6', items: null }, { name: 'Object 1', items: null }, { name: 'up1', items: null },
    { name: 'bin7', items: null }, { name: 'bin8', items: null }, { name: 'com', items: null }
  ];

  bins.forEach(function (element) {
    var bin = new Bin(element);
    bin.save();
  })

  res.status(200).json({ 'message': 'DB cleared' });
});

module.exports = router;
