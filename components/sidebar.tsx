"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Timer,
  User,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar tamaño inicial
    checkScreenSize()

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", checkScreenSize)

    // Limpiar listener
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleLogout = () => {
    console.log("Cerrando sesión...")
    window.location.href = "/login"
  }

  const NavItems = () => (
    <>
      <div className="mb-4 px-4 flex items-center justify-center">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <Image src="/images/logo.jpg" alt="SAGS Logo" width={32} height={32} className="rounded-full" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">SAGS</h2>
        </Link>
      </div>
      <Separator className="mb-4 bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-1">
        <Button
          asChild
          variant={pathname === "/dashboard" ? "default" : "ghost"}
          className="w-full justify-start bg-opacity-90 hover:bg-opacity-100"
        >
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button asChild variant={pathname === "/proyectos" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/proyectos">
            <Home className="mr-2 h-4 w-4" />
            Proyectos
          </Link>
        </Button>
        <Button asChild variant={pathname === "/sprints" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/sprints">
            <Timer className="mr-2 h-4 w-4" />
            Sprints
          </Link>
        </Button>
        <Button asChild variant={pathname === "/tareas" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/tareas">
            <ClipboardList className="mr-2 h-4 w-4" />
            Tareas
          </Link>
        </Button>
        <Button asChild variant={pathname === "/modelos" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/modelos">
            <FileText className="mr-2 h-4 w-4" />
            Modelos
          </Link>
        </Button>
        <Button asChild variant={pathname === "/pqrs" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/pqrs">
            <MessageSquare className="mr-2 h-4 w-4" />
            PQRS
          </Link>
        </Button>
        <Button asChild variant={pathname === "/usuarios" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/usuarios">
            <Users className="mr-2 h-4 w-4" />
            Usuarios
          </Link>
        </Button>
        <Button asChild variant={pathname === "/perfil" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/perfil">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </Link>
        </Button>
        <Button asChild variant={pathname === "/sobre-nosotros" ? "default" : "ghost"} className="w-full justify-start">
          <Link href="/sobre-nosotros">
            <BarChart3 className="mr-2 h-4 w-4" />
            Sobre Nosotros
          </Link>
        </Button>
      </div>

      <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-400">
          Configuración
        </h2>
        <div className="space-y-1">
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Tema</span>
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </>
  )

  // Versión móvil con Sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-white dark:bg-gray-900">
          <div className="h-full py-4 overflow-y-auto">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  // Versión desktop
  return (
    <div
      className={cn(
        "h-screen pb-12 border-r dark:border-gray-800 bg-white dark:bg-gray-900 w-64 hidden md:block",
        className,
      )}
    >
      <div className="space-y-4 py-4 h-full overflow-y-auto">
        <NavItems />
      </div>
    </div>
  )
}
