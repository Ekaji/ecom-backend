import { IResponse } from "../response";

export interface ICloudinaryResponse extends IResponse {
  imageURL?: string;
}

export interface ICloudinary {
  uploadImage: (imageToUpload: string) => Promise<ICloudinaryResponse>;
}