import { GraduationCap, SquareTerminal } from "lucide-react";

export const routes = {
  admin: {
    index : {
        path: "/dashboard",
        title: "Dashboard",
        icon: SquareTerminal,
    },
    schools : {
        path: "/escolas",
        title: "Escolas",
        icon: GraduationCap,
    }
  },
  school : {
    index : {
        path: "/",
        title: "Dashboard",
        icon: SquareTerminal,
    },
    students : {
        path: "/alunos",
        title: "Alunos",
        icon: GraduationCap,
    },
    classrooms : {
      path: "/turmas",
      title: "Turmas",
      icon: GraduationCap,
    },
    matters : {
      path: "/turmas/:classroom/materias",
      title: "Materias",
      icon: GraduationCap,
    }
  }
};
