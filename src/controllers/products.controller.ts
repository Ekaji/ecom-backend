import {Request, Response } from "express";
import { pool } from "../config/db.config";

export const getProducts = (req: Request, res: Response) => {
    pool.query('SELECT products.*, images.image_link FROM products JOIN images ON products.image_id = images.image_id', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}