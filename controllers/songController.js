const getSongs = (req,res,next)=>{
  if(Object.keys(req.params).length){
    const {
      songTitle,
      artist,
      genre
    } = req.params

    const filter = []

    if(songTitle) filter.push(songTitle)
    if(artist) filter.push(artist)
    if(genre) filter.push(genre)

    for(const query of filter){
      console.log(`Searching based on ${query}`)
    }
  }
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

const getSong = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Show me the song with song ID of ${req.params.songId}`})
}

const updateSong = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Update the song with song ID of ${req.params.songId}`})
}

const deleteSong = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Delete the song with song ID of ${req.params.songId}`})
}
module.exports = {
  getSongs,
  postSong,
  deleteSongs,
  getSong,
  updateSong,
  deleteSong
}