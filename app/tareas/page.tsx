"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, MoreHorizontal, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Tipos para las tareas
type Priority = "Alta" | "Media" | "Baja"
type Status = "Pendiente" | "En progreso" | "Completada" | "Bloqueada"

interface Task {
  id: number
  name: string
  description: string
  project: string
  sprint: string
  status: Status
  priority: Priority
  progress: number
  assignedTo: string
  dueDate: string
  createdAt: string
}

// Datos de ejemplo
const initialTasks: Task[] = [
  {
    id: 101,
    name: "Diseñar estructura de informes",
    description: "Crear la estructura de los informes que se generarán en el sistema",
    project: "Sistema de Gestión de Inventario",
    sprint: "Sprint 4 - Módulo de informes",
    status: "Pendiente",
    priority: "Alta",
    progress: 0,
    assignedTo: "JP",
    dueDate: "20/04/2024",
    createdAt: "16/04/2024",
  },
  {
    id: 102,
    name: "Implementar generación de informes",
    description: "Desarrollar la funcionalidad para generar informes en diferentes formatos",
    project: "Sistema de Gestión de Inventario",
    sprint: "Sprint 4 - Módulo de informes",
    status: "Pendiente",
    priority: "Media",
    progress: 0,
    assignedTo: "CR",
    dueDate: "25/04/2024",
    createdAt: "16/04/2024",
  },
  {
    id: 103,
    name: "Crear interfaz de visualización de informes",
    description: "Diseñar e implementar la interfaz para visualizar los informes generados",
    project: "Sistema de Gestión de Inventario",
    sprint: "Sprint 4 - Módulo de informes",
    status: "Pendiente",
    priority: "Media",
    progress: 0,
    assignedTo: "AM",
    dueDate: "30/04/2024",
    createdAt: "16/04/2024",
  },
  {
    id: 201,
    name: "Diseñar pantalla de inicio",
    description: "Crear el diseño de la pantalla de inicio de la aplicación móvil",
    project: "Aplicación Móvil de Ventas",
    sprint: "Sprint 1 - Diseño de interfaz",
    status: "En progreso",
    priority: "Alta",
    progress: 60,
    assignedTo: "ML",
    dueDate: "18/04/2024",
    createdAt: "01/04/2024",
  },
  {
    id: 202,
    name: "Implementar autenticación de usuarios",
    description: "Desarrollar el sistema de autenticación para la aplicación móvil",
    project: "Aplicación Móvil de Ventas",
    sprint: "Sprint 1 - Diseño de interfaz",
    status: "Completada",
    priority: "Alta",
    progress: 100,
    assignedTo: "CR",
    dueDate: "10/04/2024",
    createdAt: "01/04/2024",
  },
  {
    id: 203,
    name: "Diseñar pantalla de productos",
    description: "Crear el diseño de la pantalla de productos de la aplicación móvil",
    project: "Aplicación Móvil de Ventas",
    sprint: "Sprint 1 - Diseño de interfaz",
    status: "Bloqueada",
    priority: "Media",
    progress: 20,
    assignedTo: "ML",
    dueDate: "20/04/2024",
    createdAt: "01/04/2024",
  },
  {
    id: 301,
    name: "Implementar API de productos",
    description: "Desarrollar la API para gestionar los productos del sistema",
    project: "Sistema de Gestión de Inventario",
    sprint: "Sprint 2 - Módulo de productos",
    status: "Completada",
    priority: "Alta",
    progress: 100,
    assignedTo: "CR",
    dueDate: "25/03/2024",
    createdAt: "16/03/2024",
  },
]

export default function TareasPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<string>("Todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [newTask, setNewTask] = useState<Omit<Task, "id" | "createdAt" | "progress">>({
    name: "",
    description: "",
    project: "",
    sprint: "",
    status: "Pendiente",
    priority: "Media",
    assignedTo: "",
    dueDate: "",
  })

  // Filtrar tareas según el filtro seleccionado y término de búsqueda
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "Todas" || task.status === filter
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.sprint.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Función para obtener el color de la badge según el estado
  const getStatusBadgeClass = (status: Status) => {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "En progreso":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Completada":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Bloqueada":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  // Función para obtener el color de la badge según la prioridad
  const getPriorityBadgeClass = (priority: Priority) => {
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

  // Manejar el envío del formulario para crear una nueva tarea
  const handleSubmit = () => {
    const newId = Math.max(...tasks.map((t) => t.id)) + 1
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`

    const task: Task = {
      id: newId,
      ...newTask,
      progress: 0,
      createdAt: formattedDate,
    }

    setTasks([task, ...tasks])
    setNewTask({
      name: "",
      description: "",
      project: "",
      sprint: "",
      status: "Pendiente",
      priority: "Media",
      assignedTo: "",
      dueDate: "",
    })
    setIsDialogOpen(false)
    toast({
      title: "Tarea creada",
      description: "La tarea ha sido creada exitosamente.",
    })
  }

  // Manejar la edición de una tarea
  const handleEdit = () => {
    if (selectedTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          return selectedTask
        }
        return task
      })
      setTasks(updatedTasks)
      setIsEditDialogOpen(false)
      toast({
        title: "Tarea actualizada",
        description: "La tarea ha sido actualizada exitosamente.",
      })
    }
  }

  // Manejar la eliminación de una tarea
  const handleDelete = () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id)
      setTasks(updatedTasks)
      setIsDeleteDialogOpen(false)
      toast({
        title: "Tarea eliminada",
        description: "La tarea ha sido eliminada exitosamente.",
      })
    }
  }

  // Manejar el cambio de estado de una tarea
  const handleStatusChange = (taskId: number, newStatus: Status) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const progress = newStatus === "Completada" ? 100 : task.progress
        return { ...task, status: newStatus, progress }
      }
      return task
    })
    setTasks(updatedTasks)
    toast({
      title: "Estado actualizado",
      description: `La tarea ha sido marcada como "${newStatus}".`,
    })
  }

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear nueva tarea</DialogTitle>
              <DialogDescription>Complete el formulario para crear una nueva tarea en el sistema.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Proyecto
                </Label>
                <Select value={newTask.project} onValueChange={(value) => setNewTask({ ...newTask, project: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sistema de Gestión de Inventario">Sistema de Gestión de Inventario</SelectItem>
                    <SelectItem value="Aplicación Móvil de Ventas">Aplicación Móvil de Ventas</SelectItem>
                    <SelectItem value="Portal Web Corporativo">Portal Web Corporativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sprint" className="text-right">
                  Sprint
                </Label>
                <Select value={newTask.sprint} onValueChange={(value) => setNewTask({ ...newTask, sprint: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un sprint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sprint 1 - Diseño de interfaz">Sprint 1 - Diseño de interfaz</SelectItem>
                    <SelectItem value="Sprint 2 - Módulo de productos">Sprint 2 - Módulo de productos</SelectItem>
                    <SelectItem value="Sprint 3 - Módulo de proveedores">Sprint 3 - Módulo de proveedores</SelectItem>
                    <SelectItem value="Sprint 4 - Módulo de informes">Sprint 4 - Módulo de informes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Prioridad
                </Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value as Priority })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione una prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignedTo" className="text-right">
                  Asignado a
                </Label>
                <Select
                  value={newTask.assignedTo}
                  onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JP">Juan Pérez (JP)</SelectItem>
                    <SelectItem value="AM">Ana Martínez (AM)</SelectItem>
                    <SelectItem value="CR">Carlos Rodríguez (CR)</SelectItem>
                    <SelectItem value="ML">María López (ML)</SelectItem>
                    <SelectItem value="PS">Pedro Sánchez (PS)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Fecha límite
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Crear Tarea
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar tarea</DialogTitle>
              <DialogDescription>Modifique los campos que desea actualizar.</DialogDescription>
            </DialogHeader>
            {selectedTask && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedTask.name}
                    onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">
                    Descripción
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={selectedTask.description}
                    onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-project" className="text-right">
                    Proyecto
                  </Label>
                  <Select
                    value={selectedTask.project}
                    onValueChange={(value) => setSelectedTask({ ...selectedTask, project: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sistema de Gestión de Inventario">Sistema de Gestión de Inventario</SelectItem>
                      <SelectItem value="Aplicación Móvil de Ventas">Aplicación Móvil de Ventas</SelectItem>
                      <SelectItem value="Portal Web Corporativo">Portal Web Corporativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-sprint" className="text-right">
                    Sprint
                  </Label>
                  <Select
                    value={selectedTask.sprint}
                    onValueChange={(value) => setSelectedTask({ ...selectedTask, sprint: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un sprint" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sprint 1 - Diseño de interfaz">Sprint 1 - Diseño de interfaz</SelectItem>
                      <SelectItem value="Sprint 2 - Módulo de productos">Sprint 2 - Módulo de productos</SelectItem>
                      <SelectItem value="Sprint 3 - Módulo de proveedores">Sprint 3 - Módulo de proveedores</SelectItem>
                      <SelectItem value="Sprint 4 - Módulo de informes">Sprint 4 - Módulo de informes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Estado
                  </Label>
                  <Select
                    value={selectedTask.status}
                    onValueChange={(value) => setSelectedTask({ ...selectedTask, status: value as Status })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="En progreso">En progreso</SelectItem>
                      <SelectItem value="Completada">Completada</SelectItem>
                      <SelectItem value="Bloqueada">Bloqueada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-priority" className="text-right">
                    Prioridad
                  </Label>
                  <Select
                    value={selectedTask.priority}
                    onValueChange={(value) => setSelectedTask({ ...selectedTask, priority: value as Priority })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione una prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-progress" className="text-right">
                    Progreso
                  </Label>
                  <div className="col-span-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{selectedTask.progress}%</span>
                    </div>
                    <Input
                      id="edit-progress"
                      type="range"
                      min="0"
                      max="100"
                      value={selectedTask.progress}
                      onChange={(e) =>
                        setSelectedTask({ ...selectedTask, progress: Number.parseInt(e.target.value, 10) })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-assignedTo" className="text-right">
                    Asignado a
                  </Label>
                  <Select
                    value={selectedTask.assignedTo}
                    onValueChange={(value) => setSelectedTask({ ...selectedTask, assignedTo: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JP">Juan Pérez (JP)</SelectItem>
                      <SelectItem value="AM">Ana Martínez (AM)</SelectItem>
                      <SelectItem value="CR">Carlos Rodríguez (CR)</SelectItem>
                      <SelectItem value="ML">María López (ML)</SelectItem>
                      <SelectItem value="PS">Pedro Sánchez (PS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-dueDate" className="text-right">
                    Fecha límite
                  </Label>
                  <Input
                    id="edit-dueDate"
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" onClick={handleEdit}>
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles de la tarea</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{selectedTask.name}</h2>
                  <Badge variant="outline" className={getStatusBadgeClass(selectedTask.status)}>
                    {selectedTask.status}
                  </Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedTask.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Proyecto</h3>
                    <p>{selectedTask.project}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Sprint</h3>
                    <p>{selectedTask.sprint}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Prioridad</h3>
                    <Badge variant="outline" className={getPriorityBadgeClass(selectedTask.priority)}>
                      {selectedTask.priority}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Asignado a</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{selectedTask.assignedTo}</AvatarFallback>
                      </Avatar>
                      <span>
                        {selectedTask.assignedTo === "JP"
                          ? "Juan Pérez"
                          : selectedTask.assignedTo === "AM"
                            ? "Ana Martínez"
                            : selectedTask.assignedTo === "CR"
                              ? "Carlos Rodríguez"
                              : selectedTask.assignedTo === "ML"
                                ? "María López"
                                : selectedTask.assignedTo === "PS"
                                  ? "Pedro Sánchez"
                                  : selectedTask.assignedTo}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fecha de creación</h3>
                    <p>{selectedTask.createdAt}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fecha límite</h3>
                    <p>{selectedTask.dueDate}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Progreso</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{selectedTask.progress}%</span>
                  </div>
                  <Progress value={selectedTask.progress} className="h-2" />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Eliminar tarea</DialogTitle>
              <DialogDescription>
                ¿Está seguro de que desea eliminar esta tarea? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            {selectedTask && (
              <div className="py-4">
                <p className="font-medium">{selectedTask.name}</p>
                <p className="text-sm text-gray-500">{selectedTask.project}</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar tareas..."
              className="w-64 pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow overflow-hidden">
        <div className="border-b dark:border-gray-700 p-2">
          <div className="flex space-x-1">
            <Button
              variant={filter === "Todas" ? "default" : "ghost"}
              onClick={() => setFilter("Todas")}
              className="rounded-md"
            >
              Todas
            </Button>
            <Button
              variant={filter === "Pendiente" ? "default" : "ghost"}
              onClick={() => setFilter("Pendiente")}
              className="rounded-md"
            >
              Pendientes
            </Button>
            <Button
              variant={filter === "En progreso" ? "default" : "ghost"}
              onClick={() => setFilter("En progreso")}
              className="rounded-md"
            >
              En progreso
            </Button>
            <Button
              variant={filter === "Completada" ? "default" : "ghost"}
              onClick={() => setFilter("Completada")}
              className="rounded-md"
            >
              Completadas
            </Button>
            <Button
              variant={filter === "Bloqueada" ? "default" : "ghost"}
              onClick={() => setFilter("Bloqueada")}
              className="rounded-md"
            >
              Bloqueadas
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>TAREA</TableHead>
              <TableHead>PROYECTO</TableHead>
              <TableHead>ESTADO</TableHead>
              <TableHead>PRIORIDAD</TableHead>
              <TableHead>PROGRESO</TableHead>
              <TableHead>ASIGNADO A</TableHead>
              <TableHead>FECHA LÍMITE</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.project}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeClass(task.status)}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityBadgeClass(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2 w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{task.assignedTo}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTask(task)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTask(task)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
                      {task.status !== "Pendiente" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(task.id, "Pendiente")}>
                          Marcar como Pendiente
                        </DropdownMenuItem>
                      )}
                      {task.status !== "En progreso" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(task.id, "En progreso")}>
                          Marcar como En progreso
                        </DropdownMenuItem>
                      )}
                      {task.status !== "Completada" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(task.id, "Completada")}>
                          Marcar como Completada
                        </DropdownMenuItem>
                      )}
                      {task.status !== "Bloqueada" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(task.id, "Bloqueada")}>
                          Marcar como Bloqueada
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedTask(task)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-500">
            Mostrando 1 a {filteredTasks.length} de {filteredTasks.length} Entradas
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-100 dark:bg-gray-800">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
