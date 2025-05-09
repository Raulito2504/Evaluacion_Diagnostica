import type React from "react"

import { useState } from "react"

interface EdadCalculada {
    años: number
    meses: number
    semanas: number
    dias: number
    horas: number
}

function CalcularEdad() {
    const [fechaNacimiento, setFechaNacimiento] = useState<string>("")
    const [horaNacimiento, setHoraNacimiento] = useState<string>("")
    const [edad, setEdad] = useState<EdadCalculada | null>(null)

    function calcularEdadExacta(fechaNac: string, horaNac: string): EdadCalculada | null {
        const fechaHoraNacimiento = new Date(`${fechaNac}T${horaNac}:00`)
        const ahora = new Date()

        if (isNaN(fechaHoraNacimiento.getTime()) || fechaHoraNacimiento > ahora) return null

        // calcular diferencia en milisegundos
        const diferencia = ahora.getTime() - fechaHoraNacimiento.getTime()

        // calcular años y meses
        let años = ahora.getFullYear() - fechaHoraNacimiento.getFullYear()
        let meses = ahora.getMonth() - fechaHoraNacimiento.getMonth()

        // ajustar años y meses
        if (meses < 0 || (meses === 0 && ahora.getDate() < fechaHoraNacimiento.getDate())) {
            años--
            meses += 12
        }

        return {
            años,
            meses,
            semanas: Math.floor(diferencia / (1000 * 60 * 60 * 24 * 7)),
            dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
            horas: Math.floor(diferencia / (1000 * 60 * 60)),
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setEdad(calcularEdadExacta(fechaNacimiento, horaNacimiento))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Calculadora de Edad</h1>
            <div className="bg-dark-gray p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="fechaNacimiento" className="block text-light-tan mb-2">
                            Fecha de nacimiento:
                        </label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-medium-gray text-cream border border-medium-tan"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="horaNacimiento" className="block text-light-tan mb-2">
                            Hora de nacimiento:
                        </label>
                        <input
                            type="time"
                            id="horaNacimiento"
                            value={horaNacimiento}
                            onChange={(e) => setHoraNacimiento(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-medium-gray text-cream border border-medium-tan"
                            required
                        />
                    </div>

                    <button type="submit" className="px-4 py-2 bg-medium-tan text-charcoal rounded hover:bg-light-tan">
                        Calcular Edad
                    </button>
                </form>

                {edad && (
                    <div className="mt-4 p-4 bg-medium-gray rounded">
                        <h2 className="text-xl font-bold text-light-tan mb-2">Tu edad exacta es:</h2>
                        <ul className="text-cream space-y-1">
                            <li>
                                {edad.años} años y {edad.meses} meses
                            </li>
                            <li>{edad.semanas} semanas</li>
                            <li>{edad.dias} días</li>
                            <li>{edad.horas} horas</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalcularEdad
