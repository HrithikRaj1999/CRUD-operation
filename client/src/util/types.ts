import { MouseEventHandler } from "react";

export interface CourseFormValues {
  thumbnail: string;
  name: string;
  author: string;
  description: string;
  _id: string;
}

export interface CreateCourseResponse {
  _id: string;
  thumbnail: string;
  name: string;
  author: string;
  description: string;
  createdAt?: string;
}
export interface FullPageCourseCardPropsType {
  courseDetails: CreateCourseResponse;
}
export interface SingleCourseCardProps {
  course: CreateCourseResponse;
}
export interface ButtonWithSpinnerProps {
  onClick?: () => any | MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string | undefined;
  w?: number | undefined;
  type?: string | undefined;
  h?: number | undefined;
  spinnerClassName?: string | undefined;
  [key: string]: any;
  children: React.ReactNode;
}
export interface CourseFormValues {
  thumbnail: string;
  name: string;
  author: string;
  description: string;
}
