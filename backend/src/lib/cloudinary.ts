import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

const cloud_name = process.env.CLOUDINAR_CLOUD_NAME;
const api_key = process.env.CLOUDINAR_API_KEY;
const api_secret = process.env.CLOUDINAR_API_SECRET;

if (!cloud_name || !api_key || !api_secret) {
  throw new Error("Cloudinary credentials are missing in .env file");
}

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export default cloudinary;
