import { Schema, model } from "mongoose";

const CalendarSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  inviteLink: { type: String, required: false, unique: false },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  color: { type: String, required: false },
});

export default model("Calendar", CalendarSchema);
