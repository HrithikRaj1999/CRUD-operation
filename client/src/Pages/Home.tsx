import { useEffect } from "react";
import { CreateCourseResponse } from "../Components/CreateCourseForm";
import axios from "axios";
import SingleCourseCard from "../Components/SingleCourseCard";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";

const Home = () => {
  const { allCourses, setAllCourses } = useCourseContext();
  async function getAllCourse() {
    try {
      const { data: courses } = await axios.get<CreateCourseResponse[]>(
        `${process.env.REACT_APP_SERVER_URL}/course/fetch-all-course`
      );
      setAllCourses([...courses]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAllCourse();
  }, []);
  return (
    <div className="flex flex-row justify-center items-center m-5 p-4 gap-7">
      {allCourses.length
        ? allCourses.map((course) => (
            <Link to={`/course-details/${course._id}`}>
              <SingleCourseCard key={course._id} {...{ course }} />
            </Link>
          ))
        : null}
    </div>
  );
};

export default Home;
