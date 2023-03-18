const getUsers = (req,res,next)=>{
  if(Object.keys(req.params).length){
    const {
      userName,
      gender
    } = req.params
    const filter = []

    if(userName) filter.push(userName)
    if(gender) filter.push(gender)

    for(const query in filter){
      console.log(`Searching by ${query}`)
    }
  }
  res 
  .status(200)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Getting the users' })
}

const postUser = (req,res,next)=>{
  res 
  .status(201)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Adding a user' })
}

const deleteUsers = (req,res,next)=>{
  res 
  .status(200)
  .setHeader('Content-Type', 'application/json')
  .json({ message: 'Deleting the users' })
}

const getUser = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Show me the user with user ID of ${req.params.userId}`})
}

const updateUser = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Update the user with user ID of ${req.params.userId}`})
}

const deleteUser = (req,res,next)=>{
  res
  .status(200)
  .setHeader('content-type','application/json')
  .json({message: `Delete the user with user ID of ${req.params.userId}`})
}


module.exports = {
  getUsers,
  postUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser
}