"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Tipos para las tareas
type Priority = "Alta" | "Media" | "Baja"
type Status = "Activo" | "Pendiente" | "Evaluando"

interface Task {
  id: number
  name: string
  status: Status
  priority: Priority
  assignedTo: string[]
  dueDate: string
}

// Datos de ejemplo
const initialTasks: Task[] = [
  { id: 27, name: "Modelos", status: "Activo", priority: "Alta", assignedTo: ["JD"], dueDate: "04/04/2018" },
  { id: 28, name: "MR", status: "Evaluando", priority: "Alta", assignedTo: ["AS"], dueDate: "26/10/2024" },
  {
    id: 29,
    name: "IEEE-830",
    status: "Pendiente",
    priority: "Baja",
    assignedTo: ["JD", "AS", "ML"],
    dueDate: "20/08/2024",
  },
  { id: 30, name: "RF", status: "Pendiente", priority: "Media", assignedTo: [], dueDate: "30/04/2021" },
  { id: 31, name: "RNF", status: "Activo", priority: "Alta", assignedTo: ["JD", "AS"], dueDate: "13/11/2023" },
  { id: 32, name: "MC", status: "Evaluando", priority: "Media", assignedTo: ["JD", "AS"], dueDate: "22/07/2018" },
  { id: 33, name: "IEEE-830 hoja", status: "Activo", priority: "Baja", assignedTo: ["ML"], dueDate: "17/04/2024" },
]

export default function ProyectosPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<string>("Todas")
  const [entriesPerPage, setEntriesPerPage] = useState<string>("10")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    name: "",
    status: "Pendiente" as Status,
    priority: "Media" as Priority,
    assignedTo: [] as string[],
    dueDate: "",
    description: "",
  })
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filtrar tareas según el filtro seleccionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Todas") return true
    return task.status === filter
  })

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

  // Función para obtener el color de la badge según el estado
  const getStatusBadgeClass = (status: Status) => {
    switch (status) {
      case "Activo":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Evaluando":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      default:
        return ""
    }
  }

  // Manejar el envío del formulario para crear una nueva tarea
  const handleSubmit = () => {
    const newId = Math.max(...tasks.map((t) => t.id)) + 1

    const task: Task = {
      id: newId,
      name: newTask.name,
      status: newTask.status,
      priority: newTask.priority,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
    }

    setTasks([...tasks, task])
    setNewTask({
      name: "",
      status: "Pendiente",
      priority: "Media",
      assignedTo: [],
      dueDate: "",
      description: "",
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

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Proyectos</h1>
        <div className="relative">
          <Input type="search" placeholder="Buscar..." className="w-64 pl-10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-3 top-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
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
                <Label htmlFor="status" className="text-right">
                  Estado
                </Label>
                <Select
                  value={newTask.status}
                  onValueChange={(value) => setNewTask({ ...newTask, status: value as Status })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Evaluando">Evaluando</SelectItem>
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
          <DialogContent className="sm:max-w-[500px]">
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
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Evaluando">Evaluando</SelectItem>
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
                <p className="text-sm text-gray-500">ID: {selectedTask.id}</p>
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

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
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
              variant={filter === "Activo" ? "default" : "ghost"}
              onClick={() => setFilter("Activo")}
              className="rounded-md"
            >
              Activas
            </Button>
            <Button
              variant={filter === "Pendiente" ? "default" : "ghost"}
              onClick={() => setFilter("Pendiente")}
              className="rounded-md"
            >
              Pendientes
            </Button>
            <Button
              variant={filter === "Evaluando" ? "default" : "ghost"}
              onClick={() => setFilter("Evaluando")}
              className="rounded-md"
            >
              Evaluando
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>TAREA</TableHead>
              <TableHead>ESTADO</TableHead>
              <TableHead>PRIORIDAD</TableHead>
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
                  {task.assignedTo.length > 0 ? (
                    <div className="flex -space-x-2">
                      {task.assignedTo.map((initials, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-white">
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">{initials}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Sin asignar</span>
                  )}
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
                      <DropdownMenuItem asChild>
                        <Link href={`/proyectos/${task.id}`}>Ver detalles</Link>
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
            <div className="flex items-center space-x-2">
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">Entradas por página</span>
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
    </div>
  )
}
