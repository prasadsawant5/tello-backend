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
  }

  // if ((body.bin.includes('bin') || body.bin.includes('up') || body.bin.includes('Object') || body.bin.includes('com')) && 
  // (body.items.indexOf('bin') === -1 && body.items.indexOf('up') === -1 && body.items.indexOf('Object') === -1 && body.items.indexOf('com') === -1)) {
  //   Bin.findOne({ name: body.bin }, function(err, bin) {
  //     if (err) {
  //       console.error(err);
  //       return res.status(400).json({
  //         message: 'DB error while finding a bin.',
  //         obj: err
  //       });
  //     }

  //     if (bin === null) {
  //       return res.status(400).json({
  //         message: 'Cannot finding the bin.'
  //       });
  //     }

  //     if (new Date() - bin.updatedAt > 60000 * 2) {
  //       bin.items = body.items;
  //       bin.save();
  //     }

  //     res.status(201).json({ message: 'Bin updated', obj: bin });
  //   });
  // } else if ((body.bin.includes('bin') || body.bin.includes('up') || body.bin.includes('Object') || body.bin.includes('com')) && 
  // (body.items.indexOf('bin') !== -1 || body.items.indexOf('up') !== -1 || body.items.indexOf('Object') !== -1 || body.items.indexOf('com') !== -1 || body.items === null)) {
  //   Bin.update({ name: body.bin }, {$set: {items: null}}, function(err, bin) {
  //     if (err) {
  //       console.error(err);
  //       return res.status(400).json({
  //         message: 'DB error while updating the bin.',
  //         obj: err
  //       });
  //     }

  //     if (bin === null) {
  //       return res.status(400).json({
  //         message: 'DB error while updating the bin.'
  //       });
  //     }

  //     res.status(201).json({ message: 'Bin updated', obj: bin });
  //   });

  // }

  // Bin.find({ items: { $in: [body.item] } }, function (erFind, bins) {
  //   if (bins !== []) {
  //     bins.forEach(function (ele) {
  //       if (ele.name !== body.bin.toUpperCase()) {
  //         if (ele.items.length > 1) {
  //           // update
  //           Bin.update({ name: ele.name }, { $pull: { items: [body.item] } });
  //         } else {
  //           console.log('delete');
  //           Bin.deleteOne({ name: ele.name }, function (delEr, del) {
  //             if (delEr) {
  //               console.error(delEr);
  //             }
  //           });
  //         }
  //       }
  //     });
  //   }
  // });

  // Bin.find({}, function (er, bins) {
  //   if (er) {
  //     console.error(er);
  //     return res.status(400).json({
  //       message: 'Error while finding an existing bin.',
  //       obj: err
  //     });
  //   }
  //   if (bins !== []) {
  //     console.log('finding all bins');
  //     bins.forEach(function (ele) {
  //       if (ele.items.includes(body.item)) {
  //         console.log(ele.name);
  //         console.log(body.bin);
  //         if (ele.name !== body.bin.toUpperCase()) {
  //           if (ele.items.length > 1) {
  //             // update
  //             Bin.update({ name: ele.name }, { $pull: { items: [body.item] } });
  //           } else {
  //             console.log('delete');
  //             Bin.deleteOne({ name: ele.name }, function (delEr, del) {
  //               if (delEr) {
  //                 console.error(delEr);
  //               }
  //             });
  //           }
  //         }
  //       }
  //     });
  //   }
  // });

  // Bin.findOne({ name: body.bin }, function (e, b) {
  //   if (e) {
  //     console.error(err);
  //     return res.status(400).json({
  //       message: 'Not able to find bin.',
  //       obj: err
  //     });
  //   }

  //   if (b === null) {
  //     bin.save(function (err, data) {
  //       if (err) {
  //         console.error(err);
  //         return res.status(400).json({
  //           message: 'Not able to save bin.',
  //           obj: err
  //         });
  //       }

  //       if (data === null) {
  //         return res.status(400).json({
  //           message: 'Not able to find item.',
  //           obj: null
  //         });
  //       }

  //       res.status(201).json({ 'message': 'OK' });
  //     });
  //   } else {
  //     console.log('bin already exists');
  //     var items = b.items;

  //     if (items.includes(body.item)) {
  //       console.log('Item already exists');
  //     } else {
  //       b.items.push(body.item);
  //       b.save();
  //     }
  //     res.status(201).json({ 'message': 'OK' });
  //   }
  // });

  // res.status(201).json({ 'message': 'OK'});
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
