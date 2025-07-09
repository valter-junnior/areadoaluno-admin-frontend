import { AppDataTableFetch } from "@/components/custom/AppDataTableFetch";
import { AppModal } from "@/components/custom/AppModal";
import { AppDashboardLayout } from "@/components/layout/AppDashboardLayout";
import { useRef, useState } from "react";
import { AppDeleteModal } from "@/components/custom/AppDeleteModal";
import { AppForm } from "@/components/custom/AppForm";

export const AppResource = ({
  label,
  breadcrumbs,
  withSchool = false,
  endpoint,
  resourceKey,
  actions,
  columns,
  fields,
  updateSchema,
  createSchema,
  formsConfig = {}
}: {
  label: string;
  breadcrumbs: any;
  withSchool?: boolean;
  endpoint: string;
  resourceKey: string;
  actions?: any;
  columns: any[];
  fields: any[];
  updateSchema: any;
  createSchema: any;
  formsConfig?: any
}) => {
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
    <AppDashboardLayout sidebarMenu={withSchool ? "school" : "admin" } breadcrumbs={breadcrumbs}>
      <AppDataTableFetch
        ref={appDataTableFetch}
        endpoint={endpoint}
        resourceKey={resourceKey}
        onAdd={() => {
          setPayload({
            ...formsConfig?.initialData,
          });
          toggleForm();
        }}
        onEdit={(row) => {
          setPayload({
            ...formsConfig?.initialData,
            ...row,
          });
          toggleForm();
        }}
        onDelete={(row) => {
          setPayload(row);
          setDeleteModalOpen(true);
        }}
        actions={actions}
        columns={columns}
      />

      <AppModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={`${payload?.id ? "Editar" : "Adicionar"} ${label}`}
        size={ formsConfig.size || "lg" }
      >
        <AppForm
          endpoint={endpoint}
          payload={payload}
          validationSchema={payload?.id ? updateSchema : createSchema}
          onSuccess={() => {
            toggleForm();
            refreshAppDataTableFetch();
          }}
          fields={fields}
          colSpan={formsConfig.colSpan || 2}
        />
      </AppModal>

      <AppDeleteModal
        endpoint={endpoint}
        id={payload.id}
        label={label}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onSuccess={() => {
          refreshAppDataTableFetch();
        }}
      />
    </AppDashboardLayout>
  );
};
