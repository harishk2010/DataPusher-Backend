import jwt, { SignOptions } from "jsonwebtoken";
import { EnvErrorMsg, JwtErrorMsg } from "./constants";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env" });
}
interface JwtPayload {
  id: string;
  email: string;
  role?: string;
}
export default async function verifyToken(payload: string): Promise<any> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error(EnvErrorMsg.JWT_NOT_FOUND);
    }
    const result = await jwt.verify(payload, secret);
    console.log(result,"===>")
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function accessToken(payload: JwtPayload): Promise<string> {
  console.log("payload",payload)
  const secret = process.env.JWT_SECRET;
  const expiresIn = "1h"; 

  if (!secret) {
    throw new Error(EnvErrorMsg.JWT_NOT_FOUND);
  }

  const options: SignOptions = { expiresIn }; 

  return jwt.sign(payload, secret, options);
}
