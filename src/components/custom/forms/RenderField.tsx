import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";
import { buildColSpan, buildRowSpan } from "@/app/utils/buildGrid";

const RenderField = ({ field, formData, handleChange, errors }: any) => {
  const value = formData[field.name] ?? field.default ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const errorMessages = errors?.[field.name] || [];

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleInputChange = (newValue: any) => {
    handleChange(field.name, newValue);
    field.onChange?.(newValue);
  };

  const sharedProps = {
    id: field.name,
    name: field.name,
    value: value,
    onChange: (e: any) => handleInputChange(e.target.value),
    placeholder: field.placeholder,
  };

  // Atualiza o preview se for um novo arquivo
  useEffect(() => {
    if (field.type === "image" && value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url); // Cleanup
    } else if (typeof value === "string") {
      setPreviewUrl(value); // URL existente (payload)
    }
  }, [value, field.type]);

  return (
    <div
      key={field.name}
      className={clsx(
        "flex flex-col gap-2",
        field.className,
        buildColSpan(field.colSpan),
        buildRowSpan(field.rowSpan)
      )}
    >
      <Label className="mb-1" htmlFor={field.name}>
        {field.label}
      </Label>

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
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      ) : field.type === "radio" && Array.isArray(field.options) ? (
        <RadioGroup
          value={value}
          onValueChange={(val) => handleInputChange(val)}
          className={field.className ?? "flex flex-col gap-2"}
        >
          {field.options.map((option: any) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`${field.name}-${option.value}`}
              />
              <Label htmlFor={`${field.name}-${option.value}`}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : field.type === "image" ? (
        <>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Pré-visualização"
              className="h-32 w-32 object-cover rounded border"
            />
          )}
          <Input
            className="cursor-pointer"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleInputChange(file);
            }}
          />
        </>
      ) : field.type === "select" && Array.isArray(field.options) ? (
        <select {...sharedProps} className="border rounded px-3 py-2 text-sm">
          <option value="">Selecione</option>
          {field.options.map((option: any) => (
            <option key={option.value} value={option.value} selected={value === option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "element" ? (
        <div className={clsx("flex items-center", field.className)}>
          {field?.element}
        </div>
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

export default RenderField;
