const mongoose = require('mongoose')


// Modelo de usuário
const User = mongoose.model('User', {
    username: String,
    password: String,
});

module.exports = User