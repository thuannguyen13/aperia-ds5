"use client"

import { useState } from "react"
import { Plus, Search, Edit, UserX, KeyRound, Shield } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"

type UserRole = "ADMIN" | "PROGRAM_LEAD" | "LEAD_OFFICER" | "OFFICER" | "READ_ONLY"

interface AppUser {
  id: string; name: string; email: string; role: UserRole
  region: string; lob: string; createdAt: string; lastLogin: string; active: boolean
}

const users: AppUser[] = [
  { id: "USR-001", name: "Thomas Bennington",   email: "thomas.bennington@fiserv.com",   role: "PROGRAM_LEAD",  region: "Global",        lob: "All",     createdAt: "Jan 5, 2025",  lastLogin: "Apr 23, 2026", active: true  },
  { id: "USR-002", name: "Lena Capalbo",        email: "lena.capalbo@fiserv.com",        role: "LEAD_OFFICER",  region: "Global",        lob: "FCC",     createdAt: "Jan 5, 2025",  lastLogin: "Apr 22, 2026", active: true  },
  { id: "USR-003", name: "Richard Pooley",      email: "richard.pooley@fiserv.com",      role: "LEAD_OFFICER",  region: "EMEA",          lob: "EMEA",    createdAt: "Jan 5, 2025",  lastLogin: "Apr 23, 2026", active: true  },
  { id: "USR-004", name: "Ed Friedman",         email: "ed.friedman@fiserv.com",         role: "LEAD_OFFICER",  region: "North America", lob: "FIG",     createdAt: "Jan 5, 2025",  lastLogin: "Apr 20, 2026", active: true  },
  { id: "USR-005", name: "Jason Hollingsworth", email: "jason.hollingsworth@fiserv.com", role: "LEAD_OFFICER",  region: "North America", lob: "FCC",     createdAt: "Jan 5, 2025",  lastLogin: "Apr 21, 2026", active: true  },
  { id: "USR-006", name: "Kelly Thewes",        email: "kelly.thewes@fiserv.com",        role: "LEAD_OFFICER",  region: "Global",        lob: "Privacy", createdAt: "Jan 5, 2025",  lastLogin: "Apr 19, 2026", active: true  },
  { id: "USR-007", name: "Susie Officer",       email: "susie.officer@fiserv.com",       role: "OFFICER",       region: "North America", lob: "FCC",     createdAt: "Mar 1, 2025",  lastLogin: "Apr 23, 2026", active: true  },
  { id: "USR-008", name: "Admin User",          email: "admin@fiserv.com",               role: "ADMIN",         region: "Global",        lob: "All",     createdAt: "Jan 1, 2025",  lastLogin: "Apr 23, 2026", active: true  },
  { id: "USR-009", name: "Mei Lin",             email: "mei.lin@fiserv.com",             role: "OFFICER",       region: "APAC",          lob: "APAC",    createdAt: "Feb 1, 2025",  lastLogin: "Apr 18, 2026", active: true  },
  { id: "USR-010", name: "Carlos Rivera",       email: "carlos.rivera@fiserv.com",       role: "OFFICER",       region: "LATAM",         lob: "LATAM",   createdAt: "Feb 1, 2025",  lastLogin: "Apr 10, 2026", active: true  },
  { id: "USR-011", name: "Forum Viewer",        email: "forum.viewer@fiserv.com",        role: "READ_ONLY",     region: "Global",        lob: "All",     createdAt: "Apr 1, 2025",  lastLogin: "Apr 5, 2026",  active: true  },
  { id: "USR-012", name: "Dawn Dale",           email: "dawn.dale@fiserv.com",           role: "OFFICER",       region: "EMEA",          lob: "FIG",     createdAt: "Jan 5, 2025",  lastLogin: "Mar 15, 2026", active: false },
]

const roleStyle: Record<UserRole, string> = {
  ADMIN:        "bg-red-100 text-red-800",
  PROGRAM_LEAD: "bg-purple-100 text-purple-800",
  LEAD_OFFICER: "bg-blue-100 text-blue-800",
  OFFICER:      "bg-green-100 text-green-800",
  READ_ONLY:    "bg-gray-100 text-gray-600",
}

export default function AdminUsersPage() {
  const [search, setSearch]     = useState("")
  const [roleF, setRoleF]       = useState("All")
  const [showAdd, setShowAdd]   = useState(false)

  const filtered = users
    .filter(u => roleF === "All" || u.role === roleF)
    .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col gap-5">
      {/* Role summary */}
      <div className="grid grid-cols-5 gap-3">
        {(["ADMIN","PROGRAM_LEAD","LEAD_OFFICER","OFFICER","READ_ONLY"] as UserRole[]).map(role => (
          <div key={role} className="rounded-lg border border-border bg-white p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-900">{users.filter(u => u.role === role && u.active).length}</div>
            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${roleStyle[role]}`}>{role.replace("_"," ")}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Input size="sm" placeholder="Search users…" leftIcon={<Search />} value={search} onChange={e => setSearch(e.target.value)} className="w-52" />
        <select className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs text-slate-700"
          value={roleF} onChange={e => setRoleF(e.target.value)}>
          {["All","ADMIN","PROGRAM_LEAD","LEAD_OFFICER","OFFICER","READ_ONLY"].map(r => <option key={r}>{r.replace("_"," ")}</option>)}
        </select>
        <div className="ml-auto">
          <Button variant="default" size="sm" onClick={() => setShowAdd(true)}><Plus className="size-3.5" />Add User</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Name","Email","Role","Region","LOB","Created","Last Login","Status","Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(u => (
              <tr key={u.id} className={`hover:bg-slate-50 transition-colors ${!u.active ? "opacity-50" : ""}`}>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                      {u.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                    </div>
                    <span className="text-xs font-medium text-slate-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{u.email}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleStyle[u.role]}`}>{u.role.replace("_"," ")}</span>
                </td>
                <td className="px-4 py-2.5 text-xs text-slate-600">{u.region}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{u.lob}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500 whitespace-nowrap">{u.createdAt}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500 whitespace-nowrap">{u.lastLogin}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.active ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-500"}`}>
                    {u.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-xs" title="Edit"><Edit className="size-3" /></Button>
                    <Button variant="ghost" size="icon-xs" title="Reset password"><KeyRound className="size-3" /></Button>
                    {u.active && u.role !== "ADMIN" && (
                      <Button variant="ghost" size="icon-xs" title="Deactivate"><UserX className="size-3 text-red-400" /></Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-10 text-center text-sm text-slate-400">No users match the filters.</div>}
      </div>

      {/* Add user modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowAdd(false)}>
          <div className="w-[480px] rounded-xl bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="size-5 text-blue-600" />
              <h2 className="text-base font-semibold text-slate-900">Add New User</h2>
            </div>
            <div className="flex flex-col gap-3">
              {[["Full Name","text","John Smith"],["Email","email","john.smith@fiserv.com"]].map(([label,type,ph]) => (
                <div key={String(label)}>
                  <label className="text-xs font-medium text-slate-700">{label}</label>
                  <input type={String(type)} placeholder={String(ph)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm placeholder:text-slate-400" />
                </div>
              ))}
              {[
                { label: "Role",   opts: ["PROGRAM_LEAD","LEAD_OFFICER","OFFICER","READ_ONLY"] },
                { label: "Region", opts: ["Global","North America","EMEA","APAC","LATAM"] },
                { label: "LOB",    opts: ["All","FCC","FIG","EMEA","APAC","LATAM","Merchant","Privacy","Corporate"] },
              ].map(({ label, opts }) => (
                <div key={label}>
                  <label className="text-xs font-medium text-slate-700">{label}</label>
                  <select className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700">
                    {opts.map(o => <option key={o}>{o.replace("_"," ")}</option>)}
                  </select>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="default" size="sm" className="flex-1" onClick={() => setShowAdd(false)}>Create User</Button>
                <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
