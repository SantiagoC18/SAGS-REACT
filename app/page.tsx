import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, MessageSquare, FileText, BarChart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/images/logo.jpg" alt="SAGS Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SAGS</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
            >
              Inicio
            </Link>
            <Link
              href="/sobre-nosotros"
              className="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/proyectos"
              className="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Gestión de Proyectos
            </Link>
            <Link
              href="/pqrs"
              className="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              PQRS
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/registro">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Sistema Avanzado de Gestión de Software
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Optimice la planificación, documentación y gestión de sus proyectos de software con nuestra plataforma
              colaborativa avanzada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/registro">
                <Button size="lg" className="w-full sm:w-auto">
                  Comenzar ahora
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver demostración
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative p-8 bg-black/30 rounded-2xl shadow-lg dark:shadow-gray-800/50">
              <Image
                src="/images/logo.png"
                alt="SAGS - Sistema Avanzado de Gestión de Software"
                width={450}
                height={450}
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Características principales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="dark:text-white">Gestión de Proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Cree, actualice, consulte y asigne proyectos de manera eficiente con nuestro sistema intuitivo.
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="dark:text-white">Sprints y Tareas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Organice su trabajo en sprints y tareas, asignando responsabilidades y estableciendo prioridades.
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="dark:text-white">Modelos y Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Asigne y actualice modelos (diagramas) y utilice checklists para garantizar la calidad.
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="dark:text-white">Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Administre usuarios con diferentes roles y permisos para un control preciso del acceso.
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="dark:text-white">PQRS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Sistema integrado para peticiones, quejas, reclamos y sugerencias que mejora la comunicación.
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="dark:text-white">Planes y Reuniones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Asigne planes de desarrollo y gestione reuniones técnicas para mantener el proyecto en marcha.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            ¿Listo para optimizar su gestión de proyectos?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Únase a cientos de equipos que ya están mejorando su productividad con SAGS.
          </p>
          <Link href="/registro">
            <Button size="lg">Registrarse gratis</Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/images/logo.jpg" alt="SAGS Logo" width={32} height={32} className="rounded-full" />
                <h3 className="text-xl font-bold">SAGS</h3>
              </div>
              <p className="text-gray-400 dark:text-gray-500">
                Sistema Avanzado de Gestión de Software para optimizar sus proyectos.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/caracteristicas" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="/precios" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Demostración
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/sobre-nosotros" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacidad" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="text-gray-400 dark:text-gray-500 hover:text-white">
                    Términos de Servicio
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>© {new Date().getFullYear()} SAGS. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
