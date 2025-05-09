function Footer() {
    return (
        <footer className="bg-dark-gray py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-cream mb-2 md:mb-0">
                        Correo electrónico:{" "}
                        <a href="mailto:info@miaplicacion.com" className="text-light-tan hover:underline">
                            raulariasrafael@gmail.com
                        </a>
                    </p>
                    <p className="text-cream">Raul Antonio Arias Rafael</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
