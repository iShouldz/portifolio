import { createBrowserRouter } from "react-router"
import { RoutesUrl } from "./utils/enum/routes.utils"
import Home from "./pages/home/home"

export const routes = createBrowserRouter([
  { path: RoutesUrl.HOME, element: <Home /> },
])
