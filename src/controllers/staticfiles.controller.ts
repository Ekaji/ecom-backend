import { Request, Response } from "express";
import path from "path";

export const form = (req: Request, res: Response) => {
    // Render form view
    res.sendFile(path.join(__dirname, '../static/index.html'))
  }