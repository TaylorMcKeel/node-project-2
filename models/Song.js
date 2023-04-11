const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongRatingSchema = new Schema({
  rating:{
    type: Number,
    min: 1,
    max:5,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})
const SongSchema = new Schema({
  songTitle:{
    type:String,
    required: true,
    maxLength: 20
  },
  artist:{
    type:String,
    unique: true,
    required: true
  },
  genre:{
    type:String,
    required:true
  },
  ratings: [SongRatingSchema]
},{
  timestamps: true
})

module.exports = mongoose.model('Song', SongSchema)