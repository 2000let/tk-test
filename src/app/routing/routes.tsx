import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home-page/HomePage";
import RepoPage from "@/pages/repo-page/RepoPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/repo/:owner/:name", element: <RepoPage /> },
]);
