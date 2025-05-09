import { useState } from "react"

// definir la interfaz para las opciones de contraseña
interface OpcionesContraseña {
    mayusculas: boolean
    numeros: boolean
    especiales: boolean
    [key: string]: boolean // permite acceso indexado
}

function GenerarContraseña() {
    const [longitud, setLongitud] = useState<number>(8)
    const [opciones, setOpciones] = useState<OpcionesContraseña>({
        mayusculas: true,
        numeros: true,
        especiales: true,
    })
    const [contraseña, setContraseña] = useState<string>("")
    const [mensaje, setMensaje] = useState<string>("")

    function generarContraseña(): void {
        // validaciones basicas
        if (longitud < 8) {
            setMensaje("La longitud mínima debe ser 8 caracteres")
            return
        }

        if (!opciones.mayusculas && !opciones.numeros && !opciones.especiales) {
            setMensaje("Debes seleccionar al menos un tipo de carácter adicional")
            return
        }

        // conjuntos de caracteres
        const chars = {
            minusculas: "abcdefghijklmnopqrstuvwxyz",
            mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numeros: "0123456789",
            especiales: "!@#$%^&*()_-+=<>?",
        }

        // crear contraseña con al menos un caracter de cada tipo requerido
        let pwd = ""
        if (opciones.mayusculas) pwd += chars.mayusculas[Math.floor(Math.random() * chars.mayusculas.length)]
        if (opciones.numeros) pwd += chars.numeros[Math.floor(Math.random() * chars.numeros.length)]
        if (opciones.especiales) pwd += chars.especiales[Math.floor(Math.random() * chars.especiales.length)]

        // conjunto de caracteres disponibles
        let disponibles = chars.minusculas
        if (opciones.mayusculas) disponibles += chars.mayusculas
        if (opciones.numeros) disponibles += chars.numeros
        if (opciones.especiales) disponibles += chars.especiales

        // completar la contraseña
        while (pwd.length < longitud) {
            pwd += disponibles[Math.floor(Math.random() * disponibles.length)]
        }

        // mezclar la contraseña
        pwd = pwd
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("")

        setContraseña(pwd)
        setMensaje("")
    }

    // manejo de cambio en las opciones
    const handleOpcionChange = (key: keyof OpcionesContraseña, checked: boolean): void => {
        setOpciones({ ...opciones, [key]: checked })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Generador de Contraseñas</h1>
            <div className="bg-dark-gray p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="longitud" className="block text-light-tan mb-2">
                        Longitud de la contraseña: {longitud}
                    </label>
                    <input
                        type="range"
                        id="longitud"
                        min="8"
                        max="20"
                        value={longitud}
                        onChange={(e) => setLongitud(Number.parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="mb-4 space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="mayusculas"
                            checked={opciones.mayusculas}
                            onChange={(e) => handleOpcionChange("mayusculas", e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="mayusculas" className="text-cream">
                            Incluir mayúsculas (A-Z)
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="numeros"
                            checked={opciones.numeros}
                            onChange={(e) => handleOpcionChange("numeros", e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="numeros" className="text-cream">
                            Incluir números (0-9)
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="especiales"
                            checked={opciones.especiales}
                            onChange={(e) => handleOpcionChange("especiales", e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="especiales" className="text-cream">
                            Incluir caracteres especiales (!@#$%^&*)
                        </label>
                    </div>
                </div>

                <button
                    onClick={generarContraseña}
                    className="px-4 py-2 bg-medium-tan text-charcoal rounded hover:bg-light-tan"
                >
                    Generar Contraseña
                </button>

                {mensaje && (
                    <div className="mt-4 p-3 bg-red-800 rounded">
                        <p className="text-cream">{mensaje}</p>
                    </div>
                )}

                {contraseña && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold text-light-tan mb-2">Tu contraseña:</h2>
                        <div className="p-3 bg-medium-gray rounded flex justify-between items-center">
                            <code className="text-cream font-mono">{contraseña}</code>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(contraseña)
                                    setMensaje("Contraseña copiada al portapapeles")
                                    setTimeout(() => setMensaje(""), 2000)
                                }}
                                className="ml-2 px-3 py-1 bg-medium-tan text-charcoal rounded text-sm"
                            >
                                Copiar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GenerarContraseña
