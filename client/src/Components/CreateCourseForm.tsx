import axios from "axios";
import React, { PropsWithChildren, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CourseFormValues {
  thumbnail: string;
  name: string;
  author: string;
  description: string;
}

export interface CreateCourseResponse {
  _id: string;
  thumbnail: string;
  name: string;
  author: string;
  description: string;
}

const CourseForm = () => {
  const location = useLocation();

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
    let response = null;
    try {
      if (editCourseIsTrue) {
        console.log({ editCourseIsTrue, formValues });
        response = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/course/update-course/${courseDetails._id}`,
          formValues
        );
      } else {
        response = await axios.post<CreateCourseResponse>(
          `${process.env.REACT_APP_SERVER_URL}/course/create-course`,
          formValues
        );
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
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-screen bg-white p-4"
    >
      <div className="flex flex-col mb-5 w-full max-w-md">
        <label
          htmlFor="thumbnail"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Thumbnail URL
        </label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          accept="image/*"
          onChange={handleImageChange}
          className="border-2 border-gray-300 rounded-md p-2 text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {formValues.thumbnail ? (
          <div className="mt-2 flex justify-center">
            <img
              src={formValues.thumbnail}
              alt="Thumbnail"
              className="h-full w-full object-fit rounded-md"
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col mb-5 w-full max-w-md">
        <label
          htmlFor="name"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md p-3 text-sm w-full"
          required
        />
      </div>
      <div className="flex flex-col mb-5 w-full max-w-md">
        <label
          htmlFor="author"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Author"
          value={formValues.author}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md p-3 text-sm w-full"
          required
        />
      </div>
      <div className="flex flex-col mb-5 w-full max-w-md">
        <label
          htmlFor="description"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={formValues.description}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md p-3 text-sm w-full"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
