import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home-page/HomePage";
import RepoPage from "@/pages/repo-page/RepoPage";

export const router = createBrowserRouter([
  { path: "/tk-test/", element: <HomePage /> },
  { path: "/tk-test/repo/:owner/:name", element: <RepoPage /> },
]);
