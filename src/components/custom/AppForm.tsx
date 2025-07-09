import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  postResourceService,
  putResourceService,
} from "@/app/services/apiService";
import RenderField from "./forms/RenderField";
import { toast } from "sonner";
import { ZodSchema, ZodError } from "zod";
import clsx from "clsx";
import { buildGrid } from "@/app/utils/buildGrid";

export type FieldOption = {
  label: string;
  value: string;
  checked?: boolean;
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
  default?: any;
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
  validationSchema?: ZodSchema<any>;
};

export function AppForm({
  endpoint,
  keyField = "id",
  fields,
  payload = {},
  onSuccess,
  colSpan = 2,
  validationSchema,
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
      toast.success("Formulário enviado com sucesso!");
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

    if (validationSchema) {
      try {
        validationSchema.parse(formData);
        mutation.mutate();
      } catch (err: any) {
        if (err instanceof ZodError) {
          const fieldErrors: Record<string, string[]> = {};
          err.errors.forEach((error) => {
            const field = error.path[0];
            if (!fieldErrors[field]) fieldErrors[field] = [];
            fieldErrors[field].push(error.message);
          });
          setErrors(fieldErrors);
          return;
        }
      }
    } else {
      mutation.mutate();
    }
  };

  return (
    <div className="flex flex-col max-h-[70vh]">
      <div className="overflow-y-auto scroll-slim p-4 flex-1">
        <form
          onSubmit={handleSubmit}
            className={clsx(
              "grid gap-4",
              buildGrid(colSpan)
            )}
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
