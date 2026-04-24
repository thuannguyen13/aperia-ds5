"use client"

import { useState } from "react"
import { Plus, Edit, UserX, KeyRound, Shield, Search } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group/input-group"
import { Badge } from "@/components/ui/badge/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { Card, CardContent } from "@/components/ui/card/card"
import { cn } from "@/lib/utils"

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

const roleClass: Record<UserRole, string> = {
  ADMIN:        "border-transparent bg-red-100 text-red-800 hover:bg-red-100",
  PROGRAM_LEAD: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-100",
  LEAD_OFFICER: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",
  OFFICER:      "border-transparent bg-green-100 text-green-800 hover:bg-green-100",
  READ_ONLY:    "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-100",
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
          <Card key={role}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-slate-900">{users.filter(u => u.role === role && u.active).length}</div>
              <Badge variant="outline" className={cn("mt-1", roleClass[role])}>{role.replace("_"," ")}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <InputGroup className="w-52">
          <InputGroupAddon><Search /></InputGroupAddon>
          <InputGroupInput placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} />
        </InputGroup>
        <Select value={roleF} onValueChange={setRoleF}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["All","ADMIN","PROGRAM_LEAD","LEAD_OFFICER","OFFICER","READ_ONLY"].map(r => (
              <SelectItem key={r} value={r}>{r.replace(/_/g, " ")}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <Button variant="default" size="sm" onClick={() => setShowAdd(true)}><Plus className="size-3.5" />Add User</Button>
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-x-auto p-0">
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
                    <Avatar size="sm">
                      <AvatarFallback className="bg-slate-200 text-slate-700">
                        {u.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-slate-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{u.email}</td>
                <td className="px-4 py-2.5">
                  <Badge variant="outline" className={roleClass[u.role]}>{u.role.replace("_"," ")}</Badge>
                </td>
                <td className="px-4 py-2.5 text-xs text-slate-600">{u.region}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{u.lob}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500 whitespace-nowrap">{u.createdAt}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500 whitespace-nowrap">{u.lastLogin}</td>
                <td className="px-4 py-2.5">
                  <Badge variant="outline" className={u.active
                    ? "border-transparent bg-green-100 text-green-800 hover:bg-green-100"
                    : "border-transparent bg-slate-100 text-slate-500 hover:bg-slate-100"
                  }>
                    {u.active ? "Active" : "Inactive"}
                  </Badge>
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
      </Card>

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
                  <Select>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder={`Select ${label}…`} />
                    </SelectTrigger>
                    <SelectContent>
                      {opts.map(o => <SelectItem key={o} value={o}>{o.replace(/_/g, " ")}</SelectItem>)}
                    </SelectContent>
                  </Select>
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
