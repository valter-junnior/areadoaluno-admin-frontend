import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Loader2, EllipsisVertical, Plus, Filter } from "lucide-react";
import { getResourceService } from "@/app/services/apiService";
import { forwardRef, useImperativeHandle } from "react";

export type ColumnConfig = {
  label: string;
  key: string;
  render?: (value: any, row: any) => React.ReactNode;
};

export type ActionConfig = {
  label: string;
  onClick: (row: any) => void;
  variant?: "default" | "destructive" | "outline";
  icon?: React.ReactNode;
};

type AppDataTableFetchProps = {
  endpoint: string;
  columns: ColumnConfig[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  actions?: ActionConfig[];
  resourceKey: string;
  onAdd?: () => void;
};

export const AppDataTableFetch = forwardRef(function AppDataTableFetch(
  {
    endpoint,
    columns,
    onEdit,
    onDelete,
    actions = [],
    resourceKey,
    onAdd,
  }: AppDataTableFetchProps,
  ref
) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [filter, setFilter] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: [endpoint, page, filter],
    queryFn: async () => {
      return await getResourceService(endpoint, { page, search: filter });
    },
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    setItems(data?.[resourceKey] || []);
    setMeta(data?.meta || {});
  }, [data, resourceKey]);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refetch();
    },
  }));

  const renderPagination = () => {
    const totalPages = meta.last_page || 1;
    const currentPage = meta.current_page || 1;

    const getPages = () => {
      const pages = [];
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          {getPages().map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > currentPage + 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex justify-between items-center p-4 gap-4 flex-col md:flex-row">
        <div></div>
        <div className="flex gap-2">
          {onAdd && (
            <Button onClick={onAdd} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          )}
          
          <Button onClick={() => {}} className="w-full md:w-auto" variant="outlineDefault">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              {actions.length > 0 || onEdit || onDelete ? (
                <TableHead>Ações</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8"
                >
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-4"
                >
                  Nenhum dado encontrado
                </TableCell>
              </TableRow>
            ) : (
              items.map((row: any, idx: number) => (
                <TableRow key={idx}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(getNestedValue(row, col.key), row)
                        : getNestedValue(row, col.key)}
                    </TableCell>
                  ))}
                  {actions.length > 0 || onEdit || onDelete ? (
                    <TableCell className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
                            size="icon"
                          >
                            <EllipsisVertical />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          {onEdit && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => onEdit(row)}
                            >
                              Editar
                            </DropdownMenuItem>
                          )}
                          {actions.map((action, i) => (
                            <DropdownMenuItem
                              key={i}
                              onClick={() => action.onClick(row)}
                              className={
                                "cursor-pointer" +
                                (action.variant === "destructive"
                                  ? " text-red-600 hover:bg-red-50"
                                  : "")
                              }
                            >
                              {action.icon} {action.label}
                            </DropdownMenuItem>
                          ))}
                          {onDelete && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => onDelete(row)}
                                className="text-red-600 hover:bg-red-50 cursor-pointer"
                              >
                                Excluir
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta?.last_page > 1 && (
        <div className="flex justify-end p-4">{renderPagination()}</div>
      )}
    </div>
  );
})
