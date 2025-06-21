import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  postResourceService,
  putResourceService,
} from "@/app/services/apiService";

export type FieldOption = {
  label: string;
  value: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "email" | "password" | "image" | "radio";
  placeholder?: string;
  onChange?: (value: any) => void;
  options?: FieldOption[];
  colSpan?: string;
  rowSpan?: string;
};

type AppFormProps = {
  endpoint: string;
  keyField?: string;
  fields: FieldConfig[];
  payload?: Record<string, any>;
  onSuccess?: (response: any) => void;
};

const RenderField = ({ field, formData, handleChange, errors }: any) => {
  const value = formData[field.name] || "";
  const [showPassword, setShowPassword] = useState(false);
  const errorMessages = errors?.[field.name] || [];

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleInputChange = (newValue: any) => {
    handleChange(field.name, newValue);
    field.onChange?.(newValue);
  };

  const sharedProps = {
    id: field.name,
    name: field.name,
    value,
    onChange: (e: any) => handleInputChange(e.target.value),
    placeholder: field.placeholder,
  };

  const wrapperClass = `${field.colSpan || "col-span-2"} ${field.rowSpan || "row-span-2"}`;

  return (
    <div key={field.name} className={`flex flex-col gap-1 ${wrapperClass}`}>
      <Label htmlFor={field.name}>{field.label}</Label>

      {field.type === "textarea" ? (
        <Textarea {...sharedProps} />
      ) : field.type === "password" ? (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...sharedProps}
            className="pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      ) : field.type === "radio" && Array.isArray(field.options) ? (
        <RadioGroup
          value={value}
          onValueChange={(val) => handleInputChange(val)}
          className="flex flex-col gap-2"
        >
          {field.options.map((option: any) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
              <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <Input type={field.type} {...sharedProps} />
      )}

      {errorMessages.length > 0 && (
        <div className="text-red-500 text-sm mt-1">
          {errorMessages.map((msg: string, i: number) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export function AppForm({
  endpoint,
  keyField = "id",
  fields,
  payload = {},
  onSuccess,
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
      const url = hasKey ? `${endpoint}${payload[keyField]}` : endpoint;

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
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
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

      <div className="col-span-full">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
