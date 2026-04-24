"use client"

import { useSidebar } from "@/contexts/SidebarContext"

export function MobileBackdrop() {
  const { mobileOpen, closeMobile } = useSidebar()
  if (!mobileOpen) return null
  return (
    <div
      className="fixed inset-0 z-20 bg-black/30 md:hidden"
      onClick={closeMobile}
    />
  )
}
