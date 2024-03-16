export const ROUTES = {
  DELETE: (_id: string) =>
    `${process.env.REACT_APP_SERVER_URL}/course/delete-course/${_id}`,
  FETCH_ALL: `${process.env.REACT_APP_SERVER_URL}/course/fetch-all-course`,
  FETCH_BY_ID: (courseId: string) =>
    `${process.env.REACT_APP_SERVER_URL}/course/fetch/${courseId}`,
  FILTER_BY_AUTHORS: (author: string) =>
    `${process.env.REACT_APP_SERVER_URL}/course/filter-by-authors?author=${author}`,
  UPDATE_COURSE: (_id: string) =>
    `${process.env.REACT_APP_SERVER_URL}/course/update-course/${_id}`,
  CREATE_COURSE: `${process.env.REACT_APP_SERVER_URL}/course/create-course`,
};
