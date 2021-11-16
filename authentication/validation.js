const Joi = require('joi')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("1033685070621-hdqk1q42vbkd9d8vv595i3ij9gqopvf6.apps.googleusercontent.com");
exports.GGverify= async(token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1033685070621-hdqk1q42vbkd9d8vv595i3ij9gqopvf6.apps.googleusercontent.com", 
  });
  const payload = ticket.getPayload();
  return payload
}
exports.loginValidation=(data)=>{
    const schema =Joi.object({
        username:Joi.string().required().email(),
        
        password:Joi.string().min(6).required()
    });
    return schema.validate(data)
    
   
    
}
exports.registerValidation=(data)=>{
    const schema =Joi.object({
        username:Joi.string().required().email(),
        
        password:Joi.string().min(6).required(),
        firstname:Joi.string().required(),
        lastname:Joi.string().required(),
        dob:Joi.string().required(),
        gender:Joi.boolean().required(),
        phone:Joi.string().messages({'string.pattern.base': `Invalid phone number.`}).length(10).pattern(/^[0-9]+$/).required(),
    });
    return schema.validate(data)
    
   
    
}