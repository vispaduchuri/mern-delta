const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    moviename :{type:String, required:true},
    yearofrelease:{ type: String, required:true},
    poster:{type:String, required:true},
    plot:{type: String, required:true  },
    cast:{type:String,required:true},
}, {
    timestamps : true,
});

const Movie = mongoose.model('Movie',moviesSchema);

module.exports=Movie;