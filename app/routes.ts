import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("./pages/login.tsx"),
    route("projeto/list", "./pages/project/list.project.tsx"),
    route("projeto/create", "./pages/project/create.project.tsx"),
    route("projeto/update/:id", "./pages/project/update.project.tsx"),
    route("help", "routes/home.tsx"),
] satisfies RouteConfig
