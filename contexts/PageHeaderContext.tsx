"use client"

import { createContext, useContext, useState } from "react"

interface PageHeaderContextValue {
  title: string
  breadcrumb: string[]
  setHeader: (title: string, breadcrumb?: string[]) => void
}

const PageHeaderContext = createContext<PageHeaderContextValue>({
  title: "",
  breadcrumb: [],
  setHeader: () => {},
})

export function PageHeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("")
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])

  return (
    <PageHeaderContext.Provider
      value={{
        title,
        breadcrumb,
        setHeader: (t, b = []) => {
          setTitle(t)
          setBreadcrumb(b)
        },
      }}
    >
      {children}
    </PageHeaderContext.Provider>
  )
}

export const usePageHeader = () => useContext(PageHeaderContext)
