import { Sidebar } from "@/components/layout/Sidebar"
import { MobileBackdrop } from "@/components/layout/MobileBackdrop"
import { TopNav } from "@/components/layout/TopNav"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { PageHeaderProvider } from "@/contexts/PageHeaderContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PageHeaderProvider>
        <div className="flex h-screen overflow-hidden bg-slate-50">
          <MobileBackdrop />
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* TopNav is outside the padded wrapper — stays edge-to-edge */}
            <TopNav />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6">{children}</div>
            </main>
          </div>
        </div>
      </PageHeaderProvider>
    </SidebarProvider>
  )
}
