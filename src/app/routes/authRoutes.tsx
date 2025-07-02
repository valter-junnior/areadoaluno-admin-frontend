import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { DashboardSchoolPage } from "@/features/dashboard/pages/DashboardSchoolPage";
import { SchoolResourcePage } from "@/features/schools/pages/SchoolResourcePage";
import { StudentResourcePage } from "@/features/students/pages/StudentResourcePage";
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
        element: <SchoolResourcePage />,
      },{

        path: "/:school",
        children: [
          {
            index: true,
            element: <DashboardSchoolPage />,
          },
          {
            path: "alunos",
            element: <StudentResourcePage />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      }
    ],
  },
];
