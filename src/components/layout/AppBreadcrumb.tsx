import { useBreadcrumb } from '@/app/providers/breadcrumb/useBreadcrumb'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export const AppBreadcrumb = () => {
  const { crumbs } = useBreadcrumb()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <div key={crumb.title}>
            <BreadcrumbItem
              className={index < crumbs.length - 1 ? 'hidden md:block' : ''}
            >
              {index < crumbs.length - 1 && crumb.href ? (
                <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < crumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
