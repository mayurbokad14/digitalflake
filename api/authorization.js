import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import sequelize from "./config_db.js";

import userModel from "./models/users.cjs"
import { DataTypes } from "sequelize";
const User = userModel(sequelize, DataTypes);

const SECRET_KEY = 'change_yourself_to_change_the_world';

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '6h' });
};

const loginHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find the user by username
        const user = await User.findOne({ where: { username } });

        //console.log(user);

        // If the user doesn't exist, or the password is incorrect, return an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = generateToken(user);

        // Attach the token to the response for the client to use in subsequent requests
        res.locals.token = token;

        res.status(200).json({ token });

        //next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifyToken = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    // Check if a token is present
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // Attach the decoded token payload to the request for use in subsequent middleware or routes
        req.user = decoded;

        next(); // Proceed to the next middleware or route
    });
};

export { loginHandler, verifyToken };