import { NextFunction, Request, Response } from "express";
import Course from "../model/course.model";
import { ErrorHandler } from "../types/ErrorHandler-type";

export const createNewCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { thumbnail, name, author, description } = req.body;
    if (!name || !author || !thumbnail) {
      return new ErrorHandler(400, "Please fill all fields");
    }

    const insertedCourse = await Course.create({
      thumbnail,
      name,
      author,
      description,
    });
    return res.status(201).json(insertedCourse);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to create course."));
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Get the course ID from the URL parameters
  const { thumbnail, name, author, description } = req.body; // Extract fields from the request body

  if (!name && !author && !thumbnail) {
    return next(
      new ErrorHandler(400, "Please provide at least one field to update")
    );
  }

  try {
    // Find the course by ID and update it with the provided values
    // The { new: true } option returns the document after update
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        thumbnail,
        name,
        author,
        description,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return next(new ErrorHandler(404, "Course not found"));
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(new ErrorHandler(500, ("Internal Server Error" + error) as any));
  }
};

export const fetchAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Query the database for all courses
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const filterCoursesByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { author } = req.query; // Extract the author from query parameters
    if (!author) {
      return res
        .status(400)
        .json({ message: "Author query parameter is required" });
    }

    const authorRegex = new RegExp(author.toString(), "i");

    const courses = await Course.find({ author: authorRegex });

    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for the specified author" });
    }

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
