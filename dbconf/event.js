import { Schema, model } from "mongoose";

const EventModel = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: false },
  content: { type: String, required: true },
  data_start: { type: Date, required: true },
  data_end: { type: Date, required: false },
  calendar: { type: Schema.Types.ObjectId, ref: "Calendar" },
});

export default model("Event", EventModel);
