import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import api_router from './api_routes.js';
import cors from "cors";
import { loginHandler, verifyToken } from './authorization.js';
import path from "path"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Use body-parser middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login",loginHandler);

const projectRoot = process.cwd();
const imagesDirectory = path.join(projectRoot, 'product', 'images');

// Use express.static to serve images from the specified directory
app.use('/product/images', express.static(imagesDirectory));

app.use("/api",verifyToken,api_router);

// Start the server and listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
