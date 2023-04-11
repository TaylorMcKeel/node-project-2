const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

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

UserSchema.post('save',function(next){ //cant get this to work. This doesnt reference the users directly and therefor cannot uppercase
  this.gender.toUpperCase()
  next()
})

module.exports = mongoose.model('User', UserSchema)