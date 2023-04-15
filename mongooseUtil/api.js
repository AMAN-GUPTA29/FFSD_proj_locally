const mongoose = require('mongoose')

async function save(model, instance){
    return new model(instance).save()//ye promise hai ki aisa hoga jab ye promise poora hoga tabhi then catch chelga
}

module.exports.save = save