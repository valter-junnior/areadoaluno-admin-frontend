import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppBreadcrumb } from "./AppBreadcrumb";
import { useBreadcrumb } from "@/app/providers/breadcrumb/useBreadcrumb";
import { useEffect } from "react";

export const AppDashboardLayout = ({
  breadcrumbs,
  children,
}: {
  children: React.ReactNode;
  breadcrumbs: { title: string; href: string }[];
}) => {
  const breadcrumb = useBreadcrumb();

  useEffect(() => {
    breadcrumb.setCrumbs(breadcrumbs);
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            </div>
            <AppBreadcrumb />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
