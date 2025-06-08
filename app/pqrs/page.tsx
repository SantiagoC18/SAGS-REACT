"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, MoreHorizontal, Search } from "lucide-react"
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

// Tipos para las opiniones/PQRS
type OpinionType = "Petición" | "Queja" | "Reclamo" | "Sugerencia"
type Status = "Pendiente" | "En revisión" | "Resuelta" | "Cerrada"

interface Opinion {
  id: number
  title: string
  description: string
  type: OpinionType
  status: Status
  date: string
  user: string
}

// Datos de ejemplo
const initialOpinions: Opinion[] = [
  {
    id: 1,
    title: "Mejora en la interfaz de usuario",
    description: "Sería útil tener una interfaz más intuitiva para la gestión de proyectos.",
    type: "Sugerencia",
    status: "Pendiente",
    date: "15/05/2024",
    user: "Carlos Rodríguez",
  },
  {
    id: 2,
    title: "Error al cargar proyectos",
    description: "Cuando intento cargar proyectos con más de 20 tareas, la página se bloquea.",
    type: "Queja",
    status: "En revisión",
    date: "12/05/2024",
    user: "Ana Martínez",
  },
  {
    id: 3,
    title: "Solicitud de nueva funcionalidad",
    description: "Necesitamos poder exportar los informes en formato Excel.",
    type: "Petición",
    status: "Pendiente",
    date: "10/05/2024",
    user: "Juan Pérez",
  },
  {
    id: 4,
    title: "Problema con la asignación de tareas",
    description: "No puedo asignar tareas a más de 3 usuarios simultáneamente.",
    type: "Reclamo",
    status: "Resuelta",
    date: "05/05/2024",
    user: "María López",
  },
  {
    id: 5,
    title: "Sugerencia para mejorar reportes",
    description: "Sería útil tener gráficos más detallados en los informes de progreso.",
    type: "Sugerencia",
    status: "Cerrada",
    date: "01/05/2024",
    user: "Pedro Sánchez",
  },
]

export default function PQRSPage() {
  const [opinions, setOpinions] = useState<Opinion[]>(initialOpinions)
  const [filter, setFilter] = useState<string>("Todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [newOpinion, setNewOpinion] = useState({
    title: "",
    description: "",
    type: "Petición" as OpinionType,
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filtrar opiniones según el filtro seleccionado y término de búsqueda
  const filteredOpinions = opinions.filter((opinion) => {
    const matchesFilter = filter === "Todas" || opinion.type === filter
    const matchesSearch =
      opinion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opinion.user.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Función para obtener el color de la badge según el tipo
  const getTypeBadgeClass = (type: OpinionType) => {
    switch (type) {
      case "Petición":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Queja":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Reclamo":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "Sugerencia":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return ""
    }
  }

  // Función para obtener el color de la badge según el estado
  const getStatusBadgeClass = (status: Status) => {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "En revisión":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Resuelta":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Cerrada":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return ""
    }
  }

  // Manejar el envío del formulario
  const handleSubmit = () => {
    const newId = Math.max(...opinions.map((o) => o.id)) + 1
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`

    const opinion: Opinion = {
      id: newId,
      title: newOpinion.title,
      description: newOpinion.description,
      type: newOpinion.type,
      status: "Pendiente",
      date: formattedDate,
      user: "Usuario Actual", // En una implementación real, esto vendría del usuario autenticado
    }

    setOpinions([opinion, ...opinions])
    setNewOpinion({
      title: "",
      description: "",
      type: "Petición",
    })
    setIsDialogOpen(false)
    toast({
      title: "Opinión enviada",
      description: "Su opinión ha sido enviada exitosamente.",
    })
  }

  // Manejar la edición de una opinión
  const handleEdit = () => {
    if (selectedOpinion) {
      const updatedOpinions = opinions.map((opinion) => {
        if (opinion.id === selectedOpinion.id) {
          return selectedOpinion
        }
        return opinion
      })
      setOpinions(updatedOpinions)
      setIsEditDialogOpen(false)
      toast({
        title: "Opinión actualizada",
        description: "La opinión ha sido actualizada exitosamente.",
      })
    }
  }

  // Manejar la eliminación de una opinión
  const handleDelete = () => {
    if (selectedOpinion) {
      const updatedOpinions = opinions.filter((opinion) => opinion.id !== selectedOpinion.id)
      setOpinions(updatedOpinions)
      setIsDeleteDialogOpen(false)
      toast({
        title: "Opinión eliminada",
        description: "La opinión ha sido eliminada exitosamente.",
      })
    }
  }

  // Manejar el cambio de estado de una opinión
  const handleStatusChange = (opinionId: number, newStatus: Status) => {
    const updatedOpinions = opinions.map((opinion) => {
      if (opinion.id === opinionId) {
        return { ...opinion, status: newStatus }
      }
      return opinion
    })
    setOpinions(updatedOpinions)
    toast({
      title: "Estado actualizado",
      description: `La opinión ha sido marcada como "${newStatus}".`,
    })
  }

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">PQRS - Peticiones, Quejas, Reclamos y Sugerencias</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Opinión
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agregar nueva opinión</DialogTitle>
              <DialogDescription>
                Complete el formulario para enviar su petición, queja, reclamo o sugerencia.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  value={newOpinion.title}
                  onChange={(e) => setNewOpinion({ ...newOpinion, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select
                  value={newOpinion.type}
                  onValueChange={(value) => setNewOpinion({ ...newOpinion, type: value as OpinionType })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petición">Petición</SelectItem>
                    <SelectItem value="Queja">Queja</SelectItem>
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
                    <SelectItem value="Sugerencia">Sugerencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={newOpinion.description}
                  onChange={(e) => setNewOpinion({ ...newOpinion, description: e.target.value })}
                  className="col-span-3"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles de la opinión</DialogTitle>
            </DialogHeader>
            {selectedOpinion && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{selectedOpinion.title}</h2>
                  <Badge variant="outline" className={getTypeBadgeClass(selectedOpinion.type)}>
                    {selectedOpinion.type}
                  </Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedOpinion.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                    <Badge variant="outline" className={getStatusBadgeClass(selectedOpinion.status)}>
                      {selectedOpinion.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
                    <p>{selectedOpinion.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Usuario</h3>
                    <p>{selectedOpinion.user}</p>
                  </div>
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

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar opinión</DialogTitle>
              <DialogDescription>Modifique los campos que desea actualizar.</DialogDescription>
            </DialogHeader>
            {selectedOpinion && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-title" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="edit-title"
                    value={selectedOpinion.title}
                    onChange={(e) => setSelectedOpinion({ ...selectedOpinion, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-type" className="text-right">
                    Tipo
                  </Label>
                  <Select
                    value={selectedOpinion.type}
                    onValueChange={(value) => setSelectedOpinion({ ...selectedOpinion, type: value as OpinionType })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petición">Petición</SelectItem>
                      <SelectItem value="Queja">Queja</SelectItem>
                      <SelectItem value="Reclamo">Reclamo</SelectItem>
                      <SelectItem value="Sugerencia">Sugerencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">
                    Descripción
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={selectedOpinion.description}
                    onChange={(e) => setSelectedOpinion({ ...selectedOpinion, description: e.target.value })}
                    className="col-span-3"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Estado
                  </Label>
                  <Select
                    value={selectedOpinion.status}
                    onValueChange={(value) => setSelectedOpinion({ ...selectedOpinion, status: value as Status })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="En revisión">En revisión</SelectItem>
                      <SelectItem value="Resuelta">Resuelta</SelectItem>
                      <SelectItem value="Cerrada">Cerrada</SelectItem>
                    </SelectContent>
                  </Select>
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
              <DialogTitle>Eliminar opinión</DialogTitle>
              <DialogDescription>
                ¿Está seguro de que desea eliminar esta opinión? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            {selectedOpinion && (
              <div className="py-4">
                <p className="font-medium">{selectedOpinion.title}</p>
                <p className="text-sm text-gray-500">{selectedOpinion.type}</p>
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
              placeholder="Buscar opiniones..."
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
              variant={filter === "Petición" ? "default" : "ghost"}
              onClick={() => setFilter("Petición")}
              className="rounded-md"
            >
              Peticiones
            </Button>
            <Button
              variant={filter === "Queja" ? "default" : "ghost"}
              onClick={() => setFilter("Queja")}
              className="rounded-md"
            >
              Quejas
            </Button>
            <Button
              variant={filter === "Reclamo" ? "default" : "ghost"}
              onClick={() => setFilter("Reclamo")}
              className="rounded-md"
            >
              Reclamos
            </Button>
            <Button
              variant={filter === "Sugerencia" ? "default" : "ghost"}
              onClick={() => setFilter("Sugerencia")}
              className="rounded-md"
            >
              Sugerencias
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>TÍTULO</TableHead>
              <TableHead>TIPO</TableHead>
              <TableHead>ESTADO</TableHead>
              <TableHead>FECHA</TableHead>
              <TableHead>USUARIO</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpinions.map((opinion) => (
              <TableRow key={opinion.id}>
                <TableCell className="font-medium">{opinion.id}</TableCell>
                <TableCell>{opinion.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeBadgeClass(opinion.type)}>
                    {opinion.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeClass(opinion.status)}>
                    {opinion.status}
                  </Badge>
                </TableCell>
                <TableCell>{opinion.date}</TableCell>
                <TableCell>{opinion.user}</TableCell>
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
                          setSelectedOpinion(opinion)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedOpinion(opinion)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
                      {opinion.status !== "Pendiente" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(opinion.id, "Pendiente")}>
                          Marcar como Pendiente
                        </DropdownMenuItem>
                      )}
                      {opinion.status !== "En revisión" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(opinion.id, "En revisión")}>
                          Marcar como En revisión
                        </DropdownMenuItem>
                      )}
                      {opinion.status !== "Resuelta" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(opinion.id, "Resuelta")}>
                          Marcar como Resuelta
                        </DropdownMenuItem>
                      )}
                      {opinion.status !== "Cerrada" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(opinion.id, "Cerrada")}>
                          Marcar como Cerrada
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedOpinion(opinion)
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
            Mostrando 1 a {filteredOpinions.length} de {filteredOpinions.length} Entradas
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
