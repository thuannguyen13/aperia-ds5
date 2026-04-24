"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Bell, Plug, ScrollText, Shield } from "lucide-react"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { cn } from "@/lib/utils"

const subNav = [
  { href: "/admin/users",        label: "Users",           icon: Users      },
  { href: "/admin/alerts",       label: "Reminder Config", icon: Bell       },
  { href: "/admin/integrations", label: "Integrations",    icon: Plug       },
  { href: "/admin/audit",        label: "Audit Log",       icon: ScrollText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-0 -mx-6 -mt-6">
      <PageHeaderSetter title="Admin Panel" breadcrumb={["Admin"]} />

      {/* Admin banner */}
      <div className="flex items-center gap-2 border-b border-red-100 bg-red-50 px-6 py-2.5">
        <Shield className="size-4 text-red-500" />
        <span className="text-xs font-medium text-red-700">Admin access only — all actions are logged</span>
      </div>

      {/* Sub-nav */}
      <div className="flex border-b border-border bg-white px-6">
        {subNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors -mb-px",
                active
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-800",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          )
        })}
      </div>

      {/* Page content */}
      <div className="p-6">{children}</div>
    </div>
  )
}
