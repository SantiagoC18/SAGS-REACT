"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  Users,
  CheckSquare,
  BarChart,
  FileText,
  MessageSquare,
  ArrowLeft,
  Plus,
  Edit,
  Eye,
  Download,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"

// Tipos para el proyecto
interface TeamMember {
  id: number
  name: string
  role: string
  initials: string
}

interface Task {
  id: number
  name: string
  status: "Completada" | "En progreso" | "Pendiente"
  assignedTo: string
  dueDate: string
}

interface Sprint {
  id: number
  name: string
  startDate: string
  endDate: string
  progress: number
  tasks: Task[]
}

interface Model {
  id: number
  name: string
  type: string
  status: "Activo" | "Pendiente" | "Archivado"
  updatedAt: string
  imageUrl?: string
}

interface Meeting {
  id: number
  title: string
  date: string
  time: string
  status: "Programada" | "Completada" | "Cancelada"
  description: string
  tags: string[]
  comments: number
}

interface Report {
  id: number
  title: string
  type: "Progreso" | "Tareas" | "Plazos" | "Rendimiento" | "Resumen"
  date: string
  imageUrl?: string
}

interface Project {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  status: "Activo" | "Completado" | "En pausa"
  progress: number
  team: TeamMember[]
  sprints: Sprint[]
  models: Model[]
  meetings: Meeting[]
  reports: Report[]
}

// Datos de ejemplo
const projectData: Project = {
  id: 1,
  name: "Sistema de Gestión de Inventario",
  description:
    "Desarrollo de un sistema completo para la gestión de inventario, incluyendo seguimiento de productos, gestión de proveedores y generación de informes.",
  startDate: "01/03/2024",
  endDate: "30/09/2024",
  status: "Activo",
  progress: 45,
  team: [
    { id: 1, name: "Juan Pérez", role: "Líder de Proyecto", initials: "JP" },
    { id: 2, name: "Ana Martínez", role: "Desarrollador Frontend", initials: "AM" },
    { id: 3, name: "Carlos Rodríguez", role: "Desarrollador Backend", initials: "CR" },
    { id: 4, name: "María López", role: "Diseñador UX/UI", initials: "ML" },
    { id: 5, name: "Pedro Sánchez", role: "QA Tester", initials: "PS" },
  ],
  sprints: [
    {
      id: 1,
      name: "Sprint 1 - Configuración inicial",
      startDate: "01/03/2024",
      endDate: "15/03/2024",
      progress: 100,
      tasks: [
        {
          id: 101,
          name: "Configurar entorno de desarrollo",
          status: "Completada",
          assignedTo: "JP",
          dueDate: "05/03/2024",
        },
        {
          id: 102,
          name: "Diseñar arquitectura del sistema",
          status: "Completada",
          assignedTo: "CR",
          dueDate: "10/03/2024",
        },
        {
          id: 103,
          name: "Crear repositorio y estructura de proyecto",
          status: "Completada",
          assignedTo: "AM",
          dueDate: "15/03/2024",
        },
      ],
    },
    {
      id: 2,
      name: "Sprint 2 - Módulo de productos",
      startDate: "16/03/2024",
      endDate: "31/03/2024",
      progress: 100,
      tasks: [
        {
          id: 201,
          name: "Diseñar base de datos para productos",
          status: "Completada",
          assignedTo: "CR",
          dueDate: "20/03/2024",
        },
        {
          id: 202,
          name: "Implementar API de productos",
          status: "Completada",
          assignedTo: "CR",
          dueDate: "25/03/2024",
        },
        {
          id: 203,
          name: "Crear interfaz de gestión de productos",
          status: "Completada",
          assignedTo: "AM",
          dueDate: "31/03/2024",
        },
      ],
    },
    {
      id: 3,
      name: "Sprint 3 - Módulo de proveedores",
      startDate: "01/04/2024",
      endDate: "15/04/2024",
      progress: 80,
      tasks: [
        {
          id: 301,
          name: "Diseñar base de datos para proveedores",
          status: "Completada",
          assignedTo: "CR",
          dueDate: "05/04/2024",
        },
        {
          id: 302,
          name: "Implementar API de proveedores",
          status: "Completada",
          assignedTo: "CR",
          dueDate: "10/04/2024",
        },
        {
          id: 303,
          name: "Crear interfaz de gestión de proveedores",
          status: "En progreso",
          assignedTo: "AM",
          dueDate: "15/04/2024",
        },
      ],
    },
    {
      id: 4,
      name: "Sprint 4 - Módulo de informes",
      startDate: "16/04/2024",
      endDate: "30/04/2024",
      progress: 0,
      tasks: [
        {
          id: 401,
          name: "Diseñar estructura de informes",
          status: "Pendiente",
          assignedTo: "JP",
          dueDate: "20/04/2024",
        },
        {
          id: 402,
          name: "Implementar generación de informes",
          status: "Pendiente",
          assignedTo: "CR",
          dueDate: "25/04/2024",
        },
        {
          id: 403,
          name: "Crear interfaz de visualización de informes",
          status: "Pendiente",
          assignedTo: "AM",
          dueDate: "30/04/2024",
        },
      ],
    },
  ],
  models: [
    {
      id: 1,
      name: "Diagrama ER",
      type: "Diagrama",
      status: "Activo",
      updatedAt: "10/03/2024",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Diagrama UML",
      type: "Diagrama",
      status: "Activo",
      updatedAt: "15/03/2024",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "IEEE-830",
      type: "Documento",
      status: "Pendiente",
      updatedAt: "20/03/2024",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ],
  meetings: [
    {
      id: 1,
      title: "Reunión de inicio de proyecto",
      date: "01/03/2024",
      time: "10:00 AM",
      status: "Completada",
      description: "Reunión inicial para definir los objetivos, alcance y cronograma del proyecto.",
      tags: ["Kickoff", "Planificación"],
      comments: 5,
    },
    {
      id: 2,
      title: "Revisión de Sprint 1",
      date: "15/03/2024",
      time: "11:00 AM",
      status: "Completada",
      description: "Revisión de los entregables del Sprint 1 y planificación del Sprint 2.",
      tags: ["Sprint Review", "Sprint Planning"],
      comments: 3,
    },
  ],
  reports: [
    {
      id: 1,
      title: "Informe de Progreso - Marzo 2024",
      type: "Progreso",
      date: "31/03/2024",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Gráfico+de+Progreso",
    },
    {
      id: 2,
      title: "Informe de Rendimiento - Sprint 1",
      type: "Rendimiento",
      date: "15/03/2024",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Gráfico+de+Rendimiento",
    },
  ],
}

export default function ProyectoDetallePage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project>(projectData)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null)
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
  })
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "Pendiente" as "Pendiente" | "En progreso" | "Completada",
  })

  const [isAddSprintDialogOpen, setIsAddSprintDialogOpen] = useState(false)
  const [newSprint, setNewSprint] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  })

  // Estados para modelos
  const [isAddModelDialogOpen, setIsAddModelDialogOpen] = useState(false)
  const [isEditModelDialogOpen, setIsEditModelDialogOpen] = useState(false)
  const [isViewModelDialogOpen, setIsViewModelDialogOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [newModel, setNewModel] = useState({
    name: "",
    type: "",
    status: "Pendiente" as "Activo" | "Pendiente" | "Archivado",
    file: null as File | null,
  })

  // Estados para reuniones
  const [isAddMeetingDialogOpen, setIsAddMeetingDialogOpen] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    tags: [] as string[],
    status: "Programada" as "Programada" | "Completada" | "Cancelada",
  })
  const [newTag, setNewTag] = useState("")

  // Estados para informes
  const [isAddReportDialogOpen, setIsAddReportDialogOpen] = useState(false)
  const [newReport, setNewReport] = useState({
    title: "",
    type: "" as "Progreso" | "Tareas" | "Plazos" | "Rendimiento" | "Resumen",
    description: "",
  })

  // Función para obtener el color de la badge según el estado
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
      case "Completado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
      case "En pausa":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
      case "Completada":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
      case "En progreso":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
      case "Programada":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
      case "Cancelada":
        return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300"
      case "Archivado":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
      default:
        return ""
    }
  }

  // Manejar agregar miembro
  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      const newId = Math.max(...project.team.map((m) => m.id)) + 1
      const initials = newMember.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

      const member: TeamMember = {
        id: newId,
        name: newMember.name,
        role: newMember.role,
        initials: initials,
      }

      setProject({
        ...project,
        team: [...project.team, member],
      })

      setNewMember({ name: "", role: "", email: "" })
      setIsAddMemberDialogOpen(false)

      toast({
        title: "Miembro agregado",
        description: `${newMember.name} ha sido agregado al equipo.`,
      })
    }
  }

  // Manejar agregar tarea
  const handleAddTask = () => {
    if (selectedSprint && newTask.name) {
      const newId = Math.max(...selectedSprint.tasks.map((t) => t.id)) + 1

      const task: Task = {
        id: newId,
        name: newTask.name,
        status: newTask.status,
        assignedTo: newTask.assignedTo,
        dueDate: newTask.dueDate,
      }

      const updatedSprints = project.sprints.map((sprint) => {
        if (sprint.id === selectedSprint.id) {
          return {
            ...sprint,
            tasks: [...sprint.tasks, task],
          }
        }
        return sprint
      })

      setProject({
        ...project,
        sprints: updatedSprints,
      })

      setNewTask({
        name: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        status: "Pendiente",
      })
      setIsAddTaskDialogOpen(false)
      setSelectedSprint(null)

      toast({
        title: "Tarea agregada",
        description: `La tarea "${newTask.name}" ha sido agregada al sprint.`,
      })
    }
  }

  // Abrir modal para agregar tarea
  const openAddTaskDialog = (sprint: Sprint) => {
    setSelectedSprint(sprint)
    setIsAddTaskDialogOpen(true)
  }

  // Manejar agregar sprint
  const handleAddSprint = () => {
    if (newSprint.name && newSprint.startDate && newSprint.endDate) {
      const newId = Math.max(...project.sprints.map((s) => s.id)) + 1

      const sprint: Sprint = {
        id: newId,
        name: newSprint.name,
        startDate: newSprint.startDate,
        endDate: newSprint.endDate,
        progress: 0,
        tasks: [],
      }

      setProject({
        ...project,
        sprints: [...project.sprints, sprint],
      })

      setNewSprint({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
      })
      setIsAddSprintDialogOpen(false)

      toast({
        title: "Sprint creado",
        description: `El sprint "${newSprint.name}" ha sido creado exitosamente.`,
      })
    }
  }

  // Manejar agregar modelo
  const handleAddModel = () => {
    if (newModel.name && newModel.type) {
      const newId = Math.max(...project.models.map((m) => m.id)) + 1
      const currentDate = new Date().toLocaleDateString("es-ES")

      const model: Model = {
        id: newId,
        name: newModel.name,
        type: newModel.type,
        status: newModel.status,
        updatedAt: currentDate,
        imageUrl: "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(newModel.name),
      }

      setProject({
        ...project,
        models: [...project.models, model],
      })

      setNewModel({
        name: "",
        type: "",
        status: "Pendiente",
        file: null,
      })
      setIsAddModelDialogOpen(false)

      toast({
        title: "Modelo agregado",
        description: `El modelo "${newModel.name}" ha sido agregado exitosamente.`,
      })
    }
  }

  // Manejar editar modelo
  const handleEditModel = () => {
    if (selectedModel && newModel.name && newModel.type) {
      const currentDate = new Date().toLocaleDateString("es-ES")

      const updatedModels = project.models.map((model) => {
        if (model.id === selectedModel.id) {
          return {
            ...model,
            name: newModel.name,
            type: newModel.type,
            status: newModel.status,
            updatedAt: currentDate,
          }
        }
        return model
      })

      setProject({
        ...project,
        models: updatedModels,
      })

      setNewModel({
        name: "",
        type: "",
        status: "Pendiente",
        file: null,
      })
      setIsEditModelDialogOpen(false)
      setSelectedModel(null)

      toast({
        title: "Modelo actualizado",
        description: `El modelo "${newModel.name}" ha sido actualizado exitosamente.`,
      })
    }
  }

  // Abrir modal para editar modelo
  const openEditModelDialog = (model: Model) => {
    setSelectedModel(model)
    setNewModel({
      name: model.name,
      type: model.type,
      status: model.status,
      file: null,
    })
    setIsEditModelDialogOpen(true)
  }

  // Abrir modal para ver modelo
  const openViewModelDialog = (model: Model) => {
    setSelectedModel(model)
    setIsViewModelDialogOpen(true)
  }

  // Manejar agregar reunión
  const handleAddMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      const newId = project.meetings.length > 0 ? Math.max(...project.meetings.map((m) => m.id)) + 1 : 1

      const meeting: Meeting = {
        id: newId,
        title: newMeeting.title,
        date: newMeeting.date,
        time: newMeeting.time,
        status: newMeeting.status,
        description: newMeeting.description,
        tags: newMeeting.tags,
        comments: 0,
      }

      setProject({
        ...project,
        meetings: [...project.meetings, meeting],
      })

      setNewMeeting({
        title: "",
        date: "",
        time: "",
        description: "",
        tags: [],
        status: "Programada",
      })
      setIsAddMeetingDialogOpen(false)

      toast({
        title: "Reunión programada",
        description: `La reunión "${newMeeting.title}" ha sido programada exitosamente.`,
      })
    }
  }

  // Manejar agregar etiqueta a reunión
  const handleAddTag = () => {
    if (newTag && !newMeeting.tags.includes(newTag)) {
      setNewMeeting({
        ...newMeeting,
        tags: [...newMeeting.tags, newTag],
      })
      setNewTag("")
    }
  }

  // Manejar eliminar etiqueta de reunión
  const handleRemoveTag = (tag: string) => {
    setNewMeeting({
      ...newMeeting,
      tags: newMeeting.tags.filter((t) => t !== tag),
    })
  }

  // Manejar agregar informe
  const handleAddReport = () => {
    if (newReport.title && newReport.type) {
      const newId = project.reports.length > 0 ? Math.max(...project.reports.map((r) => r.id)) + 1 : 1
      const currentDate = new Date().toLocaleDateString("es-ES")

      const report: Report = {
        id: newId,
        title: newReport.title,
        type: newReport.type,
        date: currentDate,
        imageUrl: `/placeholder.svg?height=200&width=300&text=Gráfico+de+${newReport.type}`,
      }

      setProject({
        ...project,
        reports: [...project.reports, report],
      })

      setNewReport({
        title: "",
        type: "" as "Progreso" | "Tareas" | "Plazos" | "Rendimiento" | "Resumen",
        description: "",
      })
      setIsAddReportDialogOpen(false)

      toast({
        title: "Informe generado",
        description: `El informe "${newReport.title}" ha sido generado exitosamente.`,
      })
    }
  }

  // Obtener imagen para tipo de informe
  const getReportTypeImage = (type: string) => {
    switch (type) {
      case "Progreso":
        return "/placeholder.svg?height=200&width=300&text=Gráfico+de+Progreso"
      case "Tareas":
        return "/placeholder.svg?height=200&width=300&text=Distribución+de+Tareas"
      case "Plazos":
        return "/placeholder.svg?height=200&width=300&text=Cumplimiento+de+Plazos"
      case "Rendimiento":
        return "/placeholder.svg?height=200&width=300&text=Gráfico+de+Rendimiento"
      case "Resumen":
        return "/placeholder.svg?height=200&width=300&text=Resumen+del+Proyecto"
      default:
        return "/placeholder.svg?height=200&width=300"
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <Toaster />
      <div className="flex items-center gap-4 mb-6">
        <Link href="/proyectos">
          <Button
            variant="outline"
            size="icon"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            <ArrowLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={getStatusBadgeClass(project.status)}>
              {project.status}
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">Progreso: {project.progress}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Descripción del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Fecha inicio: {project.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Fecha fin: {project.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Duración: 6 meses</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Equipo: {project.team.length} miembros</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso del proyecto</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Equipo del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.team.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
              ))}
              <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir miembro
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Agregar nuevo miembro</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      Complete la información del nuevo miembro del equipo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="member-name" className="text-right text-gray-700 dark:text-gray-300">
                        Nombre
                      </Label>
                      <Input
                        id="member-name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="member-role" className="text-right text-gray-700 dark:text-gray-300">
                        Rol
                      </Label>
                      <Select
                        value={newMember.role}
                        onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                      >
                        <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700">
                          <SelectItem value="Desarrollador Frontend">Desarrollador Frontend</SelectItem>
                          <SelectItem value="Desarrollador Backend">Desarrollador Backend</SelectItem>
                          <SelectItem value="Diseñador UX/UI">Diseñador UX/UI</SelectItem>
                          <SelectItem value="QA Tester">QA Tester</SelectItem>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Analista">Analista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="member-email" className="text-right text-gray-700 dark:text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="member-email"
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddMemberDialogOpen(false)}
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Agregar Miembro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sprints" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger
            value="sprints"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            Sprints
          </TabsTrigger>
          <TabsTrigger
            value="models"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <FileText className="h-4 w-4 mr-2" />
            Modelos
          </TabsTrigger>
          <TabsTrigger
            value="meetings"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Users className="h-4 w-4 mr-2" />
            Reuniones
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Informes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sprints">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Sprints</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Gestión de sprints y tareas del proyecto
                </CardDescription>
              </div>
              <Dialog open={isAddSprintDialogOpen} onOpenChange={setIsAddSprintDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Sprint
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Crear nuevo sprint</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      Complete la información del nuevo sprint para el proyecto.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sprint-name" className="text-right text-gray-700 dark:text-gray-300">
                        Nombre
                      </Label>
                      <Input
                        id="sprint-name"
                        value={newSprint.name}
                        onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ej: Sprint 5 - Módulo de reportes"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sprint-description" className="text-right text-gray-700 dark:text-gray-300">
                        Descripción
                      </Label>
                      <Textarea
                        id="sprint-description"
                        value={newSprint.description}
                        onChange={(e) => setNewSprint({ ...newSprint, description: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="Descripción del sprint..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sprint-startDate" className="text-right text-gray-700 dark:text-gray-300">
                        Fecha inicio
                      </Label>
                      <Input
                        id="sprint-startDate"
                        type="date"
                        value={newSprint.startDate}
                        onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sprint-endDate" className="text-right text-gray-700 dark:text-gray-300">
                        Fecha fin
                      </Label>
                      <Input
                        id="sprint-endDate"
                        type="date"
                        value={newSprint.endDate}
                        onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddSprintDialogOpen(false)}
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddSprint} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Crear Sprint
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.sprints.map((sprint) => (
                  <div
                    key={sprint.id}
                    className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{sprint.name}</h3>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeClass(
                          sprint.progress === 100 ? "Completada" : sprint.progress > 0 ? "En progreso" : "Pendiente",
                        )}
                      >
                        {sprint.progress === 100 ? "Completado" : sprint.progress > 0 ? "En progreso" : "Pendiente"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Inicio: {sprint.startDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Fin: {sprint.endDate}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{sprint.progress}%</span>
                      </div>
                      <Progress value={sprint.progress} className="h-2" />
                    </div>
                    <Separator className="my-3 bg-gray-200 dark:bg-gray-600" />
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Tareas</h4>
                    <div className="space-y-2">
                      {sprint.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex justify-between items-center p-2 bg-white dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500"
                        >
                          <div className="flex items-center gap-2">
                            <CheckSquare
                              className={`h-4 w-4 ${task.status === "Completada" ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`}
                            />
                            <span className="text-gray-900 dark:text-white">{task.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                {task.assignedTo}
                              </AvatarFallback>
                            </Avatar>
                            <Badge variant="outline" className={getStatusBadgeClass(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        className="w-full text-sm bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
                        size="sm"
                        onClick={() => openAddTaskDialog(sprint)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Añadir tarea
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Modelos</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Diagramas y documentación del proyecto
                </CardDescription>
              </div>
              <Dialog open={isAddModelDialogOpen} onOpenChange={setIsAddModelDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Modelo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Agregar nuevo modelo</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      Complete la información del nuevo modelo o diagrama.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="model-name" className="text-right text-gray-700 dark:text-gray-300">
                        Nombre
                      </Label>
                      <Input
                        id="model-name"
                        value={newModel.name}
                        onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ej: Diagrama de Clases"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="model-type" className="text-right text-gray-700 dark:text-gray-300">
                        Tipo
                      </Label>
                      <Select
                        value={newModel.type}
                        onValueChange={(value) => setNewModel({ ...newModel, type: value })}
                      >
                        <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700">
                          <SelectItem value="Diagrama">Diagrama</SelectItem>
                          <SelectItem value="Documento">Documento</SelectItem>
                          <SelectItem value="Prototipo">Prototipo</SelectItem>
                          <SelectItem value="Wireframe">Wireframe</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="model-status" className="text-right text-gray-700 dark:text-gray-300">
                        Estado
                      </Label>
                      <Select
                        value={newModel.status}
                        onValueChange={(value) =>
                          setNewModel({ ...newModel, status: value as "Activo" | "Pendiente" | "Archivado" })
                        }
                      >
                        <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700">
                          <SelectItem value="Activo">Activo</SelectItem>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="Archivado">Archivado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="model-file" className="text-right text-gray-700 dark:text-gray-300">
                        Archivo
                      </Label>
                      <Input
                        id="model-file"
                        type="file"
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setNewModel({ ...newModel, file: e.target.files[0] })
                          }
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddModelDialogOpen(false)}
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddModel} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Agregar Modelo
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.models.map((model) => (
                  <Card key={model.id} className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-gray-900 dark:text-white">{model.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-white dark:bg-gray-600 rounded flex items-center justify-center mb-2 border border-gray-200 dark:border-gray-500 overflow-hidden">
                        {model.imageUrl ? (
                          <Image
                            src={model.imageUrl || "/placeholder.svg"}
                            alt={model.name}
                            width={300}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline" className={getStatusBadgeClass(model.status)}>
                          {model.status}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Actualizado: {model.updatedAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                            onClick={() => openViewModelDialog(model)}
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Ver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                            onClick={() => openEditModelDialog(model)}
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Editar
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Descargar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Reuniones</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Gestión de reuniones técnicas del proyecto
                </CardDescription>
              </div>
              <Dialog open={isAddMeetingDialogOpen} onOpenChange={setIsAddMeetingDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Reunión
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Programar nueva reunión</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      Complete la información para programar una nueva reunión.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="meeting-title" className="text-right text-gray-700 dark:text-gray-300">
                        Título
                      </Label>
                      <Input
                        id="meeting-title"
                        value={newMeeting.title}
                        onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ej: Revisión de Sprint 3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="meeting-date" className="text-right text-gray-700 dark:text-gray-300">
                        Fecha
                      </Label>
                      <Input
                        id="meeting-date"
                        type="date"
                        value={newMeeting.date}
                        onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="meeting-time" className="text-right text-gray-700 dark:text-gray-300">
                        Hora
                      </Label>
                      <Input
                        id="meeting-time"
                        type="time"
                        value={newMeeting.time}
                        onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="meeting-status" className="text-right text-gray-700 dark:text-gray-300">
                        Estado
                      </Label>
                      <Select
                        value={newMeeting.status}
                        onValueChange={(value) =>
                          setNewMeeting({ ...newMeeting, status: value as "Programada" | "Completada" | "Cancelada" })
                        }
                      >
                        <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700">
                          <SelectItem value="Programada">Programada</SelectItem>
                          <SelectItem value="Completada">Completada</SelectItem>
                          <SelectItem value="Cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="meeting-description" className="text-right text-gray-700 dark:text-gray-300 pt-2">
                        Descripción
                      </Label>
                      <Textarea
                        id="meeting-description"
                        value={newMeeting.description}
                        onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="Descripción de la reunión..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="meeting-tags" className="text-right text-gray-700 dark:text-gray-300">
                        Etiquetas
                      </Label>
                      <div className="col-span-3 flex flex-wrap gap-2">
                        {newMeeting.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gray-100 dark:bg-gray-600 flex items-center gap-1"
                          >
                            {tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right"></div>
                      <div className="col-span-3 flex gap-2">
                        <Input
                          id="new-tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Nueva etiqueta"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddTag}
                          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          Añadir
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddMeetingDialogOpen(false)}
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddMeeting} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Programar Reunión
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.meetings.map((meeting) => (
                  <Card key={meeting.id} className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{meeting.title}</CardTitle>
                        <Badge variant="outline" className={getStatusBadgeClass(meeting.status)}>
                          {meeting.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {meeting.date} - {meeting.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{meeting.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {meeting.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MessageSquare className="h-4 w-4" />
                        <span>{meeting.comments} comentarios</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Informes</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Informes y análisis del proyecto
                </CardDescription>
              </div>
              <Dialog open={isAddReportDialogOpen} onOpenChange={setIsAddReportDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Generar Informe
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Generar nuevo informe</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      Seleccione el tipo de informe que desea generar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="report-title" className="text-right text-gray-700 dark:text-gray-300">
                        Título
                      </Label>
                      <Input
                        id="report-title"
                        value={newReport.title}
                        onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ej: Informe de Progreso - Abril 2024"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="report-type" className="text-right text-gray-700 dark:text-gray-300">
                        Tipo
                      </Label>
                      <Select
                        value={newReport.type}
                        onValueChange={(value) =>
                          setNewReport({
                            ...newReport,
                            type: value as "Progreso" | "Tareas" | "Plazos" | "Rendimiento" | "Resumen",
                          })
                        }
                      >
                        <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700">
                          <SelectItem value="Progreso">Progreso del Proyecto</SelectItem>
                          <SelectItem value="Tareas">Distribución de Tareas</SelectItem>
                          <SelectItem value="Plazos">Cumplimiento de Plazos</SelectItem>
                          <SelectItem value="Rendimiento">Rendimiento del Equipo</SelectItem>
                          <SelectItem value="Resumen">Resumen Ejecutivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="report-description" className="text-right text-gray-700 dark:text-gray-300 pt-2">
                        Descripción
                      </Label>
                      <Textarea
                        id="report-description"
                        value={newReport.description}
                        onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                        className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="Descripción del informe..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddReportDialogOpen(false)}
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddReport} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Generar Informe
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.reports.map((report) => (
                  <Card key={report.id} className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-gray-900 dark:text-white">{report.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {report.type} - {report.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-white dark:bg-gray-600 rounded flex items-center justify-center mb-3 border border-gray-200 dark:border-gray-500 overflow-hidden">
                        <Image
                          src={getReportTypeImage(report.type) || "/placeholder.svg"}
                          alt={report.title}
                          width={300}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Ver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Descargar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para agregar tarea */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Agregar nueva tarea</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Complete la información de la nueva tarea para el sprint "{selectedSprint?.name}".
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
                placeholder="Ej: Implementar autenticación de usuarios"
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
                placeholder="Descripción detallada de la tarea..."
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
                  {project.team.map((member) => (
                    <SelectItem key={member.id} value={member.initials}>
                      {member.name} ({member.initials})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-dueDate" className="text-right text-gray-700 dark:text-gray-300">
                Fecha límite
              </Label>
              <Input
                id="task-dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
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
              onClick={() => setIsAddTaskDialogOpen(false)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Cancelar
            </Button>
            <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700 text-white">
              Agregar Tarea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para editar modelo */}
      <Dialog open={isEditModelDialogOpen} onOpenChange={setIsEditModelDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Editar modelo</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Modifique la información del modelo "{selectedModel?.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-model-name" className="text-right text-gray-700 dark:text-gray-300">
                Nombre
              </Label>
              <Input
                id="edit-model-name"
                value={newModel.name}
                onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-model-type" className="text-right text-gray-700 dark:text-gray-300">
                Tipo
              </Label>
              <Select value={newModel.type} onValueChange={(value) => setNewModel({ ...newModel, type: value })}>
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="Diagrama">Diagrama</SelectItem>
                  <SelectItem value="Documento">Documento</SelectItem>
                  <SelectItem value="Prototipo">Prototipo</SelectItem>
                  <SelectItem value="Wireframe">Wireframe</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-model-status" className="text-right text-gray-700 dark:text-gray-300">
                Estado
              </Label>
              <Select
                value={newModel.status}
                onValueChange={(value) =>
                  setNewModel({ ...newModel, status: value as "Activo" | "Pendiente" | "Archivado" })
                }
              >
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Archivado">Archivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditModelDialogOpen(false)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Cancelar
            </Button>
            <Button onClick={handleEditModel} className="bg-blue-600 hover:bg-blue-700 text-white">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para ver modelo */}
      <Dialog open={isViewModelDialogOpen} onOpenChange={setIsViewModelDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">{selectedModel?.name}</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Visualización del modelo - {selectedModel?.type}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="aspect-video bg-white dark:bg-gray-600 rounded flex items-center justify-center border border-gray-200 dark:border-gray-500 overflow-hidden">
              {selectedModel?.imageUrl ? (
                <Image
                  src={selectedModel.imageUrl || "/placeholder.svg"}
                  alt={selectedModel.name}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full"
                />
              ) : (
                <FileText className="h-24 w-24 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Tipo:</Label>
                <p className="text-gray-900 dark:text-white">{selectedModel?.type}</p>
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Estado:</Label>
                <Badge variant="outline" className={getStatusBadgeClass(selectedModel?.status || "")}>
                  {selectedModel?.status}
                </Badge>
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Última actualización:</Label>
                <p className="text-gray-900 dark:text-white">{selectedModel?.updatedAt}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewModelDialogOpen(false)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Cerrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
