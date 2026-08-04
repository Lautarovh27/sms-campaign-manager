import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username, password);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");
        } catch (error) {

            await Swal.fire({
                icon: "error",
                title: "Error",
                text: "Usuario o contraseña incorrectos."
            });

        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl mb-3">
                        📱
                    </h1>

                    <h2 className="text-3xl font-bold text-gray-800">
                        SMS Campaign Manager
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Iniciá sesión para administrar tus campañas.
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Usuario
                        </label>

                        <input
                            type="text"
                            placeholder="Ingresá tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            placeholder="Ingresá tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Iniciar sesión
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;