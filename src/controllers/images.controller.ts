import {Request, Response } from "express";
import { pool } from "../config/db.config";

export const getImages = (req: Request, res: Response) => {
    pool.query('SELECT * FROM images ORDER BY image_id ASC', (error, result) => {
        if (error) {
            throw error
        }
        console.log(result.rows[0].image_link)
        res.status(200).json( result.rows )
    })
};
