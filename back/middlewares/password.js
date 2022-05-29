// Importation password validator
const passwordValidator = require('password-validator');

// Creation du schema
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(6)                                    // Minimum length 6
.is().max(15)                                  // Maximum length 15
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Password123']);             // Blacklist these values

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
