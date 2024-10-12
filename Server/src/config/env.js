import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  vnp_Url,
  vnp_Api,
  vnp_ReturnUrl,
  vnp_TmnCode,
  vnp_HashSecret,
} = process.env;
