import { useEffect, useState } from "react";
import { CreateCourseResponse } from "../Components/CreateCourseForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import FullPageCourseCard from "../Components/FullPageCourseCard";

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
          `${process.env.REACT_APP_SERVER_URL}/course/fetch/${courseId}`
        );
        console.log({ courseData });
        setCourseDetails({ ...courseData });
      } catch (error) {
        console.error(error);
      }
    }
    getCourseDetails(courseId!);
  }, []);
  return <div>{<FullPageCourseCard {...{ courseDetails }} />}</div>;
};

export default CourseDetails;
