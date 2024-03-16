import SingleCourseCard from "../Components/SingleCourseCard";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";
import Filter from "../Components/Filter";
import LoadingSpinner from "../Components/LoadingSpinner";

const Home = () => {
  const { allCourses } = useCourseContext();
  if (!allCourses?.length) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-1 gap-2">
      <Filter />
      <div className="flex flex-row flex-wrap justify-center  m-5 p-4 gap-7">
        {allCourses?.length
          ? allCourses?.map((course) => (
              <Link to={`/course-details/${course._id}`}>
                <SingleCourseCard key={course._id} {...{ course }} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
