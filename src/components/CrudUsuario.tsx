import type React from "react"
import { useState, useEffect } from "react"
import type { FormularioUsuario, Usuario } from "../types/usuario"
//movi las interfaces en caso de haber mas propiedades este sea facilmente actualizable y sobre todo legible o en su caso moverlo a una base de datos etc..
function CrudUsuario() {
    // estados para manejar la lista de usuarios y el formulario
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [formulario, setFormulario] = useState<FormularioUsuario>({
        nombre: "",
        edad: "",
        contraseña: "",
    })
    const [editandoId, setEditandoId] = useState<number | null>(null)
    const [mensaje, setMensaje] = useState<{ texto: string; tipo: "success" | "error" | "info" } | null>(null)

    // cargar usuarios del localStorage al iniciar
    useEffect(() => {
        const usuariosGuardados = localStorage.getItem("usuarios")
        if (usuariosGuardados) {
            setUsuarios(JSON.parse(usuariosGuardados))
        }
    }, [])

    // guardar usuarios en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
    }, [usuarios])

    // manejo de cambios en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormulario({
            ...formulario,
            [name]: value,
        })
    }

    // validar el formulario antes de enviar
    const validarFormulario = (): boolean => {
        if (!formulario.nombre.trim()) {
            mostrarMensaje("El nombre es obligatorio", "error")
            return false
        }

        const edad = Number.parseInt(formulario.edad);
        if (isNaN(edad) || edad <= 0 || edad > 100) { // validar rango de edad
            mostrarMensaje("La edad debe ser un número entre 1 y 100", "error");
            return false;
        }


        if (!formulario.contraseña.trim()) {
            mostrarMensaje("La contraseña es obligatoria", "error")
            return false
        }
        // validar que la contraseña tenga al menos 8 caracteres
        if (formulario.contraseña.length < 8) {
            mostrarMensaje("La contraseña debe tener al menos 8 caracteres", "error");
            return false;
        }

        return true
    }

    const mostrarMensaje = (texto: string, tipo: "success" | "error" | "info") => {
        setMensaje({ texto, tipo })
        setTimeout(() => setMensaje(null), 3000)
    }

    // agrega o actualiza al usuario
    const guardarUsuario = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validarFormulario()) return

        if (editandoId === null) {

            const nuevoUsuario: Usuario = {
                id: Date.now(),
                nombre: formulario.nombre,
                edad: Number.parseInt(formulario.edad),
                contraseña: formulario.contraseña,
            }

            setUsuarios([...usuarios, nuevoUsuario])
            mostrarMensaje("Usuario agregado correctamente", "success")
        } else {

            const usuariosActualizados = usuarios.map((usuario) =>
                usuario.id === editandoId
                    ? {
                        ...usuario,
                        nombre: formulario.nombre,
                        edad: Number.parseInt(formulario.edad),
                        contraseña: formulario.contraseña,
                    }
                    : usuario,
            )

            setUsuarios(usuariosActualizados)
            setEditandoId(null)
            mostrarMensaje("Usuario actualizado correctamente", "success")
        }
        // limpiar el formulario después de guardar
        limpiarFormulario()
    }

    const editarUsuario = (usuario: Usuario) => {
        setFormulario({
            nombre: usuario.nombre,
            edad: usuario.edad.toString(),
            contraseña: usuario.contraseña,
        })
        setEditandoId(usuario.id)
    }

    const eliminarUsuario = (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id)
            setUsuarios(usuariosFiltrados)

            if (editandoId === id) {
                limpiarFormulario()
            }

            mostrarMensaje("Usuario eliminado correctamente", "info")
        }
    }
    // limpiar el formulario y el id de edición
    const limpiarFormulario = () => {
        setFormulario({
            nombre: "",
            edad: "",
            contraseña: "",
        })
        setEditandoId(null)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">CRUD de Usuarios</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* seccion del formulario para agregar o editar usuarios */}
                <div className="bg-dark-gray p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-light-tan mb-4">
                        {editandoId === null ? "Agregar Usuario" : "Editar Usuario"}
                    </h2>

                    {/* formulario para agregar o editar usuarios */}
                    <form onSubmit={guardarUsuario}>
                        {/* campo para el nombre */}
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-light-tan mb-2">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded bg-medium-gray text-cream border border-medium-tan"
                            />
                        </div>

                        {/* campo para la edad */}
                        <div className="mb-4">
                            <label htmlFor="edad" className="block text-light-tan mb-2">
                                Edad:
                            </label>
                            <input
                                type="number"
                                id="edad"
                                name="edad"
                                value={formulario.edad}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded bg-medium-gray text-cream border border-medium-tan"
                            />
                        </div>

                        {/* campo para la contraseña */}
                        <div className="mb-4">
                            <label htmlFor="contraseña" className="block text-light-tan mb-2">
                                Contraseña:
                            </label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={formulario.contraseña}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded bg-medium-gray text-cream border border-medium-tan"
                            />
                        </div>

                        {/* botones para agregar/actualizar o cancelar */}
                        <div className="flex gap-2">
                            <button type="submit" className="px-4 py-2 bg-medium-tan text-charcoal rounded hover:bg-light-tan">
                                {editandoId === null ? "Agregar" : "Actualizar"}
                            </button>

                            {editandoId !== null && (
                                <button
                                    type="button"
                                    onClick={limpiarFormulario}
                                    className="px-4 py-2 bg-medium-gray text-cream rounded hover:bg-dark-gray border border-medium-tan"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>

                    {/* mensaje de exito o error */}
                    {mensaje && (
                        <div
                            className={`mt-4 p-3 rounded ${mensaje.tipo === "success"
                                    ? "bg-green-800"
                                    : mensaje.tipo === "error"
                                        ? "bg-red-800"
                                        : "bg-blue-800"
                                }`}
                        >
                            <p className="text-cream">{mensaje.texto}</p>
                        </div>
                    )}
                </div>

                {/* seccion de la lista de usuarios */}
                <div className="bg-dark-gray p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-light-tan mb-4">Lista de Usuarios</h2>

                    {/* mostrar mensaje si no hay usuarios */}
                    {usuarios.length === 0 ? (
                        <p className="text-cream">No hay usuarios registrados.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            {/* tabla para mostrar la lista de usuarios */}
                            <table className="w-full text-cream">
                                <thead className="bg-medium-gray">
                                    <tr>
                                        <th className="px-4 py-2 text-left">ID</th>
                                        <th className="px-4 py-2 text-left">Nombre</th>
                                        <th className="px-4 py-2 text-left">Edad</th>
                                        <th className="px-4 py-2 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.id} className="border-b border-medium-gray">
                                            {/* mouestra el ID del usuario */}
                                            <td className="px-4 py-2">{usuario.id}</td>
                                            {/* mouestra el nombre del usuario */}
                                            <td className="px-4 py-2">{usuario.nombre}</td>
                                            {/* mouestra la edad del usuario */}
                                            <td className="px-4 py-2">{usuario.edad}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => editarUsuario(usuario)}
                                                        className="px-2 py-1 bg-medium-tan text-charcoal rounded hover:bg-light-tan text-sm"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => eliminarUsuario(usuario.id)}
                                                        className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-600 text-sm"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CrudUsuario
