import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  postResourceService,
  putResourceService,
} from "@/app/services/apiService";
import RenderField from "./forms/RenderField";

export type FieldOption = {
  label: string;
  value: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "password"
    | "image"
    | "radio";
  placeholder?: string;
  onChange?: (value: any) => void;
  options?: FieldOption[];
  colSpan?: string;
  rowSpan?: string;
  className?: string;
};

type AppFormProps = {
  endpoint: string;
  keyField?: string;
  fields: FieldConfig[];
  payload?: Record<string, any>;
  onSuccess?: (response: any) => void;
  colSpan?: number;
};

export function AppForm({
  endpoint,
  keyField = "id",
  fields,
  payload = {},
  onSuccess,
  colSpan = 2,
}: AppFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setFormData(payload || {});
    setErrors({});
  }, [payload]);

  const mutation = useMutation({
    mutationFn: async () => {
      const hasKey = payload?.[keyField];
      const url = hasKey ? `${endpoint}/${payload[keyField]}` : endpoint;

      return hasKey
        ? await putResourceService(url, formData)
        : await postResourceService(url, formData);
    },
    onSuccess: (res) => {
      setErrors({});
      onSuccess?.(res);
    },
    onError: (error: any) => {
      console.error("Erro ao enviar o formulário:", error);
      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    },
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] })); // limpa erro ao digitar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex flex-col max-h-[70vh] min-h-[70vh]">
      <div className="overflow-y-auto scroll-slim p-4 flex-1">
        <form
          onSubmit={handleSubmit}
          className={`grid grid-cols-${colSpan} gap-4`}
        >
          {fields.map((field) => (
            <RenderField
              key={field.name}
              field={field}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          ))}
        </form>
      </div>

      <div className="p-4 text-right">
        <Button type="submit" disabled={mutation.isPending} onClick={handleSubmit}>
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
