import {Request, Response } from "express";
import { pool } from "../config/db.config";
import { cloudinaryInstance } from "../services/cloudinary";

export const getImages = (req: Request, res: Response) => {
    pool.query('SELECT * FROM images ORDER BY image_id ASC', (error, result) => {
        if (error) {
            throw error
        }
        console.log(result.rows[0].image_link)
        res.status(200).json( result.rows )
    })
};

export const imageUpload = async (req: Request, res: Response) => {
    const localFilePath = req.file?.path || "";
    
    const { isSuccess, message, statusCode, imageURL } =
      await cloudinaryInstance.uploadImage(localFilePath);
  
    return res.status(statusCode).json({
      isSuccess,
      message,
      imageURL,
    });
  }

// export const delete_product_image = () => {
//   https://dev.to/ebereplenty/cloudinary-and-postgresql-deleting-and-updating-images-using-nodejs-l8d
//   }