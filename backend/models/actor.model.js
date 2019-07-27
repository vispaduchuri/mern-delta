const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actorSchema = new Schema({
    actorname :{type:String, required:true},
    sex:{ type: String, required:true},
    Dob:{type:String, required:true},
    bio:{type: String, required:true  },
}, {
    timestamps : true,
});

const Actor = mongoose.model('Actor',actorSchema);

module.exports=Actor;