import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FullPageCourseCard from "../Components/FullPageCourseCard";
import { CreateCourseResponse } from "../util/types";
import { ROUTES } from "../util/Routes";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState<CreateCourseResponse>({
    _id: "",
    thumbnail: "",
    name: "",
    author: "",
    description: "",
  });
  useEffect(() => {
    async function getCourseDetails(courseId: string) {
      try {
        const { data: courseData } = await axios.get<CreateCourseResponse>(
          ROUTES.FETCH_BY_ID(courseId)
        );
        setCourseDetails({ ...courseData });
      } catch (error) {
        console.error(error);
      }
    }
    getCourseDetails(courseId!);
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      {<FullPageCourseCard {...{ courseDetails }} />}
    </div>
  );
};

export default CourseDetails;
