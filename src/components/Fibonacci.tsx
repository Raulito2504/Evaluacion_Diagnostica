import type React from "react"
import { useState, useEffect } from "react"

function Fibonacci() {
    const [cantidad, setCantidad] = useState<number>(7)
    const [secuencia, setSecuencia] = useState<number[]>([])
    const [error, setError] = useState<string>("")

    // genera la secuencia de Fibonacci segun cambia la cantidad
    useEffect(() => {
        generarSecuenciaFibonacci(cantidad)
    }, [cantidad])

    const generarSecuenciaFibonacci = (n: number): void => {
        if (n <= 0) {
            setError("Por favor ingresa un número positivo")
            setSecuencia([])
            return
        }

        if (n > 50) {
            setError("Por favor ingresa un número menor o igual a 50 para evitar problemas de rendimiento")
            return
        }

        setError("")
         // funcion para calcular la secuencia de Fibonacci
        const fib: number[] = []
        for (let i = 0; i < n; i++) {
            if (i <= 1) {
                fib.push(i)
            } else {
                fib.push(fib[i - 1] + fib[i - 2])
            }
        }

        setSecuencia(fib)
    }

    // maneja el cambio en el input del usuario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const valor = e.target.value
        if (valor === "" || isNaN(Number(valor))) {
            // si el valor es inválido, establece NaN
            setCantidad(NaN)
        } else {
            setCantidad(Number.parseInt(valor))
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Secuencia Fibonacci</h1>
            <div className="bg-dark-gray p-6 rounded-lg shadow-lg">
                <p className="text-cream mb-4">
                    Realiza un algoritmo que dibuje la sucesión de Fibonacci hasta la posición que el usuario ingrese.
                </p>
                {/* entrada para la cantidad de numeros */}
                <div className="mb-6">
                    <label htmlFor="cantidad" className="block text-light-tan mb-2">
                        Ingresa la cantidad de números que deseas ver en la secuencia:
                    </label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            id="cantidad"
                            value={cantidad}
                            onChange={handleInputChange}
                            min="1"
                            max="50"
                            className="w-24 px-4 py-2 rounded bg-medium-gray text-cream border border-medium-tan"
                        />
                        <span className="ml-2 text-cream">n = {cantidad}</span>
                    </div>
                </div>

                {error ? (
                    <div className="p-3 bg-red-800 rounded">
                        <p className="text-cream">{error}</p>
                    </div>
                ) : (
                    // se muestra la secuencia de Fibonacci generada
                    <div>
                        <h2 className="text-xl font-bold text-light-tan mb-2">Secuencia de Fibonacci (n = {cantidad}):</h2>
                        <div className="p-4 bg-medium-gray rounded overflow-x-auto">
                            <div className="flex flex-wrap gap-4">
                                {secuencia.map((numero, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        {/* se muestra cada numero de la secuencia */}
                                        <div className="bg-dark-gray px-3 py-2 rounded text-center min-w-[40px]">
                                            <span className="text-cream font-mono">{numero}</span>
                                        </div>
                                        <span className="text-xs text-cream mt-1">F{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Fibonacci