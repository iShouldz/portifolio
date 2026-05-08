import { createBrowserRouter } from "react-router"
import { RoutesUrl } from "./utils/enum/routes.utils"
import Home from "./pages/home/home"
import Projects from "./pages/projects/projects"
import OutletPage from "./pages/outlet/outlet-page"
import ProjectDetails from "./pages/project-details/project-details"
import Experiencies from "./pages/experiencies/experiencies"
import Resume from "./pages/resume/resume"
import AboutContact from "./pages/about-me/about-me"

export const routes = createBrowserRouter([
  {
    path: RoutesUrl.HOME,
    element: <OutletPage />,
    children: [
      { index: true, element: <Home /> },
      { path: RoutesUrl.RESUME, element: <Resume /> },
      { path: RoutesUrl.PROJECTS, element: <Projects /> },
      { path: RoutesUrl.ABOUT, element: <AboutContact /> },
      { path: RoutesUrl.EXPERIENCIES, element: <Experiencies /> },
      { path: RoutesUrl.PROJECT_DETAILS, element: <ProjectDetails /> },
    ],
  },
])
