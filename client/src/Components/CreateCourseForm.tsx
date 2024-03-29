import useCreateCourseForm from "../hooks/useCreateCourseForm";
import ButtonWithSpinner from "./ButtonWithSpinner";

const CourseForm = () => {
  const { formValues, handleChange, handleImageChange, handleSubmit } =
    useCreateCourseForm();
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-screen bg-white"
    >
      <h1 className="text-3xl font-serif text-violet-800 mb-32 w-full text-center">
        Create a brand new course Here
      </h1>
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
              className="h-[200px] w-[200px] object-fit rounded-md"
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
      <ButtonWithSpinner
        type="submit"
        onFormSubmit={handleSubmit}
        w={20}
        h={20}
        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </ButtonWithSpinner>
    </form>
  );
};

export default CourseForm;
