const { User } = require("../models");

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .select("-__v")
            .then((dbUserData) => res.json(dbUserData))   // Return the data in JSON
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .select("-__v")
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found" });
                    return;
                }
                res.json(dbUserData); // Return the data in JSON
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData)) // Return the data in JSON
            .catch((err) => res.status(400).json(err));
    },

    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found" });
                    return;
                }
                res.json(dbUserData); // Return the data in JSON
            })
            .catch((err) => res.status(400).json(err));
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "no user found" });
                    return;
                }
                res.json(dbUserData); // Return the data in JSON
            })
            .catch((err) => res.status(400).json(err));
    },

    // add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendsId } },
            { new: true }
        )
            .then((dbUserData) => res.json(dbUserData)) // Return the data in JSON
            .catch((err) => res.status(400).json(err));
    },

    // Remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "no user found" });
                    return;
                }
                res.json(dbUserData); // Return the data in JSON
            })
            .catch((err) => res.status(400).json(err));
    },
};

module.exports = userController;