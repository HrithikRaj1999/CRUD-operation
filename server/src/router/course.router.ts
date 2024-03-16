import { Router } from "express";
import {
  createNewCourse,
  deleteCourse,
  fetchAllCourse,
  filterCoursesByAuthor,
  updateCourse,
  fetchSingleCourse
} from "../controller/course.controller";
import { tryCatchError } from "./../utils/errorWrapper";

const courseRouter = Router();

//example http://localhost:8080/api/v1/course/

courseRouter.post("/create-course", tryCatchError(createNewCourse)); //new entry
courseRouter.put("/update-course/:id", tryCatchError(updateCourse)); //update
courseRouter.get("/fetch-all-course", tryCatchError(fetchAllCourse)); //get all courses
courseRouter.get("/fetch/:id", tryCatchError(fetchSingleCourse)); //get all courses

courseRouter.delete("/delete-course/:id", tryCatchError(deleteCourse));

//   /filter-by-authors?author=Hrithik
courseRouter.get("/filter-by-authors", tryCatchError(filterCoursesByAuthor));

export default courseRouter;
