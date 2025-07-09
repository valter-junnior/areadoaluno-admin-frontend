import { useBuildSchoolEndpoint } from "@/app/hooks/useBuildSchoolEndpoint";
import { useRoute } from "@/app/hooks/useRoute";
import { AppResource } from "@/features/resources/components/AppResource";
import { z } from "zod";

const createWorkschema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100),
  type: z.enum(["virtual", "presencial"]).default("virtual"),
});

const updateWorkschema = createWorkschema;

export const WorkResourcePage = () => {
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
          label: "Alunos",
          onClick: (row: any) => {
            route.withSchool(row.domain).redirect(`/turmas/${row.id}/alunos`);
          },

          variant: "default",
        },
        {
          label: "Matérias",
          onClick: (row: any) => {
            route.withSchool(row.domain).redirect(`/turmas/${row.id}/materias`);
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
            value == "virtual" ? "Virtual" : "Presencial",
        },
      ]}
      formsConfig={{
        colSpan: 2,
        size: "sm",
        initialData: {
          type: "virtual",
        },
      }}
      updateSchema={updateWorkschema}
      createSchema={createWorkschema}
      fields={[
        { name: "name", label: "Nome", type: "text" },
        {
          name: "type",
          label: "Tipo",
          className: "flex",
          type: "radio",
          options: [
            { label: "Virtual", value: "virtual" },
            { label: "Presencial", value: "presencial" },
          ],
          default: "virtual",
        },
      ]}
    />
  );
};
