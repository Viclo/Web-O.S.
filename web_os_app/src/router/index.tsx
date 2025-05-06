import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import PlayGame from "../pages/PlayGame";
import Quiz from "../pages/Quiz";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "play-game", element: <PlayGame /> },
      { path: "quiz", element: <Quiz /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
