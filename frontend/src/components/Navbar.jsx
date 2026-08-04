import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {

        const result = await Swal.fire({
            title: "¿Cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Cerrar sesión",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) {
            return;
        }

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    📱 SMS Campaign Manager
                </h1>

                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="hover:text-blue-200 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/contacts"
                        className="hover:text-blue-200 transition"
                    >
                        Contactos
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                    >
                        Cerrar sesión
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;