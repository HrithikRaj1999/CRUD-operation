import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCourseContext } from "../context/CourseContext";
import { CreateCourseResponse } from "../util/types";
import { ROUTES } from "../util/Routes";
import toast from "react-hot-toast";
export const useFullPageCourseCard = (courseDetails: CreateCourseResponse) => {
  const navigate = useNavigate();
  const { setAllCourses } = useCourseContext();
  const { _id, thumbnail, name, author, description, createdAt } =
    courseDetails;

  const handleEditCourse = () => {
    navigate("/edit-course", {
      state: { courseDetails, isEdit: true },
    });
  };
  const handleDeleteCourse = async () => {
    try {
      await axios.delete(ROUTES.DELETE(_id));
      toast.success("Course deleted successfully");
    } catch (error) {
      if (error) toast.error(error.toString());
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
    createdAt,
    handleEditCourse,
    handleDeleteCourse,
  };
};
