const User = require('../models/User')


const getUsers = async(req,res,next)=>{
  const filter = {}
  const options ={}
  if(Object.keys(req.query).length){
    const {
      userName,
      age,
      sortByAge,
      limit
    } = req.query
   

    if(userName) filter.userName = true
    if(age) filter.age = true
    if(limit) options.limit = limit
    if(sortByAge) options.sort= {
      age: sortByAge
    }
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
    sendTokenResponse(result, 201, res)
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

const sendTokenResponse = (user, statusCode, res)=>{
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE *24 * 60 * 60 * 1000),
    httpOnly: true
  }

  res
  .status(statusCode)
  .cookie('token', token, options)
  .json(token)
}

const login = async(req,res,next)=>{
  const {email, password} = req.body
  if(!email || !password){
    throw new Error('Please provide email and password')
  }

  const user = await User.findOne({email}).select('+password')

  if(!user){
    throw new Error('invalid credentials')
  }

  const isMatch = await user.matchPasswords(password)

  if(!isMatch) throw new Error('invalid Credentials')

  sendTokenResponse(user,200,res)
}

module.exports = {
  getUsers,
  postUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser,
  login
}