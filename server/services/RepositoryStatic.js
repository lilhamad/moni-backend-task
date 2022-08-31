"use strict";
const Model = require('../infrastructure/models');

exports.create = (modelname, payload = {}, transaction = null) => {
    return Model[modelname].create(payload, {transaction});
};
exports.massInsert = (modelname, data, options = null) => {
    return Model[modelname].bulkCreate(data, options);
};
exports.updateOrCreate = (modelname, condition, data, transaction = null) => {
    // First try to find the record
    const foundItem = this.Model.findOne(condition);
    if (!foundItem) {
        // Item not found, create a new one
        return Model[modelname].create(data, {transaction});
    }
    // Found an item, update it
    condition.transaction = transaction;
    return Model[modelname].update(data, condition);
};

exports.findOrCreate = (modelname, condition, data, transaction = null) => {
    return Model[modelname].findOrCreate({where: condition, defaults: data, transaction});
};
exports.update = (modelname, condition, data, transaction = null) => {
    let options = {where: condition, returning: true, plain: true, transaction};
    return Model[modelname].update(data, options);
};

exports.findOneNative = (modelname, condition = {}) => {
    return Model[modelname].findOne(condition);
};
exports.all = (modelname, options = {}) => {
    return Model[modelname].findAll(options);
};
exports.delete = (modelname, options = {}) => {
    return Model[modelname].destroy(options);
};
exports.findByPk = (modelname,id) => {
    return Model[modelname].findByPk(id);
}






