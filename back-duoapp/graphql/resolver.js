
const User = require('../models/user');
export const resolver = {
    Query: {
        async allUser() {
            return await User.find();
        }
    }
}