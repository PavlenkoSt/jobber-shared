import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: "jobber",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async ({
  image,
  overwrite,
  public_id,
}: {
  image: string;
  public_id?: string;
  overwrite?: boolean;
}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { resource_type: "image", public_id, overwrite },
      function (error, result) {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
};

export const uploadVideo = async ({
  image,
  overwrite,
  public_id,
}: {
  image: string;
  public_id?: string;
  overwrite?: boolean;
}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { resource_type: "video", public_id, overwrite },
      function (error, result) {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
};
