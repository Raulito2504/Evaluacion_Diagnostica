interface HeaderProps {
    currentComponent: string | null
    onBackToMenu: () => void
}

function Header({ currentComponent, onBackToMenu }: HeaderProps) {
    return (
        <header className="bg-dark-gray shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-cream">Evaluacion</h1>
                {currentComponent && (
                    <button
                        onClick={onBackToMenu}
                        className="px-4 py-2 bg-medium-tan text-charcoal rounded hover:bg-light-tan transition-colors"
                    >
                        Volver al Menú
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header
