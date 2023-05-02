const User = require("../../models/User")

const adminValidator = async(req,res,next)=>{
  const user = await User.findById(req.userId)
  if(user.admin){
    next()
  }else{
    res
    .status(403)
    .setHeader('Content-Type','application/json')
    .json({msg: 'Unauthorized to access this resource!'})
  }
}

module.exports = {
  adminValidator
}