import type React from "react";
import { useState, useEffect } from "react";
import palabrasData from "../data/palabras.json";

// banco de palabras cargado desde el archivo JSON
function Ahorcado() {
    const palabras = palabrasData.palabras;
    const maxIntentos = 5;

    // estados del juego
    const [palabraSecreta, setPalabraSecreta] = useState("");
    const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(new Set());
    const [intentos, setIntentos] = useState(0);
    const [letraActual, setLetraActual] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    // inicia el juego al cargar el componente
    useEffect(() => {
        iniciarJuego();
    }, []);
    const iniciarJuego = () => {
        if (!palabras?.length) {
            setMensaje("Error: No se encontraron palabras.");
            setJuegoTerminado(true);
            return;
        }

        const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
        setPalabraSecreta(palabraAleatoria);
        setLetrasAdivinadas(new Set());
        setIntentos(0);
        setLetraActual("");
        setMensaje("¡Adivina la palabra!");
        setJuegoTerminado(false);
    };

    const manejarEntradaLetra = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value.toLowerCase();
        if (valor.length <= 1) setLetraActual(valor);
    };

    // renderiza la palabra secreta mostrando guiones bajos para las letras no adivinadas
    const renderizarPalabra = () =>
        [...palabraSecreta].map((letra) => (letrasAdivinadas.has(letra) ? letra : "_")).join(" ");

    // verifica si la letra ingresada esta en la palabra secreta
    const verificarLetra = () => {
        if (!letraActual || letrasAdivinadas.has(letraActual)) {
            setMensaje("Ya has intentado esta letra o no ingresaste ninguna.");
            return;
        }

        const nuevasLetras = new Set(letrasAdivinadas).add(letraActual);
        setLetrasAdivinadas(nuevasLetras);

        if (palabraSecreta.includes(letraActual)) {
            const todasAdivinadas = [...palabraSecreta].every((l) => nuevasLetras.has(l));
            setMensaje(todasAdivinadas ? "¡Felicidades! Has adivinado la palabra." : `La letra "${letraActual}" si está.`);
            if (todasAdivinadas) setJuegoTerminado(true);
        } else {
            const nuevosIntentos = intentos + 1;
            setIntentos(nuevosIntentos);
            if (nuevosIntentos >= maxIntentos) {
                setMensaje(`Perdiste :( La palabra era: ${palabraSecreta}`);
                setJuegoTerminado(true);
            } else {
                setMensaje(`La letra "${letraActual}" no está, te quedan ${maxIntentos - nuevosIntentos} intentos.`);
            }
        }

        setLetraActual("");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Juego del Ahorcado</h1>
            <div className="bg-dark-gray p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-light-tan mb-2">Palabra a adivinar:</h2>
                    <div className="text-4xl font-mono tracking-widest text-center py-4">{renderizarPalabra()}</div>
                </div>

                {/* barra de progreso de intentos */}
                <div className="mb-4">
                    <p className="text-cream mb-2">
                        Intentos fallidos: {intentos} de {maxIntentos}
                    </p>
                    <div className="w-full bg-medium-gray rounded-full h-2.5">
                        <div
                            className="bg-medium-tan h-2.5 rounded-full"
                            style={{ width: `${(intentos / maxIntentos) * 100}%` }}
                        />
                    </div>
                </div>
                
                {/* input para ingresar letras y boton para verificar */}
                {!juegoTerminado ? (
                    <div className="mb-4">
                        <label htmlFor="letra" className="block text-light-tan mb-2">
                            Ingresa una letra:
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="letra"
                                value={letraActual}
                                onChange={manejarEntradaLetra}
                                maxLength={1}
                                className="w-16 px-4 py-2 text-center text-2xl rounded-l bg-medium-gray text-cream border border-medium-tan"
                            />
                            <button
                                onClick={verificarLetra}
                                className="px-4 py-2 bg-medium-tan text-charcoal rounded-r hover:bg-light-tan"
                                disabled={!letraActual}
                            >
                                Verificar
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={iniciarJuego} className="px-4 py-2 bg-medium-tan text-charcoal rounded hover:bg-light-tan">
                        Jugar de nuevo
                    </button>
                )}

                {mensaje && (
                    <div
                        className={`mt-4 p-3 rounded ${
                            juegoTerminado ? (mensaje.includes("Felicidades") ? "bg-green-800" : "bg-red-800") : "bg-medium-gray"
                        }`}
                    >
                        <p className="text-cream">{mensaje}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Ahorcado;
