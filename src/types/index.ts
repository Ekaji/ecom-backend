import { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";

export interface Config {
    secret: Secret
}