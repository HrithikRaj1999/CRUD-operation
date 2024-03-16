import { Router } from "express";
import {
  createNewCourse,
  deleteCourse,
  fetchAllCourse,
  filterCoursesByAuthor,
  updateCourse,
} from "../controller/course.controller";
import { tryCatchError } from "./../utils/errorWrapper";

const courseRouter = Router();

//example http://localhost:8080/api/v1/course/ 

courseRouter.post("/createNewCourse", tryCatchError(createNewCourse)); //new entry
courseRouter.put("/update-course/:id", updateCourse); //update
courseRouter.get("/fetchAllCourse", fetchAllCourse); //get all courses
courseRouter.delete("/delete-course/:id", deleteCourse);

//   /filter-by-authors?author=Hrithik
courseRouter.get("/filter-by-authors", filterCoursesByAuthor);

export default courseRouter;
