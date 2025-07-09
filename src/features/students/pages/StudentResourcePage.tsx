import { useBuildSchoolEndpoint } from "@/app/hooks/useBuildSchoolEndpoint";
import { AppResource } from "@/features/resources/components/AppResource";
import { z } from "zod";

const createStudentschema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),

  registration_number: z.coerce.string().optional().nullable(),
  national_id: z.coerce.string().optional().nullable(),
  identity_document: z.string().optional().nullable(),
  issuing_agency: z.string().optional().nullable(),
  issue_date: z.coerce.string().optional().nullable(),
  birth_date: z.coerce.string().optional().nullable(),

  gender: z
    .enum(["male", "female", "other"])
    .default("male")
    .optional()
    .nullable(),

  phone_primary: z.coerce.string().optional().nullable(),
  phone_secondary: z.coerce.string().optional().nullable(),

  postal_code: z.coerce.string().optional().nullable(),
  address: z.string().optional().nullable(),
  address_complement: z.string().optional().nullable(),
  address_number: z.coerce.string().optional().nullable(),
  city: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  state: z.string().optional().nullable(),

  status: z.enum(["active", "blocked", "pre_registered"]).default("active"),
  observation: z.string().optional().nullable(),
});

const updateStudentschema = createStudentschema.extend({
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
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
      columns={[
        { label: "ID", key: "id" },
        { label: "Matrícula", key: "registration_number" },
        { label: "Nome", key: "name" },
        {
          label: "Status",
          key: "status",
          render: (value: any) =>
            value == "active"
              ? "Ativo"
              : value == "blocked"
              ? "Bloqueado"
              : "Pré-matrícula",
        },
      ]}
      formsConfig={{
        colSpan: 4,
        initialData: {
          gender: "male",
          status: "active",
        },
      }}
      updateSchema={updateStudentschema}
      createSchema={createStudentschema}
      fields={[
        {
          name: "registration_number",
          label: "Matrícula",
          type: "text",
          colSpan: 1,
        },
        { name: "name", label: "Nome", type: "text", colSpan: 2 },
        {
          name: "birth_date",
          label: "Data de nascimento",
          type: "date",
          colSpan: 1,
        },
        { name: "national_id", label: "CPF", type: "text", colSpan: 1 },
        { name: "identity_document", label: "RG", type: "text", colSpan: 1 },
        {
          name: "issuing_agency",
          label: "Orgão emissor",
          type: "text",
          colSpan: 1,
        },
        {
          name: "issue_date",
          label: "Data de emissão",
          type: "date",
          colSpan: 1,
        },
        {
          name: "gender",
          label: "Gênero",
          type: "radio",
          default: "male",
          options: [
            { label: "Masculino", value: "male" },
            { label: "Feminino", value: "female" },
            { label: "Outro", value: "other" },
          ],
          colSpan: 2,
        },

        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Ativo", value: "active" },
            { label: "Bloqueado", value: "blocked" },
            { label: "Pré-matrícula", value: "pre_registered" },
          ],
          default: "active",
          colSpan: 2,
        },
        {
          name: "phone_primary",
          label: "Telefone principal",
          type: "text",
          colSpan: 2,
        },
        {
          name: "phone_secondary",
          label: "Telefone secundário",
          type: "text",
          colSpan: 2,
        },
        { name: "postal_code", label: "CEP", type: "text", colSpan: 1 },
        { name: "address", label: "Endereço", type: "text", colSpan: 2 },
        { name: "address_number", label: "Número", type: "text", colSpan: 1 },
        {
          name: "address_complement",
          label: "Complemento",
          type: "text",
          colSpan: 1,
        },
        { name: "city", label: "Cidade", type: "text", colSpan: 1 },
        { name: "neighborhood", label: "Bairro", type: "text", colSpan: 1 },
        { name: "state", label: "Estado", type: "text", colSpan: 1 },
        { name: "observation", label: "Observações", type: "textarea" },
        { name: "email", label: "Email", type: "email", colSpan: 2 },
        { name: "password", label: "Senha", type: "password", colSpan: 2 },
      ]}
    />
  );
};
