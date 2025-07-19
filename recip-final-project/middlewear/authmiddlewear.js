const jwt = require('jsonwebtoken');

const auth =(req,res,next) => {
  let token=req.header.authorization;
if(!token){
  return res.status(201).json({msg : "token required"})
}

try {
  token = token.slice(7,token.length);
  const decoded=jwt.verify(token,process.env.JWT_SECRAT);
  req.user=decoded,
  role=decoded.role,
  next();
} catch (error) {
  res.status(400).json({msg :"token is invalid"})
}
}

 module.exports = auth;