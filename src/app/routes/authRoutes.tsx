import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ClassroomResourcePage } from "@/features/classrooms/pages/ClassroomResourcePage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { DashboardSchoolPage } from "@/features/dashboard/pages/DashboardSchoolPage";
import { MatterResourcePage } from "@/features/matters/pages/MatterResourcePage";
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
        element: <Navigate to="/admin" />,
      },
      {

        path: "/admin",
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "escolas",
            element: <SchoolResourcePage />,
          },
        ],
      },
      {

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
          {
            path: "turmas",
            element: <ClassroomResourcePage />,
          },
          {
            path: "turmas/:classroom/materias",
            element: <MatterResourcePage />,
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
