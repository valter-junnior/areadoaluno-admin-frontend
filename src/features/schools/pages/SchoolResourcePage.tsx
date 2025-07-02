import { useRoute } from "@/app/hooks/useRoute";
import { AppResource } from "@/features/resources/components/AppResource";
import { toast } from "sonner";
import { z } from "zod";

const createSchoolschema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100),
  domain: z.string().min(3, "Domínio inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  logo: z.any().optional(),
  mini_logo: z.any().optional(),
  video_type: z.enum(["youtube", "panda", "drive"]),
});

const updateSchoolschema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100),
  domain: z.string().min(3, "Domínio inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
  logo: z.any().optional(),
  mini_logo: z.any().optional(),
  video_type: z.enum(["youtube", "panda", "drive"]),
});

export const SchoolResourcePage = () => {
  const route = useRoute();
  return (
    <AppResource
      label="Escolas"
      resourceKey="schools"
      endpoint={"/schools"}
      breadcrumbs={[{ title: "Escolas", href: "/schools" }]}
      actions={[
        {
          label: "Gerenciar",
          onClick: (row: any) => {
            route.withSchool(row.domain).redirect("/");
          },
          variant: "default",
        },
        {
          label: "Copiar",
          onClick: (row: any) => {
            const url = `${window.location.origin}/${row.domain}`;
            navigator.clipboard
              .writeText(url)
              .then(() => {
                toast.success("URL copiada para a área de transferência");
              })
              .catch((err) => {
                console.error("Erro ao copiar:", err);
              });
          },
          variant: "default",
        },
        {
          label: "Bloquear",
          onClick: () => {},
          variant: "default",
        },
      ]}
      columns={[
        { label: "ID", key: "id" },
        { label: "Nome", key: "domain" },
        { label: "Domínio", key: "name" },
        { label: "Email", key: "email" },
      ]}
      updateSchema={updateSchoolschema}
      createSchema={createSchoolschema}
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
