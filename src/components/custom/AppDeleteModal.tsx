import { useMutation } from "@tanstack/react-query";
import { deleteResourceService } from "@/app/services/apiService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

type AppDeleteModalProps = {
  endpoint: string;
  id: string | number;
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function AppDeleteModal({
  endpoint,
  id,
  label,
  open,
  onOpenChange,
  onSuccess,
}: AppDeleteModalProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      const url = `${endpoint}/${id}`;
      return await deleteResourceService(url);
    },
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Erro ao excluir:", error);
      // Você pode exibir toasts aqui
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir {label}</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta <strong>{label}</strong>? Essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={mutation.isPending}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
