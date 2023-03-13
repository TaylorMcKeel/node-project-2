const getSongs = (req,res,next)=>{
  res 
  .status(200)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Getting the songs' })
}

const postSong = (req,res,next)=>{
  res 
  .status(201)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Adding a song' })
}

const deleteSongs = (req,res,next)=>{
  res 
  .status(200)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Deleting the songs' })
}

module.exports = {
  getSongs,
  postSong,
  deleteSongs
}