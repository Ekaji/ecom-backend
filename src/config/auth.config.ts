import * as dotenv from 'dotenv';
dotenv.config()

import {Config} from '../types';

export const config: Config = {
    secret: process.env.JWT_SECRET || ''
}
