const { User, Thought } = require("../models");

// resolver can accept 4 arguments: parent, args, context, info
const resolvers = {
    Query: {
        // parent is placeholder param, access username arg
        thoughts: async (parent, { username }) => {
            // ternary operator checks if username exists
            // if it does, set params to an obj with username key set to that value
            // if it doesn't, return empty obj
            const params = username ? { username } : {};
            // return data in desc order, pass obj with or without data into .find()
            // if there's data, lookup by specific username, if not, return every thought
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select("-__v -password")
            .populate("friends")
            .populate("thoughts");
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select("-__v -password")
            .populate("friends")
            .populate("thoughts");
        },
    }
};

module.exports = resolvers;