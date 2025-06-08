"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Shield, FileText } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function PerfilPage() {
  const [userData, setUserData] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 123 #45-67, Bogotá, Colombia",
    rol: "Desarrollador",
    fechaRegistro: "15/01/2023",
    ultimoAcceso: "15/05/2024",
  })

  const [formData, setFormData] = useState({
    nombre: userData.nombre,
    email: userData.email,
    telefono: userData.telefono,
    direccion: userData.direccion,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    taskAssignments: true,
    systemAnnouncements: false,
    weeklyReports: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el perfil
    setUserData({
      ...userData,
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
    })
    alert("Perfil actualizado correctamente")
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para cambiar la contraseña
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    alert("Contraseña actualizada correctamente")
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.nombre} />
                  <AvatarFallback className="text-2xl">JP</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <h2 className="text-2xl font-bold">{userData.nombre}</h2>
              <p className="text-gray-500">{userData.email}</p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {userData.rol}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t pt-4">
              <div className="w-full space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{userData.telefono}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{userData.direccion}</span>
                </div>
                <Separator />
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">Rol: {userData.rol}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">Registro: {userData.fechaRegistro}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">Último acceso: {userData.ultimoAcceso}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Perfil</CardTitle>
                  <CardDescription>
                    Actualice su información personal. Esta información será visible para otros usuarios.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Guardar cambios</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>Actualice su contraseña para mantener su cuenta segura.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Cambiar contraseña</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>Configure cómo y cuándo desea recibir notificaciones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Notificaciones por correo</Label>
                      <p className="text-sm text-gray-500">Recibir notificaciones por correo electrónico</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="projectUpdates">Actualizaciones de proyectos</Label>
                      <p className="text-sm text-gray-500">Recibir notificaciones sobre cambios en proyectos</p>
                    </div>
                    <Switch
                      id="projectUpdates"
                      checked={notificationSettings.projectUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("projectUpdates", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="taskAssignments">Asignación de tareas</Label>
                      <p className="text-sm text-gray-500">Recibir notificaciones cuando se le asigne una tarea</p>
                    </div>
                    <Switch
                      id="taskAssignments"
                      checked={notificationSettings.taskAssignments}
                      onCheckedChange={(checked) => handleNotificationChange("taskAssignments", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="systemAnnouncements">Anuncios del sistema</Label>
                      <p className="text-sm text-gray-500">Recibir anuncios y actualizaciones del sistema</p>
                    </div>
                    <Switch
                      id="systemAnnouncements"
                      checked={notificationSettings.systemAnnouncements}
                      onCheckedChange={(checked) => handleNotificationChange("systemAnnouncements", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weeklyReports">Informes semanales</Label>
                      <p className="text-sm text-gray-500">Recibir resúmenes semanales de actividad</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Guardar preferencias</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
