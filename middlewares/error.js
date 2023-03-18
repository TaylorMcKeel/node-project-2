const errorHandler =(err,req,res,next)=>{
  console.log(err.stack) 

  res 
  .status(err.statusCode || 500) 
  .setHeader('content-type','application/json')
  .json({
    message: err.message || 'server error',
    success: false
  }) 
}

module.exports = errorHandler