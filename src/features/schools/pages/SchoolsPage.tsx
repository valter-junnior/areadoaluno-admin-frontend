import { AppDataTableFetch } from "@/components/custom/AppDataTableFetch";
import { AppModal } from "@/components/custom/AppModal";
import { AppDashboardLayout } from "@/components/layout/AppDashboardLayout";
import { useRef, useState } from "react";
import { SchoolsForm } from "../components/SchoolsForm";
import { AppDeleteModal } from "@/components/custom/AppDeleteModal";

export const SchoolsPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const appDataTableFetch = useRef<any>(null);

  const refreshAppDataTableFetch = () => {
    appDataTableFetch.current?.refresh();
  };

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <AppDashboardLayout breadcrumbs={[{ title: "Escolas", href: "/escolas" }]}>
      <AppDataTableFetch 
        ref={appDataTableFetch}
        endpoint="/schools"
        resourceKey="schools"
        onAdd={() => {
          setPayload({});
          toggleForm();
        }}
        onEdit={(row) => {
          setPayload(row);
          toggleForm();
        }}
        onDelete={(row) => {
          setPayload(row);
          setDeleteModalOpen(true);
        }}
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
          {
            label: "Bloquear",
            onClick: () => {},
            variant: "default",
          }
        ]}
        columns={[
          { label: "ID", key: "id" },
          { label: "Nome", key: "domain" },
          { label: "Domínio", key: "name" },
          { label: "Email", key: "email" },
        ]}
      />

      <AppModal open={formOpen} onOpenChange={setFormOpen} title="Adicionar Escola" size="lg">
        <SchoolsForm payload={payload} onSuccess={() => {
          toggleForm();
          refreshAppDataTableFetch();
        }} />
      </AppModal>

      <AppDeleteModal
        endpoint="/schools"
        id={payload.id}
        label="escola"
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onSuccess={() => {
          refreshAppDataTableFetch();
        }}
      />

    </AppDashboardLayout>
  );
};
