import { AppForm } from "@/components/custom/AppForm";

export const SchoolsForm = ({ payload, onSuccess } :  {
    payload?: any,
    onSuccess?: () => void
}) => {
  return (
    <AppForm
      endpoint="/schools"
      payload={payload}
      onSuccess={() => {
        if(onSuccess) onSuccess();
      }}
      fields={[
        {
          name: "name",
          label: "Nome",
          type: "text",
        },
        {
          name: "domain",
          label: "Domínio",
          type: "text",
        },
        {
          name: "logo",
          label: "Logo",
          type: "image",
        },
        {
          name: "mini_logo",
          label: "Mini Logo",
          type: "image",
        },
        {
          name: "Tipo de video",
          label: "Tipo de video",
          type: "radio",
          options: [
            { label: "YouTube", value: "youtube" },
            { label: "Panda", value: "panda" },
            { label: "Drive", value: "drive" },
          ],
        },
        {
          name: "email",
          label: "Email",
          type: "email",
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
        },
      ]}
    />
  );
};
