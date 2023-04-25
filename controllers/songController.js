const Song = require('../models/Song')


const getSongs = async(req,res,next)=>{

  const options = {}
  const filter = {}
  if(Object.keys(req.query).length){
    const {
      songTitle,
      artist,
      genre,
      sortByArtist,
      limit
    } = req.query

    

    if(songTitle) filter.songTitle = true
    if(artist) filter.artist = true
    if(genre) filter.genre = true

    if(limit) options.limit = limit
    if(sortByArtist) options.sort = {
      artist: sortByArtist
    }

   
  }

  try {
    const result = await Song.find({}, filter, options)
    res 
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const postSong = async(req,res,next)=>{
  try {
    const result = await Song.create( req.body)
    res 
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
  
}

const deleteSongs = async(req,res,next)=>{
  try {
    const result = await Song.deleteMany()
    res 
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const getSong = async(req,res,next)=>{
  try {
    const result = await Song.findById(req.params.songId)
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const updateSong = async(req,res,next)=>{
  try {
    const result = await Song.findByIdAndUpdate(req.params.songId, req.body, {new:true})
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteSong = async(req,res,next)=>{
  try {
    const result = await Song.findByIdAndDelete(req.params.songId)
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const getSongRatings = async(req,res,next)=>{
  try {
    const result = await Song.findById(req.params.songId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result.ratings)
  } catch (err) {
    next(err)
  }
}

const postSongRating = async(req,res,next)=>{
  try {
    const result = await Song.findById(req.params.itemsId)
    result.ratings.push(req.body)
    await result.save()

    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result.ratings)
  } catch (error) {
    next(err)
  }
}

const deleteSongRatings = async(req,res,next)=>{
  try {
    const result = await Song.findById(rreq.params.songId)
    result.ratings = []
    await result.save()

    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result.ratings) //decided to return empty array vs a message
  } catch (err) {
    next(err)
  }
}

const getSongRating = async(req,res,next)=>{
  try {
    const result = await Song.findById(req.params.SongId)
    let rating = result.ratings.find(rating => (rating._id).equals(req.params.ratingId))
    if(!rating) rating = {msg: `No rating douns with id ${req.params.ratingId}`}

    res
    .status(200)
    .setHeader('Content-Type','application.json')
    .json(rating)
  } catch (err) {
    next(err)
  }
}

const updateSongRating = async(req,res,next)=>{
  try {
    const result = await Song.findById (req.params.songId)
    let rating = result.ratings.find(rating => (req.params.ratingId).equals(rating._id))

    if(rating){
      const ratingIndexPosition = result.ratings.indexOf(rating)
      result.ratings.splice(ratingindexPosition, 1, req.body)
      rating = req.body
      await rating.save()
    }else{
      rating = {msg: `No rating found with id ${req.params.ratingId}`}
    }

    res
    .status(200)
    .setHeader('Content-type','application/json')
    .json(rating)
  } catch (err) {
    next(err)
  }
}

const deleteSongRating = async(req,res,next)=>{
  try {
    const result = Song.findById(req.params.songId)
    const rating = result.ratings.find(result => (req.params.ratingId).equals(rating._id))

    if(rating){
      const ratingIndexPosition = result.ratings.indexOf(rating)
      result.ratings.splice(ratingIndexPosition, 1)
      rating = {msg: `Succesfully removed rating with id ${req.params.ratingId}`}
      await result.save()
    }else{
      rating = {msg: `No rating found with id ${req.params.ratingId}`}
    }

    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(rating)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getSongs,
  postSong,
  deleteSongs,
  getSong,
  updateSong,
  deleteSong,
  getSongRatings,
  postSongRating,
  deleteSongRatings,
  getSongRating,
  updateSongRating,
  deleteSongRating
}