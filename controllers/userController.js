const { Post, User } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
        .then( users =>  {
            return res.json(users)
        })
        .catch((err) => res.status(500).json(err))
    }
};