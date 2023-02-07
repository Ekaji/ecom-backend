import {Request, Response, response} from "express";
import {Pool} from "pg";

const pool = new Pool({
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

export const getImages = (req: Request, res: Response) => {
    pool.query('SELECT * FROM images ORDER BY image_id ASC', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
};

export const getProducts = (req: Request, res: Response) => {
    pool.query('SELECT products.*, images.image_link FROM products JOIN images ON products.image_id = images.image_id', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

export const getUserByID = (req: Request, res: Response) => {
    const id = req.params.id

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
};

