const getArtists = (req,res,next)=>{
  res 
  .status(200)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Getting the artists' })
}

const postArtist = (req,res,next)=>{
  res 
  .status(201)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Adding an artist' })
}

const deleteArtists = (req,res,next)=>{
  res 
  .status(200)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Deleting the artists' })
}

module.exports = {
  getArtists,
  postArtist,
  deleteArtists
}