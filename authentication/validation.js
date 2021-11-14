const Joi = require('joi')


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