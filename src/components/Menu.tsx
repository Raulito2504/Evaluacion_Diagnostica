interface MenuProps {
    onSelectComponent: (component: string) => void
}

function Menu({ onSelectComponent }: MenuProps) {
    const components = [
        { id: "ahorcado", name: "Juego del Ahorcado" },
        { id: "calcularEdad", name: "Calculadora de Edad" },
        { id: "fibonacci", name: "Secuencia Fibonacci" },
        { id: "crudUsuario", name: "CRUD de Usuarios" },
        { id: "generarContraseña", name: "Generador de Contraseñas" },
        { id: "validarPalindromo", name: "Validador de Palindromos" },
    ]

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold mb-8 text-light-tan text-center">Ejercicios</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((component) => (
                    <button
                        key={component.id}
                        onClick={() => onSelectComponent(component.id)}
                        className="bg-dark-gray hover:bg-medium-gray transition-colors duration-300 p-6 rounded-lg shadow-lg flex items-center justify-center"
                    >
                        <span className="text-xl font-medium text-cream">{component.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Menu
