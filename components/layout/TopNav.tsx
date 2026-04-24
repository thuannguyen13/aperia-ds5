"use client"

import { Bell, ChevronDown, User, LogOut, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group/input-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { useSidebar } from "@/contexts/SidebarContext"
import { usePageHeader } from "@/contexts/PageHeaderContext"

export function TopNav() {
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
        <InputGroup>
          <InputGroupAddon><Search /></InputGroupAddon>
          <InputGroupInput placeholder="Search activities, issues, alerts…" />
        </InputGroup>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors outline-none">
              <Avatar size="sm">
                <AvatarFallback className="bg-blue-600 text-white">SB</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm text-slate-700">Susie B.</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem>
              <User className="size-3.5" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <LogOut className="size-3.5" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
