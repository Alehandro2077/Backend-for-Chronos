import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  activated: { type: Boolean, default: false, required: true },
  activationLink: { type: String, required: false },
});

export default model("User", UserSchema);
