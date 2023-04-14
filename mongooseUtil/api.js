const mongoose = require('mongoose')

async function save(model, instance){
    return new model(instance).save()
}

module.exports.save = save