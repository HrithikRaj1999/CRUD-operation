import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCourseContext } from "../context/CourseContext";
import { CreateCourseResponse } from "../util/types";
import { ROUTES } from "../util/Routes";
export const useFullPageCourseCard = (courseDetails: CreateCourseResponse) => {
  const navigate = useNavigate();
  const { setAllCourses } = useCourseContext();
  const { _id, thumbnail, name, author, description } = courseDetails;

  const handleEditCourse = () => {
    navigate("/edit-course", {
      state: { courseDetails, isEdit: true },
    });
  };
  const handleDeleteCourse = async () => {
    try {
      await axios.delete(ROUTES.DELETE(_id));
    } catch (error) {
      console.log(error);
    }
    setAllCourses((prev) => {
      if (prev) {
        return [...prev?.filter((course) => course._id !== _id)];
      } else {
        return prev;
      }
    });
    navigate("/");
  };
  return {
    _id,
    thumbnail,
    name,
    author,
    description,
    handleEditCourse,
    handleDeleteCourse,
  };
};
