var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Bin = require('../models/bin');
var fs = require('fs');
var path = require('path');

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
  var bins = [];

  fs.readFile(path.join(__dirname, '/shelf.json'), (err, data) => {  
    if (err) {
      console.error(err);
      return res.status(400).json({ message: 'Error while reading shelf.json file' });
    }
    let info = JSON.parse(data);

    var shelf1 = info['shelf1'];
    var shelf2 = info['shelf2'];

    shelf1.forEach(function (bin) {
      bins.push({ name: bin, items: null });
    });

    shelf2.forEach(function (bin) {
      bins.push({ name: bin, items: null });
    });

    bins.forEach(function (element) {
      var bin = new Bin(element);
      bin.save();
    })
  
    res.status(200).json({ 'message': 'DB cleared' });
    
  });
});

module.exports = router;
