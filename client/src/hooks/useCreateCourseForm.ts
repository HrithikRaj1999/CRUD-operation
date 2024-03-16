import React from "react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";
import { ROUTES } from "../util/Routes";
import { CreateCourseResponse } from "../util/types";

interface CourseFormValues {
  thumbnail: string;
  name: string;
  author: string;
  description: string;
}
export const useCreateCourseForm = () => {
  const location = useLocation();
  const { allCourses, setAllCourses } = useCourseContext();
  const editCourseIsTrue = location.state?.isEdit ? true : false;
  const courseDetails = location.state?.courseDetails; //only upon edit location
  const initValues = courseDetails || {
    thumbnail: "",
    name: "",
    author: "",
    description: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<CourseFormValues>(initValues);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //generally we use firebase or google cloud we donot store the files directly in mongo db
  //this is just for small images else crashing of db might take place
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setFormValues((prev) => ({
            ...prev,
            thumbnail: reader?.result?.toString()!,
          }));
        }
      };

      reader.readAsDataURL(file);
    } else {
      setFormValues((prev) => ({
        ...prev,
        thumbnail: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response: AxiosResponse;
    try {
      if (editCourseIsTrue) {
        //edit
        response = await axios.put(
          ROUTES.UPDATE_COURSE(courseDetails._id),
          formValues
        );
        setAllCourses((prev) => {
          if (prev) {
            const oldCourse = [...prev];
            return oldCourse.map((courseDetails) => {
              if (courseDetails._id === response?.data?._id) {
                return { ...response.data };
              } else {
                return courseDetails;
              }
            });
          }
        });
      } else {
        //create
        response = await axios.post(ROUTES.CREATE_COURSE, formValues);
        setAllCourses((prev) => {
          if (Array.isArray(prev)) return [...prev, response.data];
          else return [...response.data];
        });
      }
      navigate(`/course-details/${response.data?._id}`);
      setFormValues({
        thumbnail: "",
        name: "",
        author: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { formValues, handleChange, handleImageChange, handleSubmit };
};
export default useCreateCourseForm;
