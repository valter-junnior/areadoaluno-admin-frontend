import { AppDataTableFetch } from "@/components/custom/AppDataTableFetch";
import { AppModal } from "@/components/custom/AppModal";
import { AppDashboardLayout } from "@/components/layout/AppDashboardLayout";
import { useState } from "react";
import { SchoolsForm } from "../components/SchoolsForm";

export const SchoolsPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <AppDashboardLayout breadcrumbs={[{ title: "Escolas", href: "/escolas" }]}>
      <AppDataTableFetch 
        endpoint="/schools"
        resourceKey="schools"
        onAdd={toggleForm}
        onEdit={(row) => {
          setPayload(row);
          toggleForm();
        }}
        onDelete={() => {}}
        actions={[
          {
            label: "Gerenciar",
            onClick: () => {},
            variant: "default",
          },
          {
            label: "Copiar",
            onClick: () => {},
            variant: "default",
          },
        ]}
        columns={[
          { label: "ID", key: "id" },
          { label: "Nome", key: "domain" },
        ]}
      />

      <AppModal open={formOpen} onOpenChange={setFormOpen} title="Adicionar Escola">
        <SchoolsForm payload={payload} onSuccess={toggleForm} />
      </AppModal>
    </AppDashboardLayout>
  );
};
