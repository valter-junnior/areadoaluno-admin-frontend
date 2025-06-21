import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { SchoolsPage } from "@/features/schools/pages/SchoolsPage";
import { Navigate } from "react-router-dom";
import { type RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/escolas",
        element: <SchoolsPage />,
      },
    ],
  },
];
