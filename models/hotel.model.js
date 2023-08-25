
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
     
    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    imageURL : {
        type : String,
        required : true
    },

    location : {
         type : String,
         required : true
    },

    phone : {
        type : String,
        required : true
    },

    rating : {
        type : Number,
        required : true
    },

    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },

    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    }
});

module.exports = mongoose.model("hotel", hotelSchema);