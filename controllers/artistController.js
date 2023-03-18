const getArtists = (req,res,next)=>{
  if(Object.keys(req.params).length){
    const {
      firstName,
      lastName,
      genre
    } = req.params
    const filter = []

    if(firstName) filter.push(firstName)
    if(lastName) filter.push(lastName)
    if(genre) filter.push(genre)

    for(const query in filter){
      console.log(`Searching by ${query}`)
    }
  }
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

const getArtist = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Show me the artist with artist ID of ${req.params.artistId}`})
}

const updateArtist = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Update the artist with artist ID of ${req.params.artistId}`})
}

const deleteArtist = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Delete the artist with artist ID of ${req.params.artistId}`})
}
module.exports = {
  getArtists,
  postArtist,
  deleteArtists,
  getArtist,
  updateArtist,
  deleteArtist
}