"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, MoreHorizontal, Search, FileText } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
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

// Tipos para los modelos
type Status = "Activo" | "Pendiente" | "Evaluando"
type ModelType = "UML" | "ER" | "IEEE-830" | "MR" | "RF" | "RNF" | "MC"

interface Model {
  id: number
  name: string
  type: ModelType
  project: string
  status: Status
  lastUpdate: string
  checklistCompleted: number
  checklistTotal: number
}

// Datos de ejemplo
const initialModels: Model[] = [
  {
    id: 1,
    name: "Diagrama de Clases",
    type: "UML",
    project: "Sistema de Gestión de Inventario",
    status: "Activo",
    lastUpdate: "10/03/2024",
    checklistCompleted: 5,
    checklistTotal: 5,
  },
  {
    id: 2,
    name: "Modelo Entidad-Relación",
    type: "ER",
    project: "Sistema de Gestión de Inventario",
    status: "Activo",
    lastUpdate: "12/03/2024",
    checklistCompleted: 4,
    checklistTotal: 5,
  },
  {
    id: 3,
    name: "Especificación de Requisitos",
    type: "IEEE-830",
    project: "Sistema de Gestión de Inventario",
    status: "Pendiente",
    lastUpdate: "15/03/2024",
    checklistCompleted: 2,
    checklistTotal: 8,
  },
  {
    id: 4,
    name: "Modelo Relacional",
    type: "MR",
    project: "Sistema de Gestión de Inventario",
    status: "Evaluando",
    lastUpdate: "18/03/2024",
    checklistCompleted: 3,
    checklistTotal: 6,
  },
  {
    id: 5,
    name: "Requisitos Funcionales",
    type: "RF",
    project: "Aplicación Móvil de Ventas",
    status: "Activo",
    lastUpdate: "05/04/2024",
    checklistCompleted: 10,
    checklistTotal: 10,
  },
  {
    id: 6,
    name: "Requisitos No Funcionales",
    type: "RNF",
    project: "Aplicación Móvil de Ventas",
    status: "Activo",
    lastUpdate: "08/04/2024",
    checklistCompleted: 8,
    checklistTotal: 10,
  },
  {
    id: 7,
    name: "Modelo Conceptual",
    type: "MC",
    project: "Portal Web Corporativo",
    status: "Evaluando",
    lastUpdate: "12/04/2024",
    checklistCompleted: 3,
    checklistTotal: 7,
  },
]

// Datos de ejemplo para el checklist
const checklistItems = [
  { id: 1, label: "El diagrama incluye todas las clases necesarias" },
  { id: 2, label: "Las relaciones entre clases están correctamente definidas" },
  { id: 3, label: "Los atributos de cada clase están completos" },
  { id: 4, label: "Los métodos de cada clase están definidos" },
  { id: 5, label: "El diagrama sigue las convenciones de UML" },
  { id: 6, label: "El diagrama está documentado adecuadamente" },
  { id: 7, label: "Se han incluido las cardinalidades en las relaciones" },
  { id: 8, label: "El diagrama ha sido revisado por el equipo" },
]

export default function ModelosPage() {
  const [models, setModels] = useState<Model[]>(initialModels)
  const [filter, setFilter] = useState<string>("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [newModel, setNewModel] = useState({
    name: "",
    type: "" as ModelType,
    project: "",
    description: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filtrar modelos según el filtro seleccionado y término de búsqueda
  const filteredModels = models.filter((model) => {
    const matchesFilter = filter === "Todos" || model.status === filter
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

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

  // Función para obtener el color de la badge según el tipo
  const getTypeBadgeClass = (type: ModelType) => {
    switch (type) {
      case "UML":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "ER":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "IEEE-830":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "MR":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "RF":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "RNF":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
      case "MC":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100"
      default:
        return ""
    }
  }

  // Manejar el envío del formulario
  const handleSubmit = () => {
    const newId = Math.max(...models.map((m) => m.id)) + 1

    const model: Model = {
      id: newId,
      name: newModel.name,
      type: newModel.type,
      project: newModel.project,
      status: "Pendiente",
      lastUpdate: new Date().toLocaleDateString("es-ES"),
      checklistCompleted: 0,
      checklistTotal: 8,
    }

    setModels([...models, model])
    setNewModel({
      name: "",
      type: "" as ModelType,
      project: "",
      description: "",
    })
    setIsDialogOpen(false)
    toast({
      title: "Modelo creado",
      description: "El modelo ha sido creado exitosamente.",
    })
  }

  // Abrir el checklist para un modelo
  const openChecklist = (model: Model) => {
    setSelectedModel(model)
    setCheckedItems(Array.from({ length: model.checklistCompleted }, (_, i) => i + 1))
    setIsChecklistOpen(true)
  }

  // Guardar el checklist
  const saveChecklist = () => {
    if (selectedModel) {
      const updatedModels = models.map((model) => {
        if (model.id === selectedModel.id) {
          return {
            ...model,
            checklistCompleted: checkedItems.length,
            lastUpdate: new Date().toLocaleDateString("es-ES"),
          }
        }
        return model
      })
      setModels(updatedModels)
      setIsChecklistOpen(false)
      toast({
        title: "Checklist actualizado",
        description: "El checklist ha sido actualizado exitosamente.",
      })
    }
  }

  // Manejar la edición de un modelo
  const handleEdit = () => {
    if (selectedModel) {
      const updatedModels = models.map((model) => {
        if (model.id === selectedModel.id) {
          return selectedModel
        }
        return model
      })
      setModels(updatedModels)
      setIsEditDialogOpen(false)
      toast({
        title: "Modelo actualizado",
        description: "El modelo ha sido actualizado exitosamente.",
      })
    }
  }

  // Manejar la eliminación de un modelo
  const handleDelete = () => {
    if (selectedModel) {
      const updatedModels = models.filter((model) => model.id !== selectedModel.id)
      setModels(updatedModels)
      setIsDeleteDialogOpen(false)
      toast({
        title: "Modelo eliminado",
        description: "El modelo ha sido eliminado exitosamente.",
      })
    }
  }

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Modelos</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Modelo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear nuevo modelo</DialogTitle>
              <DialogDescription>Complete el formulario para crear un nuevo modelo o diagrama.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newModel.name}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select
                  value={newModel.type}
                  onValueChange={(value) => setNewModel({ ...newModel, type: value as ModelType })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UML">UML</SelectItem>
                    <SelectItem value="ER">ER</SelectItem>
                    <SelectItem value="IEEE-830">IEEE-830</SelectItem>
                    <SelectItem value="MR">MR</SelectItem>
                    <SelectItem value="RF">RF</SelectItem>
                    <SelectItem value="RNF">RNF</SelectItem>
                    <SelectItem value="MC">MC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Proyecto
                </Label>
                <Select
                  value={newModel.project}
                  onValueChange={(value) => setNewModel({ ...newModel, project: value })}
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
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={newModel.description}
                  onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Crear Modelo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isChecklistOpen} onOpenChange={setIsChecklistOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Checklist de Modelo</DialogTitle>
              <DialogDescription>
                {selectedModel?.name} - {selectedModel?.type}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={checkedItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCheckedItems([...checkedItems, item.id])
                        } else {
                          setCheckedItems(checkedItems.filter((id) => id !== item.id))
                        }
                      }}
                    />
                    <label
                      htmlFor={`item-${item.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={saveChecklist}>
                Guardar Checklist
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar modelo</DialogTitle>
              <DialogDescription>Modifique los campos que desea actualizar.</DialogDescription>
            </DialogHeader>
            {selectedModel && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedModel.name}
                    onChange={(e) => setSelectedModel({ ...selectedModel, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-type" className="text-right">
                    Tipo
                  </Label>
                  <Select
                    value={selectedModel.type}
                    onValueChange={(value) => setSelectedModel({ ...selectedModel, type: value as ModelType })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UML">UML</SelectItem>
                      <SelectItem value="ER">ER</SelectItem>
                      <SelectItem value="IEEE-830">IEEE-830</SelectItem>
                      <SelectItem value="MR">MR</SelectItem>
                      <SelectItem value="RF">RF</SelectItem>
                      <SelectItem value="RNF">RNF</SelectItem>
                      <SelectItem value="MC">MC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-project" className="text-right">
                    Proyecto
                  </Label>
                  <Select
                    value={selectedModel.project}
                    onValueChange={(value) => setSelectedModel({ ...selectedModel, project: value })}
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
                  <Label htmlFor="edit-status" className="text-right">
                    Estado
                  </Label>
                  <Select
                    value={selectedModel.status}
                    onValueChange={(value) => setSelectedModel({ ...selectedModel, status: value as Status })}
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
              <DialogTitle>Eliminar modelo</DialogTitle>
              <DialogDescription>
                ¿Está seguro de que desea eliminar este modelo? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            {selectedModel && (
              <div className="py-4">
                <p className="font-medium">{selectedModel.name}</p>
                <p className="text-sm text-gray-500">{selectedModel.type}</p>
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
              placeholder="Buscar modelos..."
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
              <TableHead className="w-12">ID</TableHead>
              <TableHead>NOMBRE</TableHead>
              <TableHead>TIPO</TableHead>
              <TableHead>PROYECTO</TableHead>
              <TableHead>ESTADO</TableHead>
              <TableHead>ÚLTIMA ACTUALIZACIÓN</TableHead>
              <TableHead>CHECKLIST</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModels.map((model) => (
              <TableRow key={model.id}>
                <TableCell className="font-medium">{model.id}</TableCell>
                <TableCell>{model.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeBadgeClass(model.type)}>
                    {model.type}
                  </Badge>
                </TableCell>
                <TableCell>{model.project}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeClass(model.status)}>
                    {model.status}
                  </Badge>
                </TableCell>
                <TableCell>{model.lastUpdate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {model.checklistCompleted}/{model.checklistTotal}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => openChecklist(model)}>
                      <FileText className="h-3 w-3 mr-1" />
                      Checklist
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => openChecklist(model)}>Ver checklist</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedModel(model)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedModel(model)
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
            Mostrando 1 a {filteredModels.length} de {filteredModels.length} Entradas
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
