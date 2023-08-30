import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    require: true,
    enum: ["male", "female"],
  },
  phone: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default:false
  },
  isOnline: {
    type: Boolean,
    required: true,
    default:false
  },
  isVerified: {
    type: Boolean,
    default:false
  },
  verificationCode: {
    type: String,
  }
},{
    timestamps:true
});

const userModel = model("user", userSchema);

export default userModel;
