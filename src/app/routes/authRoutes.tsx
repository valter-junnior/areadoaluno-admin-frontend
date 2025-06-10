import { Navigate } from "react-router-dom";
import { type RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    // element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
    ],
  },
];
