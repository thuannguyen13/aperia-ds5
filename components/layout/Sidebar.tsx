"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Scale,
  SearchCheck,
  AlertTriangle,
  GitFork,
  ScrollText,
  ScanSearch,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/my-work", icon: ClipboardList, label: "My Work", badge: 3 },
]

const programItems = [
  { href: "/governance", icon: BarChart3, label: "Governance Reporting" },
  { href: "/rrm", icon: Scale, label: "RRM (Reg Rules)" },
  { href: "/monitoring-testing", icon: SearchCheck, label: "Monitoring & Testing" },
  { href: "/issues", icon: AlertTriangle, label: "Issues" },
]

const toolItems = [
  { href: "/workflows", icon: GitFork, label: "Workflows" },
  { href: "/policies", icon: ScrollText, label: "Policies" },
  { href: "/qar", icon: ScanSearch, label: "QAR" },
]

const adminItems = [
  { href: "/admin", icon: Settings, label: "Admin" },
]

function NavItem({
  href,
  icon: Icon,
  label,
  badge,
  collapsed,
}: {
  href: string
  icon: React.ElementType
  label: string
  badge?: number
  collapsed: boolean
}) {
  const pathname = usePathname()
  const active = pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active
          ? "border-l-2 border-l-blue-600 bg-blue-50 pl-2.5 font-medium text-blue-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        collapsed && "justify-center px-2",
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className={cn("shrink-0", active ? "text-blue-600" : "text-slate-500", "size-4")} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge != null && badge > 0 && (
            <span className="ml-auto rounded-full bg-blue-600 px-1.5 py-0.5 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-white transition-all duration-200",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-14 items-center border-b border-border px-4", collapsed && "justify-center px-2")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-blue-600">
              <Scale className="size-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Fiserv Compliance</span>
          </div>
        )}
        {collapsed && (
          <div className="flex size-7 items-center justify-center rounded-md bg-blue-600">
            <Scale className="size-4 text-white" />
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} />
        ))}

        <div className={cn("my-2 border-t border-border", collapsed && "mx-1")} />

        {programItems.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} />
        ))}

        <div className={cn("my-2 border-t border-border", collapsed && "mx-1")} />

        {toolItems.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} />
        ))}

        <div className={cn("my-2 border-t border-border", collapsed && "mx-1")} />

        {adminItems.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          {collapsed ? <ChevronRight className="size-4" /> : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="size-4" />
              <span className="text-xs">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
