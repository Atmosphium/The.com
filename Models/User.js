const Mongoose = require ('mongoose'),
      userSchema = new Mongoose.Schema ({
    id: String,
    fullname: String,
    username: String,
    password: String,
    gender: String,
    birthday: Date,
    kid: Boolean
}),
    User = new Mongoose.model ('user', userSchema)

module.exports = User