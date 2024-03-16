export interface CourseFormValues {
    thumbnail: string;
    name: string;
    author: string;
    description: string;
  }
  
  export interface CreateCourseResponse {
    _id: string;
    thumbnail: string;
    name: string;
    author: string;
    description: string;
  }
  export interface FullPageCourseCardPropsType {
    courseDetails: CreateCourseResponse;
  }
  export interface SingleCourseCardProps {
    course: CreateCourseResponse;
  }
  