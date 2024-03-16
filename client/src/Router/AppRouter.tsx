import { Suspense, lazy } from "react";
import Layout from "../Components/Layout";
import { createBrowserRouter } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import { EditPage } from "../Pages/EditPage";

const HomePage = lazy(() => import("../Pages/Home"));
const CourseDetailPage = lazy(() => import("../Pages/CourseDetails"));
const CreatePage = lazy(() => import("../Pages/CreateCourse"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <HomePage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: "/course-details/:courseId",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <CourseDetailPage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: "/create-course",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <CreatePage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: "/edit-course",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <EditPage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>No Page Found</h1>,
  },
]);
export default appRouter;
