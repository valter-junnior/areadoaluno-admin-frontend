import { useBuildSchoolEndpoint } from "@/app/hooks/useBuildSchoolEndpoint";
import { useRoute } from "@/app/hooks/useRoute";
import { AppResource } from "@/features/resources/components/AppResource";
import { z } from "zod";

const createMatterschema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100),
  type: z.enum(["matter", "weekly_lists"]).default("matter"),
});

const updateMatterschema = createMatterschema;

export const MatterResourcePage = () => {
  const route = useRoute();

  const buildSchoolEndpoint = useBuildSchoolEndpoint();

  return (
    <AppResource
      label="Turmas"
      resourceKey="classrooms"
      withSchool={true}
      endpoint={buildSchoolEndpoint("/classrooms")}
      breadcrumbs={[{ title: "Turmas", href: "/classrooms" }]}
      actions={[
        {
          label: "Trabalhos",
          onClick: (row: any) => {
            route
              .withSchool(row.domain)
              .redirect(`/turmas/${row.id}/trabalhos/`);
          },
          variant: "default",
        },
      ]}
      columns={[
        { label: "ID", key: "id" },
        { label: "Nome", key: "name" },
        {
          label: "Tipo",
          key: "type",
          render: (value: any) =>
            value == "matter" ? "Matéria" : "Lista Semanal",
        },
      ]}
      formsConfig={{
        colSpan: 2,
        size: "sm",
        initialData: {
          type: "matter",
        },
      }}
      updateSchema={updateMatterschema}
      createSchema={createMatterschema}
      fields={[
        { name: "name", label: "Nome", type: "text" },
        { name: "description", label: "Descrição", type: "textarea" },
        { name: "about", label: "Sobre", type: "textarea" },
        { name: "cover", label: "Capa", type: "image" },
        { name: "banner", label: "Banner", type: "image" },
        { name: "banner_mobile", label: "Banner Mobile", type: "image" },
        { name: "pdf", label: "PDF", type: "file" },
        { name: "live", label: "Link Live", type: "url" },
        {
          name: "type",
          label: "Tipo",
          className: "flex",
          type: "radio",
          options: [
            { label: "Matéria", value: "matter" },
            { label: "Lista Semanal", value: "weekly_lists" },
          ],
          default: "matter",
        },
      ]}
    />
  );
};
