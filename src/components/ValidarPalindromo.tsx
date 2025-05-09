
import { useState } from "react"
function ValidarPalindromo() {
    const [palabra, setPalabra] = useState<string>("")
    const [resultado, setResultado] = useState<string | null>(null)
    const [esValido, setEsValido] = useState<boolean | null>(null)
    
    /**
     * @param texto - texto a validar
     * @returns devuelve true si es palíndromo, false si no lo es
     */
    const esPalindromo = (texto: string): boolean => {

        const textoNormalizado = texto.toLowerCase().replace(/[^a-z0-9]/g, "")

        if (textoNormalizado.length === 0) return false
        // para comparar el texto con su versión invertida
        const textoInvertido = textoNormalizado.split("").reverse().join("")

        return textoNormalizado === textoInvertido
    }

    const validarPalabra = () => {
        if (!palabra.trim()) {
            setResultado("Por favor, ingresa una palabra o frase")
            setEsValido(null)
            return
        }

        const resultado = esPalindromo(palabra)
        setEsValido(resultado)
        setResultado(resultado ? `"${palabra}" es un palíndromo` : `"${palabra}" no es un palíndromo`)
    }
    // función para limpiar el formulario y reiniciar los estados
    const limpiarFormulario = () => {
        setPalabra("")
        setResultado(null)
        setEsValido(null)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Validador de Palíndromos</h1>
            <div className="bg-dark-gray p-6 rounded-lg shadow-lg">
                <p className="text-cream mb-4">
                algoritmo para validar si una palabra es un palíndromo, el usuario debe ingresar una palabra y se le retorna un mensaje de valido o invalido.
                    <br />
                    Ejemplos: reconocer, sometemos, amar a roma.
                </p>

                <div className="mb-4">
                    <label htmlFor="palabra" className="block text-light-tan mb-2">
                        Ingresa una palabra o frase:
                    </label>
                    <input
                        type="text"
                        id="palabra"
                        value={palabra}
                        onChange={(e) => setPalabra(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-medium-gray text-cream border border-medium-tan focus:outline-none focus:ring-2 focus:ring-light-tan"
                        placeholder="Ejemplo: ana"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={validarPalabra}
                        className="px-4 py-2 bg-medium-tan text-charcoal rounded hover:bg-light-tan transition-colors"
                    >
                        Validar
                    </button>
                    <button
                        onClick={limpiarFormulario}
                        className="px-4 py-2 bg-medium-gray text-cream rounded hover:bg-dark-gray border border-medium-tan transition-colors"
                    >
                        Limpiar
                    </button>
                </div>

                {resultado && (
                    <div className={`mt-6 p-4 rounded ${esValido ? "bg-green-800" : "bg-red-800"}`}>
                        <p className="text-cream">{resultado}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ValidarPalindromo