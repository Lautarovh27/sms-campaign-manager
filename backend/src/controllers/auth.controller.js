import { 
    registerService,
    loginService
 } from "../services/auth.service.js";

export const registerController = async (req, res) => {

    const user = await registerService({
    username,
    password
});

res.status(201).json({
    message: "Usuario registrado correctamente",
    user: {
        id: user.id,
        username: user.username
    }
});
};

export const loginController = async (req, res) => {

    const { username, password } = req.body;

    const token = await loginService(username, password);


    res.json({
        token
    });

};