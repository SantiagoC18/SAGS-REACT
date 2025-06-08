"use client"

import { Box, Code, Clock, Shield, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SobreNosotrosPage() {
  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Sobre Nosotros</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Conozca más sobre el Sistema Avanzado de Gestión de Software (SAGS)
        </p>

        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Nuestra Misión</h2>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <p className="text-gray-700 dark:text-gray-300">
                  En SAGS, nuestra misión es facilitar la planificación, documentación y gestión de proyectos de
                  software, brindando herramientas colaborativas que optimizan el trabajo en equipo y mejoran la calidad
                  del producto final.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Nuestra Visión</h2>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Ser la plataforma líder en gestión de proyectos de software, reconocida por su facilidad de uso,
                  robustez y capacidad para adaptarse a las necesidades específicas de cada equipo de desarrollo.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">Colaboración</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Fomentamos el trabajo en equipo y la comunicación efectiva entre todos los miembros del proyecto.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
                    <Code className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">Calidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Nos comprometemos con la excelencia técnica y la mejora continua de nuestros procesos y
                    herramientas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2">
                    <Box className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">Innovación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Buscamos constantemente nuevas formas de mejorar la gestión de proyectos y adaptarnos a las
                    tendencias emergentes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">Eficiencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Optimizamos los procesos para maximizar la productividad y minimizar el tiempo dedicado a tareas
                    administrativas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-red-600 dark:text-red-300" />
                  </div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">Seguridad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Protegemos la información de nuestros usuarios con los más altos estándares de seguridad y
                    privacidad.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Requisitos del Sistema</h2>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Requisitos de Hardware</h3>
                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                      <li>Procesador: Intel Core i5 o equivalente</li>
                      <li>Memoria RAM: 8GB mínimo</li>
                      <li>Espacio en disco: 500MB para la aplicación</li>
                      <li>Conexión a Internet: 10 Mbps o superior</li>
                    </ul>
                  </div>

                  <Separator className="my-2 bg-gray-200 dark:bg-gray-700" />

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Requisitos de Software</h3>
                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                      <li>Sistema Operativo: Windows 10/11, macOS 11+, Linux (distribuciones modernas)</li>
                      <li>Navegador: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+</li>
                      <li>Resolución de pantalla: 1366x768 o superior</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
