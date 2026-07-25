import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async (data) => {

    const { username, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword
    });

    return user;
};

export const loginService = async (username, password) => {

    const user = await User.findOne({
        where: {
            username
        }
    });
    if (!user) {
        return null;
    }

    const isValidPassword = await bcrypt.compare(
        password,
        user.password
    );

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    return token;

 

};