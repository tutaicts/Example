import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String},
    fullName: {type: String},
    active: {type: Boolean, default : true}
});
const UserModel = mongoose.model('User', userSchema, 'User')

export default UserModel;
