import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },
  creator: {
    type: String,
  },
  description: {
    type: String,
  },
});

// taskSchema.index({ name: "text", creator: "text", description: "text" });
export default taskSchema;
