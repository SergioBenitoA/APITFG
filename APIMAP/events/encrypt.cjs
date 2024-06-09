const bcrypt = require('bcrypt')

const encrypt = async (password) => {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

const compare = async (password, hashedPasswd) => {
    const isMatch = await bcrypt.compare(password, hashedPasswd )
    return isMatch
}

module.exports = {
    encrypt,
    compare
}