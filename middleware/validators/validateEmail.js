const validator = require('email-validator')

function validateEmail(email){
    return validator.validate(email)
}

module.exports = validateEmail