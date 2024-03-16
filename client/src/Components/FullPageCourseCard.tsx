import { useFullPageCourseCard } from "../hooks/useFullPageCourseCard";
import { ConvertDateIntoReadible } from "../util/functions";
import { FullPageCourseCardPropsType } from "../util/types";

const FullPageCourseCard = (props: FullPageCourseCardPropsType) => {
  const {
    thumbnail,
    name,
    author,
    description,
    createdAt,
    handleEditCourse,
    handleDeleteCourse,
  } = useFullPageCourseCard(props.courseDetails);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-8 p-6 shadow-lg rounded-lg bg-white">
      <div className="w-full h-80 overflow-hidden rounded-xl shadow-md mb-6">
        <img src={thumbnail} alt="Course" className="object-fit w-full h-full" />
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold text-gray-900">
          {name.toUpperCase()}
        </h3>
        <h5 className="text-xl font-semibold text-indigo-600">
          Author: {author}
        </h5>
        <p className="text-gray-700">
          <span className="font-semibold">Description:</span> {description}
        </p>
        <p className="text-sm text-gray-500">
          Created at: {ConvertDateIntoReadible(createdAt!)}
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleEditCourse}
          className="bg-blue-500 hover:bg-blue-700 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteCourse}
          className="bg-red-500 hover:bg-red-700 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FullPageCourseCard;
