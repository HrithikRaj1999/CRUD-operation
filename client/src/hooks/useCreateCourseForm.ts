import React, { useLayoutEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";
import { ROUTES } from "../util/Routes";
import toast from "react-hot-toast";
import { CourseFormValues } from "../util/types";

export const useCreateCourseForm = () => {
  const location = useLocation();
  const { setAllCourses } = useCourseContext();

  const editCourseIsTrue = location.state?.isEdit ? true : false;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<CourseFormValues>({
    _id: "",
    thumbnail: "",
    name: "",
    author: "",
    description: "",
  });
  useLayoutEffect(() => {
    const courseDetails = location.state?.courseDetails ?? {
      thumbnail: "",
      name: "",
      author: "",
      description: "",
    };
    setFormValues(courseDetails);
  }, []);
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
      toast.success("Image uploaded successfully");
    } else {
      setFormValues((prev) => ({
        ...prev,
        thumbnail: "",
      }));
      toast.error("Image uploaded Failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response: AxiosResponse;
    try {
      if (editCourseIsTrue) {
        //edit
        response = await axios.put(
          ROUTES.UPDATE_COURSE(formValues._id),
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
        toast.success("Edited successfully");
      } else {
        //create
        response = await axios.post(ROUTES.CREATE_COURSE, formValues);
        setAllCourses((prev) => {
          if (Array.isArray(prev)) return [...prev, response.data];
          else return [...response.data];
        });
      toast.success("Course Created successfully");
      }
      navigate(`/course-details/${response.data?._id}`);
      setFormValues({
        thumbnail: "",
        name: "",
        author: "",
        description: "",
        _id: "",
      });
    } catch (error) {
      if (error) toast.error(error.toString());
    }
  };
  return { formValues, handleChange, handleImageChange, handleSubmit };
};
export default useCreateCourseForm;
