import { useBuildSchoolEndpoint } from "@/app/hooks/useBuildSchoolEndpoint ";
import { AppResource } from "@/features/resources/components/AppResource";
import { z } from "zod";

const createStudentschema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100),
  domain: z.string().min(3, "Domínio inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  logo: z.any().optional(),
  mini_logo: z.any().optional(),
  video_type: z.enum(["youtube", "panda", "drive"]),
});

const updateStudentschema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100),
  domain: z.string().min(3, "Domínio inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
  logo: z.any().optional(),
  mini_logo: z.any().optional(),
  video_type: z.enum(["youtube", "panda", "drive"]),
});

export const StudentResourcePage = () => {
  const buildSchoolEndpoint = useBuildSchoolEndpoint();

  return (
    <AppResource
      label="Alunos"
      resourceKey="students"
      withSchool={true}
      endpoint={buildSchoolEndpoint("/students")}
      breadcrumbs={[{ title: "Alunos", href: "/students" }]}
      actions={[
        {
          label: "Bloquear",
          onClick: () => {},
          variant: "default",
        },
      ]}
      columns={[
        { label: "ID", key: "id" },
        { label: "Nome", key: "name" },
      ]}
      updateSchema={updateStudentschema}
      createSchema={createStudentschema}
      fields={[
        { name: "name", label: "Nome", type: "text" },
        { name: "domain", label: "Domínio", type: "text" },
        { name: "logo", label: "Logo", type: "image", colSpan: "1" },
        { name: "mini_logo", label: "Mini Logo", type: "image", colSpan: "1" },
        {
          name: "video_type",
          label: "Tipo de vídeo",
          type: "radio",
          className: "flex",
          options: [
            { label: "YouTube", value: "youtube" },
            { label: "Panda", value: "panda" },
            { label: "Drive", value: "drive" },
          ],
        },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Senha", type: "password" },
      ]}
    />
  );
};
