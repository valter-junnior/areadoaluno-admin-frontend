import { useParams } from "react-router-dom";

export const useBuildSchoolEndpoint = () => {
  const { school } = useParams();

  return (endpoint: string): string => {
    if (!school) throw new Error("School param not found in route.");
    const cleanEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    return `/${school}/${cleanEndpoint}`;
  };
};
