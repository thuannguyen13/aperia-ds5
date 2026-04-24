"use client"

import { Bell, Search, ChevronDown, User, LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { useSidebar } from "@/contexts/SidebarContext"
import { usePageHeader } from "@/contexts/PageHeaderContext"

export function TopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { toggleMobile } = useSidebar()
  const { title, breadcrumb } = usePageHeader()
  const unreadCount = 3

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-white px-4 md:px-6">
      {/* Hamburger — mobile only */}
      <button
        onClick={toggleMobile}
        className="flex md:hidden items-center justify-center rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      {/* Left: title + breadcrumb */}
      <div className="flex flex-1 flex-col justify-center min-w-0">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="text-xs text-slate-400">
                {crumb}{i < breadcrumb.length - 1 && " /"}
              </span>
            ))}
          </div>
        )}
        <h1 className="truncate text-base font-semibold text-slate-900">{title}</h1>
      </div>

      {/* Center: global search — hidden on mobile */}
      <div className="hidden md:block w-72">
        <Input
          size="sm"
          placeholder="Search activities, issues, alerts…"
          leftIcon={<Search />}
        />
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4 text-slate-500" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors"
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              SB
            </div>
            <span className="hidden sm:block text-sm text-slate-700">Susie B.</span>
            <ChevronDown className="size-3 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-border bg-white p-1 shadow-md">
              <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                <User className="size-3.5 text-slate-400" />
                Profile
              </button>
              <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="size-3.5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
