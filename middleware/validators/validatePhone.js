function validatePhoneNumber(phoneNumber) {
    const onlyNumbers = /^[0-9]+$/;
    const countryCode91 = /^91[0-9]{10}$/;
    const plus91 = /^\+91[0-9]{10}$/;

    if (phoneNumber.length === 10 && onlyNumbers.test(phoneNumber)) {
        return true
    } else if (phoneNumber.length === 12 && countryCode91.test(phoneNumber)) {
        return true
    } else if (phoneNumber.length === 13 && plus91.test(phoneNumber)) {
        return true
    }
    return false
}

module.exports = validatePhoneNumber