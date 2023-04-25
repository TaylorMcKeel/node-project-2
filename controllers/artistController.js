const Artist = require('../models/Artist')
const path = require('path')

const getArtists = async(req,res,next)=>{

  const options = {}
  const filter = {}

  if(Object.keys(req.query).length){
    const {
      firstName,
      lastName,
      genre,
      sortByGenre,
      limit
    } = req.query
 

    if(firstName) filter.firstName = true
    if(lastName) filter.lastName = true
    if(genre) filter.genre = true
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

const postArtistImage = async(req,res,next)=>{
  try {
    const err = {msg: `Error uploading image`}
    if(!req.files) next(err)

    const file = req.files.file
    if(!file.memetype.startsWith('image')) next(err)

    if(file.size > process.env.MAX_FILE_SIZE) next(err)

    file.name = `photo_${req.params.itemId}${path.parse(file.name).ext}`

    const filePath = process.env.FILE_UPLOAD_PATH + file.name

    file.mv(filePath, async(err)=>{
      if(err) throw new Error({msg: `trouble uploading image`})
      await Artsit.findByIdAndUpdate(req.params.artistId, {image: file.name})
      res
      .status(200)
      .setHeader('Content-Type','application/json')
      .json({msg: `Image uploaded`})
    })
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
  deleteArtist,
  postArtistImage
}