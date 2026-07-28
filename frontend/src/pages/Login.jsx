import { useState } from "react";
import { login } from "../services/auth.service";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await login(username, password);

            localStorage.setItem("token", data.token);

            console.log("Token guardado:", localStorage.getItem("token"));

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>Iniciar sesión</h1>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <p>Usuario: {username}</p>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <p>Password: {password}</p>

            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
        
    );
}

export default Login;