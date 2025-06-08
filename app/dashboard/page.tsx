"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, FileText, Plus, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Datos de ejemplo para el dashboard
  const stats = {
    totalProjects: 5,
    activeProjects: 3,
    completedProjects: 1,
    pendingProjects: 1,
    totalTasks: 28,
    completedTasks: 15,
    pendingTasks: 8,
    inProgressTasks: 5,
    totalUsers: 12,
    totalModels: 15,
    totalSprints: 8,
  }

  // Proyectos recientes
  const recentProjects = [
    {
      id: 1,
      name: "Sistema de Gestión de Inventario",
      progress: 45,
      status: "Activo",
      dueDate: "30/09/2024",
    },
    {
      id: 2,
      name: "Aplicación Móvil de Ventas",
      progress: 20,
      status: "Activo",
      dueDate: "15/12/2024",
    },
    {
      id: 3,
      name: "Portal Web Corporativo",
      progress: 75,
      status: "Activo",
      dueDate: "30/06/2024",
    },
    {
      id: 4,
      name: "Sistema de Recursos Humanos",
      progress: 100,
      status: "Completado",
      dueDate: "15/04/2024",
    },
  ]

  // Tareas pendientes
  const pendingTasks = [
    {
      id: 1,
      name: "Diseñar estructura de informes",
      project: "Sistema de Gestión de Inventario",
      dueDate: "20/04/2024",
      priority: "Alta",
    },
    {
      id: 2,
      name: "Implementar generación de informes",
      project: "Sistema de Gestión de Inventario",
      dueDate: "25/04/2024",
      priority: "Media",
    },
    {
      id: 3,
      name: "Crear interfaz de visualización de informes",
      project: "Sistema de Gestión de Inventario",
      dueDate: "30/04/2024",
      priority: "Media",
    },
    {
      id: 4,
      name: "Diseñar pantalla de inicio",
      project: "Aplicación Móvil de Ventas",
      dueDate: "18/04/2024",
      priority: "Alta",
    },
  ]

  // Próximas reuniones
  const upcomingMeetings = [
    {
      id: 1,
      title: "Revisión de Sprint 3",
      date: "15/04/2024",
      time: "11:00 AM",
      project: "Sistema de Gestión de Inventario",
    },
    {
      id: 2,
      title: "Planificación de Sprint 2",
      date: "16/04/2024",
      time: "10:00 AM",
      project: "Aplicación Móvil de Ventas",
    },
    {
      id: 3,
      title: "Revisión de diseño",
      date: "17/04/2024",
      time: "14:00 PM",
      project: "Portal Web Corporativo",
    },
  ]

  // Función para obtener el color de la badge según el estado
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Completado":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return ""
    }
  }

  // Función para obtener el color de la badge según la prioridad
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Media":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "Baja":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return ""
    }
  }

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Bienvenido de nuevo, Juan Pérez</p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generar Informe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Generar Informe</DialogTitle>
                <DialogDescription>Seleccione el tipo de informe que desea generar.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-type" className="text-right">
                    Tipo de Informe
                  </Label>
                  <Select defaultValue="project-progress">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-progress">Progreso de Proyectos</SelectItem>
                      <SelectItem value="task-distribution">Distribución de Tareas</SelectItem>
                      <SelectItem value="deadline-compliance">Cumplimiento de Plazos</SelectItem>
                      <SelectItem value="user-activity">Actividad de Usuarios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-format" className="text-right">
                    Formato
                  </Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-range" className="text-right">
                    Período
                  </Label>
                  <Select defaultValue="last-month">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-week">Última semana</SelectItem>
                      <SelectItem value="last-month">Último mes</SelectItem>
                      <SelectItem value="last-quarter">Último trimestre</SelectItem>
                      <SelectItem value="last-year">Último año</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() =>
                    toast({
                      title: "Informe generado",
                      description: "El informe ha sido generado exitosamente.",
                    })
                  }
                >
                  Generar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear nuevo proyecto</DialogTitle>
                <DialogDescription>Complete el formulario para crear un nuevo proyecto.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="project-name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project-description" className="text-right">
                    Descripción
                  </Label>
                  <Textarea id="project-description" className="col-span-3" rows={3} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Fecha inicio
                  </Label>
                  <Input id="start-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-date" className="text-right">
                    Fecha fin
                  </Label>
                  <Input id="end-date" type="date" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() =>
                    toast({
                      title: "Proyecto creado",
                      description: "El proyecto ha sido creado exitosamente.",
                    })
                  }
                >
                  Crear Proyecto
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <br/>
      
      <Tabs defaultValue="overview" className="w-full mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos Recientes</CardTitle>
                <CardDescription>Estado de los proyectos activos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <Badge variant="outline" className={getStatusBadgeClass(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progreso</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-gray-500">Fecha límite: {project.dueDate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximas Reuniones</CardTitle>
                <CardDescription>Reuniones programadas para los próximos días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{meeting.title}</h3>
                        <p className="text-sm text-gray-500">
                          {meeting.date} - {meeting.time}
                        </p>
                        <p className="text-sm text-gray-500">{meeting.project}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Proyectos</CardTitle>
              <CardDescription>Lista completa de proyectos activos y completados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge variant="outline" className={getStatusBadgeClass(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Progreso</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="text-sm text-gray-500">Fecha límite: {project.dueDate}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Pendientes</CardTitle>
              <CardDescription>Tareas asignadas pendientes de completar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <CheckSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium">{task.name}</h3>
                        <p className="text-sm text-gray-500">{task.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">{task.dueDate}</div>
                      <Badge variant="outline" className={getPriorityBadgeClass(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
