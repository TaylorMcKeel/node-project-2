const User = require('../models/User')


const getUsers = async(req,res,next)=>{

  const filter = {}
  const options ={}
  console.log(req.params)
  if(Object.keys(req.params).length){
    const {
      userName,
      age,
      sortByAge,
      limit
    } = req.params
   

    if(userName) filter.userName = userName
    if(age) filter.age = age
    if(limit) options.limit = limit
    if(sortByAge) options.sort= {
      age: sortByAge
    }
    console.log(filter)
  }
  try {
    const result = await User.find({}, filter, options)
    res 
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const postUser = async(req,res,next)=>{
  try {
    const result = await User.create(req.body)
    res 
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteUsers = async(req,res,next)=>{
  try {
    const result = await User.deleteMany()
    res 
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const getUser = async(req,res,next)=>{
  try {
    const result = await User.findById(req.params.userId)
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const updateUser = async(req,res,next)=>{
  try {
    const result = await User.findByIdAndUpdate(req.params.userId, req.body, {new:true})
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteUser = async(req,res,next)=>{
  try {
    const result = await User.findByIdAndDelete(req.params.userId)
    res
    .status(200)
    .setHeader('content-type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  getUsers,
  postUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser
}