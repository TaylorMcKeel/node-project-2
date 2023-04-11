const Artist = require('../models/Artist')

const getArtists = async(req,res,next)=>{

  const options = {}
  const filter = {}

  if(Object.keys(req.params).length){
    const {
      firstName,
      lastName,
      genre,
      sortByGenre,
      limit
    } = req.params
 

    if(firstName) filter.firstName = firstName
    if(lastName) filter.lastName = lastName
    if(genre) filter.genre = genre
    if(limit) options.limit = limit
    if(sortByGenre) options.sort = {
      genre: sortByGenre
    }
  }
  try {
    const result = await Artist.find({}, filter, options)
    res 
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const postArtist = async(req,res,next)=>{
  try {
    const result = await Artist.create(req.body)
    res 
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteArtists = async(req,res,next)=>{
  try {
    const result = await Artist.deleteMany()
    res 
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const getArtist = async(req,res,next)=>{
  try {
    const result = await Artist.findById(req.params.artistId)
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const updateArtist = async(req,res,next)=>{
  try {
    const result = await Artist.findByIdAndUpdate(req.params.artistId, req.body, {new: true})
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteArtist = async(req,res,next)=>{
  try {
    const result = await Artist.findByIdAndDelete(req.params.artistId)
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}
module.exports = {
  getArtists,
  postArtist,
  deleteArtists,
  getArtist,
  updateArtist,
  deleteArtist
}