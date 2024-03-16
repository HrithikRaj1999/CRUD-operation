import { Schema, model } from "mongoose";

export interface CourseType {
  thumbnail: string;
  name: string;
  author: string;
  description: string;
}

const courseSchema = new Schema<CourseType>(
  {
    thumbnail: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export default model<CourseType>("Course", courseSchema);
