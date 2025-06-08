"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, MoreHorizontal, Search, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"
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

// Tipos para los sprints
type Status = "Activo" | "Completado" | "Pendiente"

interface Sprint {
  id: number
  name: string
  project: string
  startDate: string
  endDate: string
  status: Status
  progress: number
  tasks: number
}

// Datos de ejemplo
const initialSprints: Sprint[] = [
  {
    id: 1,
    name: "Sprint 1 - Configuración inicial",
    project: "Sistema de Gestión de Inventario",
    startDate: "01/03/2024",
    endDate: "15/03/2024",
    status: "Completado",
    progress: 100,
    tasks: 3,
  },
  {
    id: 2,
    name: "Sprint 2 - Módulo de productos",
    project: "Sistema de Gestión de Inventario",
    startDate: "16/03/2024",
    endDate: "31/03/2024",
    status: "Completado",
    progress: 100,
    tasks: 3,
  },
  {
    id: 3,
    name: "Sprint 3 - Módulo de proveedores",
    project: "Sistema de Gestión de Inventario",
    startDate: "01/04/2024",
    endDate: "15/04/2024",
    status: "Activo",
    progress: 80,
    tasks: 3,
  },
  {
    id: 4,
    name: "Sprint 4 - Módulo de informes",
    project: "Sistema de Gestión de Inventario",
    startDate: "16/04/2024",
    endDate: "30/04/2024",
    status: "Pendiente",
    progress: 0,
    tasks: 3,
  },
  {
    id: 5,
    name: "Sprint 1 - Diseño de interfaz",
    project: "Aplicación Móvil de Ventas",
    startDate: "01/04/2024",
    endDate: "15/04/2024",
    status: "Activo",
    progress: 60,
    tasks: 4,
  },
  {
    id: 6,
    name: "Sprint 2 - Integración de API",
    project: "Aplicación Móvil de Ventas",
    startDate: "16/04/2024",
    endDate: "30/04/2024",
    status: "Pendiente",
    progress: 0,
    tasks: 5,
  },
]

// Interfaz para tareas
interface Task {
  id: number
  name: string
  description: string
  assignedTo: string
  status: "Pendiente" | "En progreso" | "Completada"
  sprintId: number
}

export default function SprintsPage() {
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints)
  const [filter, setFilter] = useState<string>("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [newSprint, setNewSprint] = useState({
    name: "",
    project: "",
    startDate: "",
    endDate: "",
    description: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Estado para la tarea nueva
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignedTo: "",
    status: "Pendiente" as "Pendiente" | "En progreso" | "Completada",
    sprintId: 0,
  })

  // Manejar el cambio de estado de un sprint
  const handleStatusChange = (sprintId: number, newStatus: Status) => {
    const updatedSprints = sprints.map((sprint) => {
      if (sprint.id === sprintId) {
        return { ...sprint, status: newStatus }
      }
      return sprint
    })
    setSprints(updatedSprints)
    toast({
      title: "Estado actualizado",
      description: `El sprint ha sido marcado como "${newStatus}".`,
    })
  }

  // Manejar la edición de un sprint
  const handleEdit = () => {
    if (selectedSprint) {
      const updatedSprints = sprints.map((sprint) => {
        if (sprint.id === selectedSprint.id) {
          return selectedSprint
        }
        return sprint
      })
      setSprints(updatedSprints)
      setIsEditDialogOpen(false)
      toast({
        title: "Sprint actualizado",
        description: "El sprint ha sido actualizado exitosamente.",
      })
    }
  }

  // Manejar la eliminación de un sprint
  const handleDelete = () => {
    if (selectedSprint) {
      const updatedSprints = sprints.filter((sprint) => sprint.id !== selectedSprint.id)
      setSprints(updatedSprints)
      setIsDeleteDialogOpen(false)
      toast({
        title: "Sprint eliminado",
        description: "El sprint ha sido eliminado exitosamente.",
      })
    }
  }

  // Filtrar sprints según el filtro seleccionado y término de búsqueda
  const filteredSprints = sprints.filter((sprint) => {
    const matchesFilter = filter === "Todos" || sprint.status === filter
    const matchesSearch =
      sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sprint.project.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Función para obtener el color de la badge según el estado
  const getStatusBadgeClass = (status: Status) => {
    switch (status) {
      case "Activo":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
      case "Completado":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return ""
    }
  }

  // Manejar el envío del formulario
  const handleSubmit = () => {
    const newId = Math.max(...sprints.map((s) => s.id)) + 1

    const sprint: Sprint = {
      id: newId,
      name: newSprint.name,
      project: newSprint.project,
      startDate: newSprint.startDate,
      endDate: newSprint.endDate,
      status: "Pendiente",
      progress: 0,
      tasks: 0,
    }

    setSprints([...sprints, sprint])
    setNewSprint({
      name: "",
      project: "",
      startDate: "",
      endDate: "",
      description: "",
    })
    setIsDialogOpen(false)
    toast({
      title: "Sprint creado",
      description: "El sprint ha sido creado exitosamente.",
    })
  }

  // Manejar la creación de una nueva tarea
  const handleAddTask = () => {
    if (selectedSprint) {
      // Aquí se implementaría la lógica para agregar la tarea
      // Por ahora solo actualizamos el contador de tareas del sprint
      const updatedSprints = sprints.map((sprint) => {
        if (sprint.id === selectedSprint.id) {
          return { ...sprint, tasks: sprint.tasks + 1 }
        }
        return sprint
      })

      setSprints(updatedSprints)
      setIsTaskDialogOpen(false)
      setNewTask({
        name: "",
        description: "",
        assignedTo: "",
        status: "Pendiente",
        sprintId: 0,
      })

      toast({
        title: "Tarea agregada",
        description: "La tarea ha sido agregada exitosamente al sprint.",
      })
    }
  }

  // Abrir el diálogo para agregar tarea
  const openAddTaskDialog = (sprint: Sprint) => {
    setSelectedSprint(sprint)
    setNewTask({
      ...newTask,
      sprintId: sprint.id,
    })
    setIsTaskDialogOpen(true)
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Sprints</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />
              Nuevo Sprint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Crear nuevo sprint</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Complete el formulario para crear un nuevo sprint en el proyecto.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-700 dark:text-gray-300">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newSprint.name}
                  onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right text-gray-700 dark:text-gray-300">
                  Proyecto
                </Label>
                <Select
                  value={newSprint.project}
                  onValueChange={(value) => setNewSprint({ ...newSprint, project: value })}
                >
                  <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccione un proyecto" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    <SelectItem value="Sistema de Gestión de Inventario">Sistema de Gestión de Inventario</SelectItem>
                    <SelectItem value="Aplicación Móvil de Ventas">Aplicación Móvil de Ventas</SelectItem>
                    <SelectItem value="Portal Web Corporativo">Portal Web Corporativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right text-gray-700 dark:text-gray-300">
                  Fecha inicio
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newSprint.startDate}
                  onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right text-gray-700 dark:text-gray-300">
                  Fecha fin
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newSprint.endDate}
                  onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-gray-700 dark:text-gray-300">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={newSprint.description}
                  onChange={(e) => setNewSprint({ ...newSprint, description: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
                Crear Sprint
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar sprints..."
              className="w-64 pl-9 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="bg-white dark:bg-gray-800">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="border-b dark:border-gray-700 p-2">
          <div className="flex space-x-1">
            <Button
              variant={filter === "Todos" ? "default" : "ghost"}
              onClick={() => setFilter("Todos")}
              className="rounded-md"
            >
              Todos
            </Button>
            <Button
              variant={filter === "Activo" ? "default" : "ghost"}
              onClick={() => setFilter("Activo")}
              className="rounded-md"
            >
              Activos
            </Button>
            <Button
              variant={filter === "Completado" ? "default" : "ghost"}
              onClick={() => setFilter("Completado")}
              className="rounded-md"
            >
              Completados
            </Button>
            <Button
              variant={filter === "Pendiente" ? "default" : "ghost"}
              onClick={() => setFilter("Pendiente")}
              className="rounded-md"
            >
              Pendientes
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <TableHead className="w-12 text-gray-700 dark:text-gray-300">ID</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">NOMBRE</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">PROYECTO</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">FECHAS</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">ESTADO</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">PROGRESO</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">TAREAS</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSprints.map((sprint) => (
              <TableRow key={sprint.id} className="border-b dark:border-gray-700">
                <TableCell className="font-medium text-gray-900 dark:text-white">{sprint.id}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{sprint.name}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{sprint.project}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                      <span>Inicio: {sprint.startDate}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                      <span>Fin: {sprint.endDate}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeClass(sprint.status)}>
                    {sprint.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{sprint.progress}%</span>
                    </div>
                    <Progress value={sprint.progress} className="h-2 w-24" />
                  </div>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{sprint.tasks}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                      <DropdownMenuLabel className="text-gray-700 dark:text-gray-300">Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => openAddTaskDialog(sprint)}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Añadir tarea
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          toast({
                            title: "Ver detalles",
                            description: `Viendo detalles del sprint: ${sprint.name}`,
                          })
                        }}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedSprint(sprint)
                          setIsEditDialogOpen(true)
                        }}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                      <DropdownMenuLabel className="text-gray-700 dark:text-gray-300">Cambiar estado</DropdownMenuLabel>
                      {sprint.status !== "Activo" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(sprint.id, "Activo")}
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Marcar como Activo
                        </DropdownMenuItem>
                      )}
                      {sprint.status !== "Completado" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(sprint.id, "Completado")}
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Marcar como Completado
                        </DropdownMenuItem>
                      )}
                      {sprint.status !== "Pendiente" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(sprint.id, "Pendiente")}
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Marcar como Pendiente
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => {
                          setSelectedSprint(sprint)
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

        <div className="flex items-center justify-between px-4 py-3 border-t dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando 1 a {filteredSprints.length} de {filteredSprints.length} Entradas
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Diálogo para editar sprint */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Editar sprint</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Modifique los campos que desea actualizar.
            </DialogDescription>
          </DialogHeader>
          {selectedSprint && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right text-gray-700 dark:text-gray-300">
                  Nombre
                </Label>
                <Input
                  id="edit-name"
                  value={selectedSprint.name}
                  onChange={(e) => setSelectedSprint({ ...selectedSprint, name: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-project" className="text-right text-gray-700 dark:text-gray-300">
                  Proyecto
                </Label>
                <Select
                  value={selectedSprint.project}
                  onValueChange={(value) => setSelectedSprint({ ...selectedSprint, project: value })}
                >
                  <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccione un proyecto" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    <SelectItem value="Sistema de Gestión de Inventario">Sistema de Gestión de Inventario</SelectItem>
                    <SelectItem value="Aplicación Móvil de Ventas">Aplicación Móvil de Ventas</SelectItem>
                    <SelectItem value="Portal Web Corporativo">Portal Web Corporativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-startDate" className="text-right text-gray-700 dark:text-gray-300">
                  Fecha inicio
                </Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={selectedSprint.startDate}
                  onChange={(e) => setSelectedSprint({ ...selectedSprint, startDate: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-endDate" className="text-right text-gray-700 dark:text-gray-300">
                  Fecha fin
                </Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={selectedSprint.endDate}
                  onChange={(e) => setSelectedSprint({ ...selectedSprint, endDate: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right text-gray-700 dark:text-gray-300">
                  Estado
                </Label>
                <Select
                  value={selectedSprint.status}
                  onValueChange={(value) => setSelectedSprint({ ...selectedSprint, status: value as Status })}
                >
                  <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para eliminar sprint */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Eliminar sprint</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              ¿Está seguro de que desea eliminar este sprint? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {selectedSprint && (
            <div className="py-4">
              <p className="font-medium text-gray-900 dark:text-white">{selectedSprint.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{selectedSprint.project}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para añadir tarea */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Añadir nueva tarea</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {selectedSprint && `Agregando tarea al sprint: ${selectedSprint.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-name" className="text-right text-gray-700 dark:text-gray-300">
                Nombre
              </Label>
              <Input
                id="task-name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-description" className="text-right text-gray-700 dark:text-gray-300">
                Descripción
              </Label>
              <Textarea
                id="task-description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-assignedTo" className="text-right text-gray-700 dark:text-gray-300">
                Asignado a
              </Label>
              <Select
                value={newTask.assignedTo}
                onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
              >
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Seleccione un miembro" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="JP">Juan Pérez</SelectItem>
                  <SelectItem value="CR">Carlos Rodríguez</SelectItem>
                  <SelectItem value="AM">Ana Martínez</SelectItem>
                  <SelectItem value="LG">Laura González</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-status" className="text-right text-gray-700 dark:text-gray-300">
                Estado
              </Label>
              <Select
                value={newTask.status}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, status: value as "Pendiente" | "En progreso" | "Completada" })
                }
              >
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En progreso">En progreso</SelectItem>
                  <SelectItem value="Completada">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTaskDialogOpen(false)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Cancelar
            </Button>
            <Button type="submit" onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700 text-white">
              Añadir Tarea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
