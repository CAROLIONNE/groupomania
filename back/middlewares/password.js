// Importation password validator
const passwordValidator = require('password-validator');

// Creation du schema
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Verification de la qualité du mot de passe par rapport au schema

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.mot_psw)){
        next()
    }else{
        return res
        .status(400)
        .json({error : `password invalid ${passwordSchema.validate('req.body.mot_psw', { list: true })}`})
        
    }
}
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.mot_psw)){
        next()
    }else{
        return res
        .status(400)
        .json({error : `password invalid : ${passwordSchema.validate('req.body.mot_psw', { list: true })}`})
        
    }
}