"use client"

import { useEffect } from "react"
import { usePageHeader } from "@/contexts/PageHeaderContext"

interface PageHeaderSetterProps {
  title: string
  breadcrumb?: string[]
}

export function PageHeaderSetter({ title, breadcrumb = [] }: PageHeaderSetterProps) {
  const { setHeader } = usePageHeader()

  useEffect(() => {
    setHeader(title, breadcrumb)
  // breadcrumb is a literal array defined per-render — stringify to stabilize
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, JSON.stringify(breadcrumb)])

  return null
}
