const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  userName:{
    type:String,
    unique:true,
    required:true,
    maxLength:10
  },
  gender:{
    type:String,
    required:true,
    enum:['male','female']
  },
  age:{
    type:Number,
    required: true,
  },
  email:{
    type:String,
    required:true,
    validate: (email)=>validator.isEmail(email)
  },
  password:{
    type:String,
    required:true,
    validate: (password)=> validator.isStrongPassword(password)
  },
  firstName:{
    type:String,
    required: true,
    maxLength: 10
  },
  lastName:{
    type:String,
    required: true,
    maxLength:10
  },
  admin:{
    type: Boolean,
    default: false
  }
},{
  timestamps: true
})

UserSchema.pre('save', function(next){
  const userName = this.userName.split('').reduce((acc,curr)=>{
    if(curr !== ' ') acc+=curr
    return acc
  },'')
  const firstName = this.firstName.split('').reduce((acc,curr)=>{
    if(curr !== ' ') acc+=curr
    return acc
  },'')
  const lastName = this.lastName.split('').reduce((acc,curr)=>{
    if(curr !== ' ') acc+=curr
    return acc
  },'')
  this.userName = userName
  this.firstName = firstName
  this.lastName = lastName
  next()
})

UserSchema.post('save',function({},next){ //cant get this to work. This doesnt reference the users directly and therefor cannot uppercase
  this.gender = this.gender.toUpperCase()
  next()
})

UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: prcoess.env.JWT_EXPIRE
  })
}

UserSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassowrd = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)