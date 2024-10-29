import { lazy } from "react";
export const AdminPublicRouter = [
  {
    name: "Login page",
    path: "/",
    component: lazy(() => import("../page/login/Login")),
  },
  {
    name: "Registration Page",
    path: "/register",
    component: lazy(() => import("../page/register/Register")),
  },

  {
    name: "Not found",
    path: "*",
    component: lazy(() => import("../page/login/Login")),
  },

]
export const AdminPrivateRouter = [

  {
    name: "Dashboard Page",
    path: "/dashboard",
    component: lazy(() => import("../page/dashboard/Dashboard")),
  },
  {
    name: "Not found",
    path: "*",
    component: lazy(() => import("../page/dashboard/Dashboard")),
  },
  {
    name: "Add user page",
    path: "/adduser",
    component: lazy(() => import("../page/add user/AddUser")),
  },
  {
    name: "Edit user page",
    path: "/edit/:id",
    component: lazy(() => import("../page/add user/AddUser")),
  },
]