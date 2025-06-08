"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, MoreHorizontal, Search, Mail, Phone } from "lucide-react"
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

// Tipos para los usuarios
type Role = "Administrador" | "Desarrollador" | "Analista" | "Tester"
type Status = "Activo" | "Inactivo"

interface User {
  id: number
  name: string
  email: string
  role: Role
  department: string
  status: Status
  phone: string
  joinDate: string
}

// Datos de ejemplo
const initialUsers: User[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Desarrollador",
    department: "Ingeniería",
    status: "Activo",
    phone: "+1234567890",
    joinDate: "01/01/2023",
  },
  {
    id: 2,
    name: "María López",
    email: "maria.lopez@example.com",
    role: "Analista",
    department: "Producto",
    status: "Activo",
    phone: "+1234567891",
    joinDate: "15/02/2023",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    role: "Administrador",
    department: "TI",
    status: "Activo",
    phone: "+1234567892",
    joinDate: "10/03/2023",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    role: "Tester",
    department: "QA",
    status: "Inactivo",
    phone: "+1234567893",
    joinDate: "05/04/2023",
  },
  {
    id: 5,
    name: "Roberto Sánchez",
    email: "roberto.sanchez@example.com",
    role: "Desarrollador",
    department: "Ingeniería",
    status: "Activo",
    phone: "+1234567894",
    joinDate: "20/05/2023",
  },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [filter, setFilter] = useState<string>("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "" as Role,
    department: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddToTeamDialogOpen, setIsAddToTeamDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState("")

  // Filtrar usuarios según el filtro seleccionado y término de búsqueda
  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "Todos" || user.status === filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Función para obtener el color de la badge según el rol
  const getRoleBadgeClass = (role: Role) => {
    switch (role) {
      case "Administrador":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
      case "Desarrollador":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
      case "Analista":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
      case "Tester":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
      default:
        return ""
    }
  }

  // Función para obtener el color de la badge según el estado
  const getStatusBadgeClass = (status: Status) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
      case "Inactivo":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
      default:
        return ""
    }
  }

  // Manejar el envío del formulario
  const handleSubmit = () => {
    const newId = Math.max(...users.map((u) => u.id)) + 1

    const user: User = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: "Activo",
      phone: newUser.phone,
      joinDate: new Date().toLocaleDateString("es-ES"),
    }

    setUsers([...users, user])
    setNewUser({
      name: "",
      email: "",
      role: "" as Role,
      department: "",
      phone: "",
      password: "",
      confirmPassword: "",
    })
    setIsDialogOpen(false)
    toast({
      title: "Usuario creado",
      description: "El usuario ha sido creado exitosamente.",
    })
  }

  // Manejar la edición de un usuario
  const handleEdit = () => {
    if (selectedUser) {
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          return selectedUser
        }
        return user
      })
      setUsers(updatedUsers)
      setIsEditDialogOpen(false)
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado exitosamente.",
      })
    }
  }

  // Manejar la eliminación de un usuario
  const handleDelete = () => {
    if (selectedUser) {
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id)
      setUsers(updatedUsers)
      setIsDeleteDialogOpen(false)
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado exitosamente.",
      })
    }
  }

  // Manejar el cambio de estado de un usuario
  const handleStatusChange = (userId: number, newStatus: Status) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, status: newStatus }
      }
      return user
    })
    setUsers(updatedUsers)
    toast({
      title: "Estado actualizado",
      description: `El usuario ha sido marcado como "${newStatus}".`,
    })
  }

  // Manejar agregar a equipo
  const handleAddToTeam = () => {
    if (selectedUser && selectedTeam) {
      toast({
        title: "Usuario agregado al equipo",
        description: `${selectedUser.name} ha sido agregado al equipo ${selectedTeam}.`,
      })
      setIsAddToTeamDialogOpen(false)
      setSelectedTeam("")
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Crear nuevo usuario</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Complete el formulario para crear un nuevo usuario en el sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-700 dark:text-gray-300">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right text-gray-700 dark:text-gray-300">
                  Rol
                </Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as Role })}>
                  <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Desarrollador">Desarrollador</SelectItem>
                    <SelectItem value="Analista">Analista</SelectItem>
                    <SelectItem value="Tester">Tester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right text-gray-700 dark:text-gray-300">
                  Departamento
                </Label>
                <Select
                  value={newUser.department}
                  onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                >
                  <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccione un departamento" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                    <SelectItem value="Producto">Producto</SelectItem>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-gray-700 dark:text-gray-300">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right text-gray-700 dark:text-gray-300">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right text-gray-700 dark:text-gray-300">
                  Confirmar
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
                Crear Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar usuarios..."
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
              variant={filter === "Inactivo" ? "default" : "ghost"}
              onClick={() => setFilter("Inactivo")}
              className="rounded-md"
            >
              Inactivos
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <TableHead className="w-12 text-gray-700 dark:text-gray-300">ID</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">USUARIO</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">ROL</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">DEPARTAMENTO</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">CONTACTO</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">ESTADO</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">FECHA INGRESO</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-b dark:border-gray-700">
                <TableCell className="font-medium text-gray-900 dark:text-white">{user.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{user.department}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Mail className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                      <span className="truncate max-w-[150px]">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Phone className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeClass(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{user.joinDate}</TableCell>
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
                        onClick={() => {
                          setSelectedUser(user)
                          setIsAddToTeamDialogOpen(true)
                        }}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Agregar a equipo
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          toast({
                            title: "Ver perfil",
                            description: `Viendo perfil de: ${user.name}`,
                          })
                        }}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Ver perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user)
                          setIsEditDialogOpen(true)
                        }}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                      <DropdownMenuLabel className="text-gray-700 dark:text-gray-300">Cambiar estado</DropdownMenuLabel>
                      {user.status !== "Activo" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(user.id, "Activo")}
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Activar usuario
                        </DropdownMenuItem>
                      )}
                      {user.status !== "Inactivo" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(user.id, "Inactivo")}
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Desactivar usuario
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => {
                          setSelectedUser(user)
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
            Mostrando 1 a {filteredUsers.length} de {filteredUsers.length} Entradas
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

      {/* Diálogo para editar usuario */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Editar usuario</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Modifique los campos que desea actualizar.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right text-gray-700 dark:text-gray-300">
                  Nombre
                </Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right text-gray-700 dark:text-gray-300">
                  Rol
                </Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value as Role })}
                >
                  <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Desarrollador">Desarrollador</SelectItem>
                    <SelectItem value="Analista">Analista</SelectItem>
                    <SelectItem value="Tester">Tester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right text-gray-700 dark:text-gray-300">
                  Departamento
                </Label>
                <Select
                  value={selectedUser.department}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, department: value })}
                >
                  <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccione un departamento" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                    <SelectItem value="Producto">Producto</SelectItem>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right text-gray-700 dark:text-gray-300">
                  Teléfono
                </Label>
                <Input
                  id="edit-phone"
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                  className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
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

      {/* Diálogo para eliminar usuario */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Eliminar usuario</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              ¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p className="font-medium text-gray-900 dark:text-white">{selectedUser.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.email}</p>
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

      {/* Diálogo para agregar a equipo */}
      <Dialog open={isAddToTeamDialogOpen} onOpenChange={setIsAddToTeamDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Agregar a equipo</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {selectedUser && `Seleccione el equipo al que desea agregar a ${selectedUser.name}.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right text-gray-700 dark:text-gray-300">
                Equipo
              </Label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Seleccione un equipo" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="Frontend">Equipo Frontend</SelectItem>
                  <SelectItem value="Backend">Equipo Backend</SelectItem>
                  <SelectItem value="QA">Equipo QA</SelectItem>
                  <SelectItem value="DevOps">Equipo DevOps</SelectItem>
                  <SelectItem value="Mobile">Equipo Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddToTeamDialogOpen(false)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Cancelar
            </Button>
            <Button type="submit" onClick={handleAddToTeam} className="bg-blue-600 hover:bg-blue-700 text-white">
              Agregar al Equipo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
