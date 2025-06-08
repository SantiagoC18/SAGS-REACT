import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function SobreNosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex bg-background dark:bg-gray-950">
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
