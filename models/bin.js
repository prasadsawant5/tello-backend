'use strict';

var mongoose = require('mongoose');

var db = require('./db.js');

var Schema = mongoose.Schema;

var binSchema = new Schema({
    name: { type: String, required: true, unique: true },
    items: [{ type: String, require: true, unique: true }],
    createdAt: Date,
    updatedAt: Date
});

binSchema.pre('save', function(callback) {
    var bin = this;
    bin.createdAt = new Date();
    bin.updatedAt = new Date();
    callback();
});
    
var Bin = mongoose.model('Bin', binSchema);
module.exports = Bin;