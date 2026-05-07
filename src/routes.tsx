import { createBrowserRouter } from "react-router"
import { RoutesUrl } from "./utils/enum/routes.utils"
import Home from "./pages/home/home"
import Projects from "./pages/projects/projects"
import OutletPage from "./pages/outlet/outlet-page"
import ProjectDetails from "./pages/project-details/project-details"

export const routes = createBrowserRouter([
  {
    path: RoutesUrl.HOME,
    element: <OutletPage />,
    children: [
      { index: true, element: <Home /> },
      { path: RoutesUrl.PROJECTS, element: <Projects /> },
      { path: RoutesUrl.PROJECT_DETAILS, element: <ProjectDetails /> },
    ],
  },
])
