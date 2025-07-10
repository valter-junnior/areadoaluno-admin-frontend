import { useParams, useNavigate } from "react-router-dom";

export type RouteBuilder = {
  withSchool: (schoolOverride?: string) => RouteBuilder;
  redirect: (path: string) => void;
  get: (path: string) => string;
  classroom: string | undefined;
};

export const useRoute = (): RouteBuilder => {
  const { school: currentSchool, classroom } = useParams();
  const navigate = useNavigate();

  let schoolOverride: string | undefined;

  const resolveSchool = () => {
    return schoolOverride ?? currentSchool ?? "admin";
  };

  const builder: RouteBuilder = {
    withSchool(school) {
      schoolOverride = school;
      return builder;
    },
    redirect(path: string) {
      const school = resolveSchool();
      const finalPath = school ? `/${school}${path.startsWith("/") ? "" : "/"}${path}` : path;
      navigate(finalPath);
    },
    get(path: string) {
      const school = resolveSchool();
      return school ? `/${school}${path.startsWith("/") ? "" : "/"}${path}` : path;
    },
    get classroom() {
      return classroom;
    }
  };

  return builder;
};
