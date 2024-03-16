import { useFullPageCourseCard } from "../hooks/useFullPageCourseCard";
import { FullPageCourseCardPropsType } from "../util/types";

const FullPageCourseCard = (props: FullPageCourseCardPropsType) => {
  const {
    thumbnail,
    name,
    author,
    description,
    handleEditCourse,
    handleDeleteCourse,
  } = useFullPageCourseCard(props.courseDetails);
  return (
    <div className="flex justify-center  items-center w-screen h-screen ">
      <div className="flex flex-col justify-center  items-center  w-full h-full p-4 bg-white shadow-md rounded-xl">
        <div className="w-2/12 min-w-[400px] h-2/6 object-fill overflow-hidden rounded-xl shadow-lg">
          <img
            src={thumbnail}
            alt="card"
            className="object-fit  w-full h-full"
          />
        </div>
        <div className="w-full flex flex-col justify-center  items-center  p-6">
          <h5 className="mb-2 text-2xl font-semibold leading-snug tracking-normal text-gray-900">
            {name}
          </h5>
          <h5 className="mb-2 text-xl  text-pretty  leading-snug tracking-normal text-gray-900">
            by {author}
          </h5>
          <p className="text-base font-light leading-relaxed text-gray-700">
            {description}
          </p>
        </div>

        {/* Button or other content can go here */}
        <button onClick={handleEditCourse}>Edit </button>
        <button onClick={handleDeleteCourse}>Delete </button>
      </div>
    </div>
  );
};

export default FullPageCourseCard;
