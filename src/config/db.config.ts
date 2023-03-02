import {Request, Response, response} from "express";
import { Pool } from "pg";

import * as dotenv from 'dotenv';
dotenv.config()

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
});

const connectToDB = async () => {
    try {
        await pool.connect()
        console.log('connected')
    } catch (err) {
        console.log(err)
    }
};
connectToDB()