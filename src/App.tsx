import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import Ahorcado from "./components/Ahorcado"
import CalcularEdad from "./components/CalcularEdad"
import Fibonacci from "./components/Fibonacci"
import CrudUsuario from "./components/CrudUsuario"
import GenerarContraseña from "./components/GenerarContraseñas"
import ValidarPalindromo from "./components/ValidarPalindromo"

function App() {
  const [currentComponent, setCurrentComponent] = useState<string | null>(null)

  const handleBackToMenu = () => {
    setCurrentComponent(null)
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case "ahorcado":
        return <Ahorcado />
      case "calcularEdad":
        return <CalcularEdad />
      case "fibonacci":
        return <Fibonacci />
      case "crudUsuario":
        return <CrudUsuario />
      case "generarContraseña":
        return <GenerarContraseña />
      case "validarPalindromo":
        return <ValidarPalindromo />
      default:
        return <Menu onSelectComponent={setCurrentComponent} />
    }
  }

  return (
    <div className="min-h-screen bg-charcoal text-cream flex flex-col">
      <Header currentComponent={currentComponent} onBackToMenu={handleBackToMenu} />

      <main className="container mx-auto p-4 flex-grow">{renderComponent()}</main>

      <Footer />
    </div>
  )
}

export default App
