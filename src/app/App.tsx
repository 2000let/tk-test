import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routing/routes";
import { withProviders } from "@/app/providers/withProviders";
import "./styles/global.css";

const App: React.FC = () => {
  return withProviders(<RouterProvider router={router} />);
};

export default App;
